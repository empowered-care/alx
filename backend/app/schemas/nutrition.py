from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from uuid import UUID

class FoodLogBase(BaseModel):
    food_name: str
    quantity: float
    unit: str = "portion"
    calories: Optional[float] = None
    glycemic_load: Optional[float] = None
    logged_at: Optional[datetime] = None

class FoodLogCreate(FoodLogBase):
    pass

class FoodLogOut(FoodLogBase):
    id: UUID
    user_id: UUID

    class Config:
        from_attributes = True

class FoodSearchResponse(BaseModel):
    food_name: str
    calories_per_unit: float
    glycemic_load: float
    unit: str
