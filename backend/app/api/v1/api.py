from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, users, health, wearables, nutrition, intelligence, recommendations, community, gym, kuriftu, fhir
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(wearables.router, prefix="/wearables", tags=["wearables"])
api_router.include_router(nutrition.router, prefix="/nutrition", tags=["nutrition"])
api_router.include_router(intelligence.router, prefix="/intelligence", tags=["intelligence"])
api_router.include_router(recommendations.router, prefix="/recommendations", tags=["recommendations"])
api_router.include_router(community.router, prefix="/community", tags=["community"])
api_router.include_router(gym.router, prefix="/trainer", tags=["trainer"])
api_router.include_router(kuriftu.router, prefix="/kuriftu", tags=["kuriftu"])
api_router.include_router(fhir.router, prefix="/fhir", tags=["fhir"])
