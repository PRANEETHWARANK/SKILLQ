from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import AnalysisRecord
from app.services.interview_service import InterviewService

router = APIRouter()

@router.get("/{analysis_id}")
def get_interview_questions(analysis_id: str, db: Session = Depends(get_db)):
    record = db.query(AnalysisRecord).filter(AnalysisRecord.id == analysis_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Analysis record not found.")
    return {
        "analysis_id": record.id,
        "target_role": record.target_role,
        "interview_prep": record.interview_prep
    }

@router.post("/evaluate")
def evaluate_interview_response(payload: dict = Body(...)):
    question_id = payload.get("question_id", "q-general")
    question_text = payload.get("question_text", "")
    candidate_answer = payload.get("candidate_answer", "")
    target_skill = payload.get("target_skill", "General Software Engineering")
    
    evaluation = InterviewService.evaluate_candidate_answer(
        question_id=question_id,
        question_text=question_text,
        candidate_answer=candidate_answer,
        target_skill=target_skill
    )
    return evaluation
