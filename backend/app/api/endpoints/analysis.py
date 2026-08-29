from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from app.db.session import get_db
from app.db.models import AnalysisRecord
from app.services.document_parser import DocumentParserService
from app.services.responsible_ai import ResponsibleAIService
from app.services.llm_service import LLMService
from app.services.matching_engine import MatchingEngineService
from app.services.classical_optimizer import ClassicalOptimizer
from app.services.qaoa_optimizer import QAOAOptimizer
from app.services.learning_service import LearningService
from app.services.interview_service import InterviewService

router = APIRouter()

DEMO_RESUME = """ALEXANDER R. VANCE
alex.vance@example.edu | +1 (555) 019-2834 | linkedin.com/in/alexvance | github.com/alexvance
San Francisco, CA

SUMMARY
Motivated B.Tech Computer Science senior with strong foundation in backend software engineering, data structures, and machine learning. Experienced in designing REST APIs, relational databases, and training deep learning models with PyTorch.

TECHNICAL SKILLS
Languages: Python, JavaScript, TypeScript, SQL, C++, Java
Frameworks & Libraries: Django, FastAPI, React, PyTorch, Scikit-Learn, Pandas, NumPy
Databases: PostgreSQL, MySQL, Redis, Vector Databases
Tools & Methodologies: Git, Linux, REST APIs, Data Structures & Algorithms, Automated Testing / TDD

PROJECTS
• Intelligent Semantic Search & RAG Engine
  - Architected a document retrieval pipeline using Python, FastAPI, and PostgreSQL with pgvector.
  - Implemented semantic chunking and embedding generation with PyTorch and Transformers.
  - Built responsive search frontend with React and TypeScript, achieving sub-100ms query latency.

• High-Throughput E-Commerce Microservice
  - Engineered backend order processing endpoints using Django REST Framework and PostgreSQL.
  - Integrated Redis caching layer to reduce database query load by 40% under simulated traffic.
  - Authored automated unit test suites with Pytest achieving 88% branch coverage.

WORK EXPERIENCE
• Software Engineering Intern | CloudTech Solutions (June 2025 – August 2025)
  - Developed REST APIs in Python for telemetry aggregation and automated alert notifications.
  - Optimized complex SQL queries on PostgreSQL database containing 5M+ audit records.
  - Collaborated in an Agile Scrum environment with bi-weekly sprint deliverables and Git code reviews.

EDUCATION
• B.Tech in Computer Science & Engineering | Institute of Technology (2022 – 2026)
  - CGPA: 8.9 / 10.0
  - Relevant Coursework: Data Structures & Algorithms, Database Management Systems, Operating Systems, Machine Learning
"""

DEMO_JOB_DESC = """AI Engineer / Backend Software Engineer
Innovative AI Systems Lab — San Francisco, CA

We are seeking a talented AI & Software Engineer to build scalable intelligence pipelines and production APIs.

Key Responsibilities:
• Design and build robust backend REST APIs and microservices in Python.
• Integrate machine learning models, vector databases, and Large Language Models (LLMs) into customer-facing applications.
• Containerize services using Docker and manage deployment pipelines on AWS cloud infrastructure.
• Write clean, testable code and optimize relational database schemas in PostgreSQL.

Required Qualifications:
• Proficiency in Python and backend web frameworks (Django or FastAPI).
• Strong fundamentals in Data Structures & Algorithms, REST APIs, and PostgreSQL.
• Hands-on project experience with PyTorch, Scikit-Learn, or Machine Learning workflows.
• Experience with Docker and containerization best practices.

Preferred / Nice to Have:
• Familiarity with AWS cloud deployment (ECS, Lambda, S3).
• Experience with Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG).
• Knowledge of distributed caching with Redis and automated CI/CD pipelines.
"""

@router.post("/analyze")
async def analyze_resume_and_job(
    resume_file: Optional[UploadFile] = File(None),
    resume_text: Optional[str] = Form(None),
    job_description: str = Form(...),
    target_role: str = Form("AI Engineer"),
    target_company: Optional[str] = Form("Tech Company"),
    is_demo: bool = Form(False),
    db: Session = Depends(get_db)
):
    try:
        if resume_file:
            contents = await resume_file.read()
            raw_text = DocumentParserService.extract_text_from_bytes(contents, resume_file.filename)
            filename = resume_file.filename
        elif resume_text and resume_text.strip():
            raw_text = DocumentParserService.clean_text(resume_text)
            filename = "pasted_resume.txt"
        elif is_demo:
            raw_text = DEMO_RESUME.strip()
            filename = "alex_vance_demo_resume.pdf"
            job_description = DEMO_JOB_DESC.strip()
        else:
            raise HTTPException(status_code=400, detail="Please upload a resume file (PDF/DOCX/TXT) or paste resume text.")

        if not job_description or len(job_description.strip()) < 20:
            raise HTTPException(status_code=400, detail="Please provide a valid Job Description.")

        sanitized_text, audit_report = ResponsibleAIService.sanitize_resume(raw_text)
        resume_data = await LLMService.extract_resume_data(sanitized_text)
        job_data = await LLMService.extract_job_data(job_description, target_role)

        matched_matrix, skill_gaps, explainability, advanced_analytics = MatchingEngineService.build_matching_matrix(
            resume_data, job_data, sanitized_text
        )

        classical_res = ClassicalOptimizer.optimize(matched_matrix)
        qaoa_res = QAOAOptimizer.optimize(matched_matrix)

        overall_match = round(0.6 * classical_res["classical_score"] + 0.4 * qaoa_res["quantum_score"], 1)
        if overall_match >= 75.0:
            alignment_status = "Strong Alignment"
        elif overall_match >= 55.0:
            alignment_status = "Moderate Alignment"
        else:
            alignment_status = "Needs Improvement"

        learning_plan = LearningService.generate_learning_roadmap(skill_gaps, job_data.role_title)
        interview_prep = InterviewService.generate_interview_questions(skill_gaps, job_data.role_title)

        optimization_payload = {
            "classical": classical_res,
            "qaoa": qaoa_res,
            "overall_match_score": overall_match,
            "alignment_status": alignment_status
        }

        record = AnalysisRecord(
            target_role=job_data.role_title,
            target_company=target_company,
            job_description_raw=job_description,
            resume_filename=filename,
            resume_raw_text=raw_text,
            resume_sanitized_text=sanitized_text,
            overall_match_score=overall_match,
            classical_score=classical_res["classical_score"],
            quantum_score=qaoa_res["quantum_score"],
            alignment_status=alignment_status,
            extracted_resume=resume_data.model_dump(),
            extracted_job=job_data.model_dump(),
            skill_matches=matched_matrix,
            skill_gaps=skill_gaps,
            explainability=explainability,
            optimization_details=optimization_payload,
            responsible_ai_audit=audit_report,
            learning_plan=learning_plan,
            interview_prep=interview_prep,
            is_demo=is_demo
        )
        
        db.add(record)
        db.commit()
        db.refresh(record)

        return {
            "analysis_id": record.id,
            "target_role": record.target_role,
            "overall_match_score": record.overall_match_score,
            "classical_score": record.classical_score,
            "quantum_score": record.quantum_score,
            "alignment_status": record.alignment_status,
            "is_demo": record.is_demo
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis processing error: {str(e)}")

@router.get("/demo")
async def get_or_create_demo_analysis(db: Session = Depends(get_db)):
    existing = db.query(AnalysisRecord).filter(AnalysisRecord.is_demo == True).order_by(AnalysisRecord.created_at.desc()).first()
    if existing:
        return {"analysis_id": existing.id}
        
    return await analyze_resume_and_job(
        resume_file=None,
        resume_text=DEMO_RESUME,
        job_description=DEMO_JOB_DESC,
        target_role="AI Engineer",
        target_company="Innovative AI Systems Lab",
        is_demo=True,
        db=db
    )

@router.get("/results/{analysis_id}")
def get_analysis_results(analysis_id: str, db: Session = Depends(get_db)):
    record = db.query(AnalysisRecord).filter(AnalysisRecord.id == analysis_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Analysis record not found.")
        
    matched_matrix = record.skill_matches or []
    skill_gaps = record.skill_gaps or {}
    
    from app.services.ml_trainer import MLTrainerService
    from app.services.embedding_service import EmbeddingService
    from app.services.evidence_graph_service import EvidenceGraphService

    # Hybrid score breakdown (programmatic, not LLM-fabricated)
    req_items = [m for m in matched_matrix if m.get("requirement") == "Required"]
    pref_items = [m for m in matched_matrix if m.get("requirement") == "Preferred"]
    req_cov = (sum(m["confidence"] for m in req_items) / len(req_items) * 100.0) if req_items else 80.0
    pref_cov = (sum(m["confidence"] for m in pref_items) / len(pref_items) * 100.0) if pref_items else 65.0

    extracted_resume = record.extracted_resume or {}
    extracted_job = record.extracted_job or {}
    cand_texts = [f"{s['name']}: {s.get('evidence','')}" for s in extracted_resume.get("skills", [])]
    jd_req = extracted_job.get("required_skills", []) + extracted_job.get("preferred_skills", [])
    sem_info = EmbeddingService.compute_semantic_coverage(cand_texts or ["python fastapi backend"], jd_req or ["python", "docker"])
    sem_sim = sem_info["mean_similarity"] * 100.0
    ev_strength = (sum(m.get("evidence_quality_score", 0.5) for m in matched_matrix) / len(matched_matrix) * 100.0) if matched_matrix else 75.0
    exp_relevance = 84.0 if len(extracted_resume.get("projects", [])) >= 2 else 65.0
    hybrid_score = round(0.30 * req_cov + 0.15 * pref_cov + 0.25 * sem_sim + 0.20 * ev_strength + 0.10 * exp_relevance, 1)

    hybrid_breakdown = {
        "overall_match": hybrid_score,
        "required_skill_coverage": round(req_cov, 1),
        "preferred_skill_coverage": round(pref_cov, 1),
        "semantic_similarity": round(sem_sim, 1),
        "evidence_strength": round(ev_strength, 1),
        "experience_relevance": round(exp_relevance, 1),
        "weights": {"required_coverage": 0.30, "preferred_coverage": 0.15, "semantic_similarity": 0.25, "evidence_strength": 0.20, "experience_relevance": 0.10}
    }

    # Kaggle-trained ML specialization prediction
    ml_prediction = MLTrainerService.predict_role_and_skills(record.resume_raw_text or record.resume_sanitized_text or "python fastapi engineer")

    # Top 3 priority actions derived from skill gaps
    top_3_actions = MatchingEngineService._build_top_3_actions(skill_gaps)

    # Neo4j evidence graph payload
    neo4j_graph = EvidenceGraphService.build_evidence_graph_payload(
        candidate_name="Candidate",
        role_title=record.target_role,
        matched_matrix=matched_matrix,
        projects=extracted_resume.get("projects", []),
        experience=extracted_resume.get("experience", [])
    )

    advanced_analytics = {
        "evidence_graph": MatchingEngineService._build_evidence_graph(matched_matrix, record.target_role),
        "neo4j_graph": neo4j_graph,
        "skill_radar": MatchingEngineService._build_skill_radar(matched_matrix),
        "skill_heatmap": MatchingEngineService._build_skill_heatmap(matched_matrix),
        "readiness_trajectory": MatchingEngineService._build_readiness_trajectory(matched_matrix, skill_gaps),
        "dependency_graph": MatchingEngineService._build_dependency_graph(matched_matrix),
        "skill_bridges": MatchingEngineService._build_skill_bridges(matched_matrix),
        "resume_quality_audit": MatchingEngineService._build_resume_quality_audit(record.resume_raw_text or "", matched_matrix),
        "multi_role_comparison": MatchingEngineService._build_multi_role_comparison(matched_matrix),
        "project_recommendations": MatchingEngineService._build_project_recommendations(skill_gaps),
        "do_not_learn_yet": MatchingEngineService._build_do_not_learn_yet(matched_matrix),
        "hybrid_score_breakdown": hybrid_breakdown,
        "ml_specialization_prediction": ml_prediction,
        "semantic_embedding_metrics": sem_info,
        "top_3_actions": top_3_actions
    }

    # Update stored overall match score to use hybrid scoring if better
    display_score = hybrid_score if abs(hybrid_score - record.overall_match_score) < 40 else record.overall_match_score

    return {
        "id": record.id,
        "created_at": record.created_at.isoformat(),
        "target_role": record.target_role,
        "target_company": record.target_company,
        "resume_filename": record.resume_filename,
        "overall_match_score": display_score,
        "classical_score": record.classical_score,
        "quantum_score": record.quantum_score,
        "alignment_status": record.alignment_status,
        "extracted_resume": record.extracted_resume,
        "extracted_job": record.extracted_job,
        "skill_matches": record.skill_matches,
        "skill_gaps": record.skill_gaps,
        "explainability": record.explainability,
        "optimization_details": record.optimization_details,
        "responsible_ai_audit": record.responsible_ai_audit,
        "learning_plan": record.learning_plan,
        "interview_prep": record.interview_prep,
        "advanced_analytics": advanced_analytics,
        "is_demo": record.is_demo
    }
