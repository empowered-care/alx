from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from uuid import UUID

class HealthMetricBase(BaseModel):
    metric_type: str
    value: float
    unit: str
    recorded_at: Optional[datetime] = None

class HealthMetricCreate(HealthMetricBase):
    pass

class HealthMetricOut(HealthMetricBase):
    id: UUID
    user_id: UUID

    class Config:
        from_attributes = True

class WearableSync(BaseModel):
    steps: Optional[int] = None
    heart_rate: Optional[float] = None
    hrv: Optional[float] = None
    sleep_hours: Optional[float] = None
    timestamp: Optional[datetime] = None
