from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import AnalysisRecord

router = APIRouter()

@router.get("/{analysis_id}")
def get_learning_plan(analysis_id: str, db: Session = Depends(get_db)):
    record = db.query(AnalysisRecord).filter(AnalysisRecord.id == analysis_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Analysis record not found.")
    return {
        "analysis_id": record.id,
        "target_role": record.target_role,
        "overall_match_score": record.overall_match_score,
        "learning_plan": record.learning_plan
    }

@router.post("/{analysis_id}/toggle-task")
def toggle_task(
    analysis_id: str,
    payload: dict = Body(...),
    db: Session = Depends(get_db)
):
    record = db.query(AnalysisRecord).filter(AnalysisRecord.id == analysis_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Analysis record not found.")
        
    task_id = payload.get("task_id")
    completed = payload.get("completed", False)
    
    plan = record.learning_plan
    found = False
    for week in plan.get("weeks", []):
        for task in week.get("tasks", []):
            if task.get("id") == task_id:
                task["completed"] = completed
                found = True
                break
                
    if found:
        record.learning_plan = dict(plan)
        db.commit()
        
    return {"status": "ok", "task_id": task_id, "completed": completed}
