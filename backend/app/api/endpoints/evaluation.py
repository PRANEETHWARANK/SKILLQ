from fastapi import APIRouter
from app.services.evaluation_service import EvaluationService

router = APIRouter()

@router.get("")
def get_benchmarks():
    return EvaluationService.get_system_benchmark_metrics()
