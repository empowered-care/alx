from typing import Any, List
from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.api import deps
from app.models.models import User, Recommendation
from app.services.recommendation import recommendation_service

router = APIRouter()

@router.get("/")
def get_recommendations(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Get wellness recommendations for the current user.
    """
    # Generate new ones (in a real app, this might be a background task)
    recommendation_service.generate_recommendations(db, current_user.id)
    
    statement = select(Recommendation).where(Recommendation.user_id == current_user.id).order_by(Recommendation.created_at.desc())
    return db.exec(statement).all()
