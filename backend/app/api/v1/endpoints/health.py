from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from datetime import datetime

from app.api import deps
from app.models.models import User, HealthMetric
from app.schemas.health import HealthMetricOut

router = APIRouter()

@router.get("/metrics", response_model=List[HealthMetricOut])
def read_health_metrics(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve health metrics.
    """
    statement = select(HealthMetric).where(HealthMetric.user_id == current_user.id).offset(skip).limit(limit)
    metrics = db.exec(statement).all()
    return metrics

@router.get("/dashboard")
def read_health_dashboard(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Get a summary of the latest health metrics.
    """
    # Just a mock dashboard response for now
    return {
        "latest_heart_rate": 72,
        "latest_hrv": 48,
        "sleep_score": 85,
        "daily_steps": 8432,
        "status": "Healthy"
    }
