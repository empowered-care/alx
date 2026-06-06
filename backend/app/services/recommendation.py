from typing import List
from sqlmodel import Session, select
from app.models.models import User, HealthMetric, RiskAlert, Recommendation

class RecommendationService:
    @staticmethod
    def generate_recommendations(db: Session, user_id: str) -> List[Recommendation]:
        recommendations = []
        
        # Check for high severity risks
        risks = db.exec(
            select(RiskAlert).where(
                RiskAlert.user_id == user_id,
                RiskAlert.severity == "HIGH"
            )
        ).all()
        
        if any(r.risk_type == "Hypertension" for r in risks):
            recommendations.append(Recommendation(
                user_id=user_id,
                recommendation="Consult a doctor regarding your increasing resting heart rate and poor sleep."
            ))
            recommendations.append(Recommendation(
                user_id=user_id,
                recommendation="Prioritize 8 hours of sleep tonight. Avoid screens 1 hour before bed."
            ))

        if any(r.risk_type == "Burnout" for r in risks):
            recommendations.append(Recommendation(
                user_id=user_id,
                recommendation="Take a recovery day. Your HRV is low, suggesting high physical or mental stress."
            ))
            recommendations.append(Recommendation(
                user_id=user_id,
                recommendation="Book a wellness session or spa at Kuriftu for recovery."
            ))

        # General wellness recommendations based on latest metrics
        latest_steps = db.exec(
            select(HealthMetric).where(
                HealthMetric.user_id == user_id,
                HealthMetric.metric_type == "steps"
            ).order_by(HealthMetric.recorded_at.desc())
        ).first()
        
        if latest_steps and latest_steps.value < 5000:
            recommendations.append(Recommendation(
                user_id=user_id,
                recommendation="You're below your step goal today. A 20-minute walk could help."
            ))

        # Save to DB
        for rec in recommendations:
            db.add(rec)
        db.commit()
        
        return recommendations

recommendation_service = RecommendationService()
