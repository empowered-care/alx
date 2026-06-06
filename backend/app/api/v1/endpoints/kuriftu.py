from typing import Any
from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from datetime import datetime, timedelta

from app.api import deps
from app.models.models import User, HealthMetric, Recommendation

router = APIRouter()

@router.post("/recommend")
def get_kuriftu_recommendations(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Logic: Low HRV for > 7 days -> Generate Spa Recommendation
    """
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    hrv_metrics = db.exec(
        select(HealthMetric).where(
            HealthMetric.user_id == current_user.id,
            HealthMetric.metric_type == "hrv",
            HealthMetric.recorded_at >= seven_days_ago
        )
    ).all()
    
    avg_hrv = sum(m.value for m in hrv_metrics) / max(len(hrv_metrics), 1)
    
    if len(hrv_metrics) > 0 and avg_hrv < 40:
        rec = Recommendation(
            user_id=current_user.id,
            recommendation="Special Offer: 20% off Kuriftu Spa. Your recovery data shows high stress.",
            status="PENDING"
        )
        db.add(rec)
        db.commit()
        return {
            "offer": "Kuriftu Spa Discount",
            "reason": "Low recovery (HRV) detected over last 7 days",
            "discount_code": "RECOVER20"
        }
    
    return {"message": "Recovery status optimal. No active spa offers."}
