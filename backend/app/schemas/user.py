from typing import Optional
from pydantic import BaseModel, EmailStr
from uuid import UUID

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None
    role: str = "PATIENT"

class UserOut(BaseModel):
    id: UUID
    email: EmailStr
    name: Optional[str] = None
    role: str

    class Config:
        from_attributes = True
