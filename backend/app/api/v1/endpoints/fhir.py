from typing import Any, Optional
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.api import deps
from app.models.models import HealthMetric
from sqlmodel import Session, select

router = APIRouter()

class FHIRRequest(BaseModel):
    metric_key: str
    value: float
    patient_id: str
    date_time: Optional[str] = None
    loinc: Optional[str] = None
    unit: Optional[str] = None

@router.post("/observation")
def convert_to_fhir(
    request: FHIRRequest,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Converts a normalized HealthMetric into a FHIR Observation resource.
    """
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
                    "code": request.loinc or "8867-4",
                    "display": request.metric_key
                }
            ]
        },
        "subject": {
            "reference": f"Patient/{request.patient_id}"
        },
        "effectiveDateTime": request.date_time or "2026-06-06T14:30:00Z",
        "valueQuantity": {
            "value": request.value,
            "unit": request.unit or "bpm",
            "system": "http://unitsofmeasure.org",
            "code": "/min"
        },
        "device": {
            "display": "WeVa Sphere v2.1"
        }
    }
