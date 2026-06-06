from typing import Any, List
from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.api import deps
from app.models.models import User, RiskAlert
from app.services.intelligence import intelligence_service

router = APIRouter()

@router.get("/risk-analysis")
async def get_risk_analysis(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Run risk analysis for the current user.
    """
    alerts = await intelligence_service.analyze_risks(db, current_user.id)
    
    # Return all recent alerts
    statement = select(RiskAlert).where(RiskAlert.user_id == current_user.id).order_by(RiskAlert.created_at.desc())
    return db.exec(statement).all()
