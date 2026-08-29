from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from app.services.ml_trainer import MLTrainerService

router = APIRouter()

class TrainRequest(BaseModel):
    algorithm: Optional[str] = "LogisticRegression"
    max_features: Optional[int] = 1500
    test_size: Optional[float] = 0.2

class PredictRequest(BaseModel):
    text: str

@router.post("/train")
def train_model_endpoint(req: TrainRequest):
    try:
        metrics = MLTrainerService.train_model(
            algorithm=req.algorithm or "LogisticRegression",
            max_features=req.max_features or 1500,
            test_size=req.test_size or 0.2
        )
        return {
            "status": "success",
            "message": f"Trained {req.algorithm} model successfully on resume dataset.",
            "metrics": metrics
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model training error: {str(e)}")

@router.get("/status")
def get_model_status():
    bundle = MLTrainerService.get_or_load_model()
    return {
        "status": "active",
        "model_path": "backend/app/models/skill_classifier.joblib",
        "metrics": bundle["metrics"]
    }

@router.get("/dataset")
def get_dataset_samples(limit: int = 5):
    df = MLTrainerService.load_dataset()
    samples = []
    for _, row in df.head(limit).iterrows():
        samples.append({
            "category": str(row["category"]),
            "text_preview": str(row["resume_text"])[:160] + "..."
        })
    
    cat_counts = df["category"].value_counts().to_dict()
    
    return {
        "total_records": len(df),
        "categories_distribution": cat_counts,
        "sample_records": samples,
        "source": "Kaggle Resume Dataset (snehaanbhawal/resume-dataset) & SkillQ Benchmark Corpus"
    }

@router.post("/predict")
def predict_endpoint(req: PredictRequest):
    if not req.text or len(req.text.strip()) < 10:
        raise HTTPException(status_code=400, detail="Please provide resume text to predict.")
    return MLTrainerService.predict_role_and_skills(req.text)
