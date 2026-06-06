from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from datetime import datetime

from app.api import deps
from app.models.models import User, HealthMetric
from app.schemas.health import WearableSync

router = APIRouter()

@router.post("/sync")
def sync_wearable_data(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    data: WearableSync
) -> Any:
    """
    Sync data from wearables (Mock implementation).
    """
    timestamp = data.timestamp or datetime.utcnow()
    
    metrics_to_add = []
    
    if data.steps is not None:
        metrics_to_add.append(HealthMetric(
            user_id=current_user.id,
            metric_type="steps",
            value=float(data.steps),
            unit="steps",
            recorded_at=timestamp
        ))
    
    if data.heart_rate is not None:
        metrics_to_add.append(HealthMetric(
            user_id=current_user.id,
            metric_type="heart_rate",
            value=data.heart_rate,
            unit="bpm",
            recorded_at=timestamp
        ))
        
    if data.hrv is not None:
        metrics_to_add.append(HealthMetric(
            user_id=current_user.id,
            metric_type="hrv",
            value=data.hrv,
            unit="ms",
            recorded_at=timestamp
        ))
        
    if data.sleep_hours is not None:
        metrics_to_add.append(HealthMetric(
            user_id=current_user.id,
            metric_type="sleep",
            value=data.sleep_hours,
            unit="hours",
            recorded_at=timestamp
        ))

    for metric in metrics_to_add:
        db.add(metric)
    
    db.commit()
    
    return {"status": "success", "synced_metrics": len(metrics_to_add)}
