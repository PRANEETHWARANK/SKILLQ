from fastapi import APIRouter
from app.api.endpoints import analysis, learning, interview, evaluation, training, llm, matching, career

api_router = APIRouter()
api_router.include_router(analysis.router, tags=["Analysis"])
api_router.include_router(llm.router, prefix="/llm", tags=["Gemini LLM Reasoning"])
api_router.include_router(matching.router, prefix="/matching", tags=["Semantic Matching Engine"])
api_router.include_router(career.router, prefix="/career", tags=["Career Coach & Actions"])
api_router.include_router(learning.router, prefix="/learning", tags=["Learning Plan"])
api_router.include_router(interview.router, prefix="/interview", tags=["Interview Coach"])
api_router.include_router(evaluation.router, prefix="/evaluation", tags=["Evaluation & Benchmarks"])
api_router.include_router(training.router, prefix="/training", tags=["ML Model Training Lab"])
