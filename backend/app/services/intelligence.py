from datetime import datetime, timedelta
from typing import List
from sqlmodel import Session, select, func
from app.models.models import User, HealthMetric, FoodLog, RiskAlert
from app.services.llm import llm_service

class IntelligenceService:
    @staticmethod
    async def analyze_risks(db: Session, user_id: str) -> List[RiskAlert]:
        alerts = []
        
        # Fetch recent data for LLM context
        three_days_ago = datetime.utcnow() - timedelta(days=3)
        metrics = db.exec(select(HealthMetric).where(HealthMetric.user_id == user_id, HealthMetric.recorded_at >= three_days_ago)).all()
        food = db.exec(select(FoodLog).where(FoodLog.user_id == user_id, FoodLog.logged_at >= three_days_ago)).all()
        
        # Attempt LLM Analysis if keys are present
        context = f"Metrics: {[{'type': m.metric_type, 'val': m.value} for m in metrics]}. Food: {[{'name': f.food_name, 'gl': f.glycemic_load} for f in food]}."
        
        try:
            llm_result = await llm_service.analyze_health_data(context)
            # In a real app, parse the JSON from LLM. For now, we'll keep the hardcoded rules as the primary logic
            # and use LLM for the 'message' or insights.
            print(f"LLM Insight for {user_id}: {llm_result}")
        except:
            pass

        # --- Rule-Based Detection (Core Hackathon Logic) ---
        
        # 1. Hypertension Detection
        sleep_metrics = [m for m in metrics if m.metric_type == "sleep"]
        low_sleep_count = sum(1 for m in sleep_metrics if m.value < 5)
        
        if low_sleep_count >= 2:
            hr_metrics = sorted([m for m in metrics if m.metric_type == "heart_rate"], key=lambda x: x.recorded_at, reverse=True)
            if len(hr_metrics) >= 2 and hr_metrics[0].value > hr_metrics[-1].value:
                alerts.append(RiskAlert(
                    user_id=user_id,
                    risk_type="Hypertension",
                    severity="HIGH",
                    message="LLM & Rule Engine detected high risk of hypertension. Please monitor BP."
                ))

        # 2. Diabetes Warning
        avg_gl = sum(f.glycemic_load or 0 for f in food) / max(len(food), 1)
        if avg_gl > 15:
            steps = sum(m.value for m in metrics if m.metric_type == "steps")
            if steps < 15000: # for 3 days
                alerts.append(RiskAlert(
                    user_id=user_id,
                    risk_type="Diabetes",
                    severity="MEDIUM",
                    message="High sugar intake and low activity detected by Clinical Intelligence."
                ))

        # 3. Burnout Detection
        hrv_metrics = [m for m in metrics if m.metric_type == "hrv"]
        avg_hrv = sum(m.value for m in hrv_metrics) / max(len(hrv_metrics), 1)
        if avg_hrv < 30 and low_sleep_count >= 2:
            alerts.append(RiskAlert(
                user_id=user_id,
                risk_type="Burnout",
                severity="HIGH",
                message="Your recovery markers are low. Burnout risk is elevated."
            ))

        for alert in alerts:
            db.add(alert)
        db.commit()
        
        return alerts

intelligence_service = IntelligenceService()
