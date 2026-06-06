from datetime import datetime
from typing import Optional, List
from uuid import UUID, uuid4
from sqlmodel import SQLModel, Field, Relationship

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    name: Optional[str] = None
    role: str = "PATIENT"  # PATIENT, TRAINER, DOCTOR, ADMIN

class User(UserBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    metrics: List["HealthMetric"] = Relationship(back_populates="user")
    food_logs: List["FoodLog"] = Relationship(back_populates="user")
    risk_alerts: List["RiskAlert"] = Relationship(back_populates="user")
    recommendations: List["Recommendation"] = Relationship(back_populates="user")

class HealthMetric(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="user.id")
    metric_type: str  # heart_rate, hrv, sleep, steps, calories, bp_systolic, bp_diastolic
    value: float
    unit: str
    recorded_at: datetime = Field(default_factory=datetime.utcnow)
    
    user: User = Relationship(back_populates="metrics")

class FoodLog(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="user.id")
    food_id: Optional[str] = None
    food_name: str
    quantity: float
    unit: str = "portion"
    calories: Optional[float] = None
    glycemic_load: Optional[float] = None
    logged_at: datetime = Field(default_factory=datetime.utcnow)
    
    user: User = Relationship(back_populates="food_logs")

class RiskAlert(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="user.id")
    risk_type: str  # Hypertension, Diabetes, Burnout
    severity: str  # LOW, MEDIUM, HIGH
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    user: User = Relationship(back_populates="risk_alerts")

class Recommendation(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="user.id")
    recommendation: str
    status: str = "PENDING"  # PENDING, COMPLETED, DISMISSED
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    user: User = Relationship(back_populates="recommendations")

class CommunityWatch(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="user.id")
    peer_id: UUID = Field(foreign_key="user.id")
    status: str = "ACTIVE"
    last_check_in: Optional[datetime] = None
