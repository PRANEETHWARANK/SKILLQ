from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.services.llm_service import LLMService

router = APIRouter()

class ResumeAnalysisRequest(BaseModel):
    resume_text: str

class JDAnalysisRequest(BaseModel):
    job_description: str
    target_role: Optional[str] = "AI Engineer"

@router.post("/analyze-resume")
async def analyze_resume_endpoint(req: ResumeAnalysisRequest):
    if not req.resume_text or len(req.resume_text.strip()) < 10:
        raise HTTPException(status_code=400, detail="Please provide valid resume text.")
    data = await LLMService.extract_resume_data(req.resume_text)
    return data.model_dump()

@router.post("/analyze-jd")
async def analyze_jd_endpoint(req: JDAnalysisRequest):
    if not req.job_description or len(req.job_description.strip()) < 10:
        raise HTTPException(status_code=400, detail="Please provide valid job description text.")
    data = await LLMService.extract_job_data(req.job_description, req.target_role)
    return data.model_dump()
