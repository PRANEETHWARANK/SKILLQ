import uuid
import datetime
from sqlalchemy import Column, String, Float, Integer, Text, Boolean, DateTime, JSON
from app.db.session import Base

class AnalysisRecord(Base):
    __tablename__ = "analysis_records"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    target_role = Column(String(255), nullable=False)
    target_company = Column(String(255), nullable=True)
    job_description_raw = Column(Text, nullable=False)
    
    resume_filename = Column(String(255), nullable=True)
    resume_raw_text = Column(Text, nullable=False)
    resume_sanitized_text = Column(Text, nullable=False)
    
    overall_match_score = Column(Float, nullable=False)
    classical_score = Column(Float, nullable=False)
    quantum_score = Column(Float, nullable=False)
    alignment_status = Column(String(50), nullable=False)
    
    extracted_resume = Column(JSON, nullable=False)
    extracted_job = Column(JSON, nullable=False)
    skill_matches = Column(JSON, nullable=False)
    skill_gaps = Column(JSON, nullable=False)
    explainability = Column(JSON, nullable=False)
    optimization_details = Column(JSON, nullable=False)
    responsible_ai_audit = Column(JSON, nullable=False)
    learning_plan = Column(JSON, nullable=False)
    interview_prep = Column(JSON, nullable=False)
    
    is_demo = Column(Boolean, default=False)
