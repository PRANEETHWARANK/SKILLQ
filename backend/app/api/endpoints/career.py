from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Optional
from app.db.session import get_db
from app.db.models import AnalysisRecord
from app.services.matching_engine import MatchingEngineService

router = APIRouter()

@router.get("/roadmap")
def get_career_roadmap(analysis_id: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(AnalysisRecord)
    record = query.filter(AnalysisRecord.id == analysis_id).first() if analysis_id else query.order_by(AnalysisRecord.created_at.desc()).first()
    if not record:
        raise HTTPException(status_code=404, detail="No analysis record found.")
    return {
        "analysis_id": record.id,
        "target_role": record.target_role,
        "learning_plan": record.learning_plan
    }

@router.get("/projects")
def get_career_projects(analysis_id: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(AnalysisRecord)
    record = query.filter(AnalysisRecord.id == analysis_id).first() if analysis_id else query.order_by(AnalysisRecord.created_at.desc()).first()
    if not record:
        raise HTTPException(status_code=404, detail="No analysis record found.")
    skill_gaps = record.skill_gaps or {}
    return {
        "analysis_id": record.id,
        "target_role": record.target_role,
        "project_recommendations": MatchingEngineService._build_project_recommendations(skill_gaps)
    }

@router.get("/interview")
def get_career_interview(analysis_id: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(AnalysisRecord)
    record = query.filter(AnalysisRecord.id == analysis_id).first() if analysis_id else query.order_by(AnalysisRecord.created_at.desc()).first()
    if not record:
        raise HTTPException(status_code=404, detail="No analysis record found.")
    return {
        "analysis_id": record.id,
        "target_role": record.target_role,
        "interview_prep": record.interview_prep
    }

@router.get("/next-actions")
def get_career_next_actions(analysis_id: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(AnalysisRecord)
    record = query.filter(AnalysisRecord.id == analysis_id).first() if analysis_id else query.order_by(AnalysisRecord.created_at.desc()).first()
    if not record:
        raise HTTPException(status_code=404, detail="No analysis record found.")
    
    # Generate Top 3 Actions
    gaps = record.skill_gaps.get("priority_gaps", []) if record.skill_gaps else []
    top_actions = []
    for i, g in enumerate(gaps[:3]):
        top_actions.append({
            "step": i + 1,
            "skill": g["skill"],
            "action": g["recommended_action"],
            "priority": g["priority"]
        })
    if len(top_actions) < 3:
        top_actions.append({
            "step": len(top_actions) + 1,
            "skill": "System Design & Portfolio",
            "action": "Document architecture decisions and measurable metrics on GitHub repository README.",
            "priority": "MEDIUM"
        })

    return {
        "analysis_id": record.id,
        "target_role": record.target_role,
        "top_3_actions": top_actions
    }
