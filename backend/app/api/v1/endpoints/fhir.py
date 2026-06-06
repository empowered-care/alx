from typing import Any
from fastapi import APIRouter, Depends
from app.api import deps
from app.models.models import HealthMetric
from sqlmodel import Session, select

router = APIRouter()

@router.post("/observation")
def convert_to_fhir(
    metric_id: str,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Converts a normalized HealthMetric into a FHIR Observation resource.
    """
    # In a real app, this would query the DB for the metric and map it.
    return {
        "resourceType": "Observation",
        "status": "final",
        "category": [
            {
                "coding": [
                    {
                        "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                        "code": "vital-signs",
                        "display": "Vital Signs"
                    }
                ]
            }
        ],
        "code": {
            "coding": [
                {
                    "system": "http://loinc.org",
                    "code": "8867-4",
                    "display": "Heart rate"
                }
            ]
        },
        "subject": {
            "reference": "Patient/example"
        },
        "effectiveDateTime": "2026-06-06T14:30:00Z",
        "valueQuantity": {
            "value": 72,
            "unit": "bpm",
            "system": "http://unitsofmeasure.org",
            "code": "/min"
        }
    }
