from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Session, select

from app.api.v1.api import api_router
from app.core.config import settings
from app.db.session import engine

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Create tables on startup
@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)
    
    # Seed a mock user for testing if none exists
    with Session(engine) as session:
        from app.models.models import User
        from app.core.security import get_password_hash
        import uuid
        
        statement = select(User).where(User.email == "test@example.com")
        user = session.exec(statement).first()
        if not user:
            user = User(
                id=uuid.UUID("89230000-0000-0000-0000-000000000000"),
                email="test@example.com",
                name="Test User",
                password_hash=get_password_hash("password"),
                role="ADMIN"
            )
            session.add(user)
            session.commit()

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
def root():
    return {"message": "Welcome to Empowered Care API"}

app.include_router(api_router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
