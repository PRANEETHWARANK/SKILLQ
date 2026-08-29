from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from app.db.session import get_db
from app.db.models import AnalysisRecord
from app.api.endpoints.analysis import analyze_resume_and_job

router = APIRouter()

class MatchingRequest(BaseModel):
    resume_text: str
    job_description: str
    target_role: Optional[str] = "AI Engineer"
    target_company: Optional[str] = "Tech Company"

@router.post("/analyze")
async def run_matching_analysis(req: MatchingRequest, db: Session = Depends(get_db)):
    return await analyze_resume_and_job(
        resume_file=None,
        resume_text=req.resume_text,
        job_description=req.job_description,
        target_role=req.target_role,
        target_company=req.target_company,
        is_demo=False,
        db=db
    )

@router.get("/evidence")
def get_matching_evidence(analysis_id: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(AnalysisRecord)
    record = query.filter(AnalysisRecord.id == analysis_id).first() if analysis_id else query.order_by(AnalysisRecord.created_at.desc()).first()
    if not record:
        raise HTTPException(status_code=404, detail="No analysis record found.")
    return {
        "analysis_id": record.id,
        "target_role": record.target_role,
        "skill_matches": record.skill_matches,
        "evidence_graph": record.advanced_analytics.get("evidence_graph") if hasattr(record, "advanced_analytics") and record.advanced_analytics else []
    }

@router.get("/gaps")
def get_matching_gaps(analysis_id: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(AnalysisRecord)
    record = query.filter(AnalysisRecord.id == analysis_id).first() if analysis_id else query.order_by(AnalysisRecord.created_at.desc()).first()
    if not record:
        raise HTTPException(status_code=404, detail="No analysis record found.")
    return {
        "analysis_id": record.id,
        "target_role": record.target_role,
        "skill_gaps": record.skill_gaps
    }

@router.get("/responsible-ai")
def get_responsible_ai_report(analysis_id: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(AnalysisRecord)
    record = query.filter(AnalysisRecord.id == analysis_id).first() if analysis_id else query.order_by(AnalysisRecord.created_at.desc()).first()
    if not record:
        raise HTTPException(status_code=404, detail="No analysis record found.")
    return {
        "analysis_id": record.id,
        "target_role": record.target_role,
        "responsible_ai_audit": record.responsible_ai_audit
    }
