from typing import Any, List
from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.api import deps
from app.models.models import User, HealthMetric

router = APIRouter()

@router.get("/clients")
def get_trainer_clients(
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Get clients assigned to this trainer.
    """
    if current_user.role != "TRAINER" and current_user.role != "ADMIN":
        return {"error": "Unauthorized. Trainers only."}
    
    # Mock clients list
    return [
        {"id": "user1", "name": "Abebe Bekele", "last_sync": "2026-06-06"},
        {"id": "user2", "name": "Chala Kebe", "last_sync": "2026-06-05"}
    ]

@router.get("/client/{client_id}")
def get_client_stats(
    client_id: str,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Get health stats for a specific client.
    """
    if current_user.role != "TRAINER" and current_user.role != "ADMIN":
        return {"error": "Unauthorized. Trainers only."}
    
    # In real app, check if trainer is assigned to this client
    return {
        "client_id": client_id,
        "latest_hrv": 55,
        "sleep_avg": 7.2,
        "recovery_status": "GOOD",
        "readiness_score": 82
    }
