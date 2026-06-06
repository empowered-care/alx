from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from datetime import datetime

from app.api import deps
from app.models.models import User, FoodLog
from app.schemas.nutrition import FoodLogCreate, FoodLogOut, FoodSearchResponse

router = APIRouter()

# Mock food database based on EFCT 2025 (placeholder)
MOCK_FOODS = {
    "Injera": {"calories": 160, "glycemic_load": 7, "unit": "piece"},
    "Doro Wat": {"calories": 350, "glycemic_load": 5, "unit": "serving"},
    "Coffee": {"calories": 2, "glycemic_load": 0, "unit": "cup"},
}

@router.get("/search", response_model=List[FoodSearchResponse])
def search_food(query: str) -> Any:
    """
    Search for food items (Mock database).
    """
    results = []
    for name, data in MOCK_FOODS.items():
        if query.lower() in name.lower():
            results.append({
                "food_name": name,
                "calories_per_unit": data["calories"],
                "glycemic_load": data["glycemic_load"],
                "unit": data["unit"]
            })
    return results

@router.post("/log", response_model=FoodLogOut)
def log_food(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    food_in: FoodLogCreate
) -> Any:
    """
    Log a food entry.
    """
    # Auto-calculate calories if not provided and exists in mock DB
    calories = food_in.calories
    gl = food_in.glycemic_load
    
    if calories is None and food_in.food_name in MOCK_FOODS:
        calories = MOCK_FOODS[food_in.food_name]["calories"] * food_in.quantity
        gl = MOCK_FOODS[food_in.food_name]["glycemic_load"] * food_in.quantity

    db_obj = FoodLog(
        user_id=current_user.id,
        food_name=food_in.food_name,
        quantity=food_in.quantity,
        unit=food_in.unit,
        calories=calories,
        glycemic_load=gl,
        logged_at=food_in.logged_at or datetime.utcnow()
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/history", response_model=List[FoodLogOut])
def read_food_history(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Retrieve user food logs.
    """
    statement = select(FoodLog).where(FoodLog.user_id == current_user.id)
    return db.exec(statement).all()
