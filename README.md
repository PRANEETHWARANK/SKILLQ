# SkillQ: Quantum-Powered Skill Intelligence & Career Coach

> "One AI Ranks. One AI Checks. You Decide."

**SkillQ** is a hybrid **LLM + Machine Learning + Semantic Matching + Quantum Optimization** career intelligence platform designed for B.Tech students and entry-level engineering candidates.

---

## 1. Problem & Product Purpose

Many entry-level applicants struggle to identify exact gaps between their resumes and target engineering roles. SkillQ performs evidence-backed skill matching, maps auditable provenance, optimizes skill coverage via QUBO/QAOA simulation, audits demographic fairness ($0.0\%$ variance), and produces actionable 30-day roadmaps and interview coaching.

SkillQ operates strictly as a **career guidance system**—it does NOT make hiring decisions or evaluate personality worth.

---

## 2. Core Architecture Pipeline

```
Resume + Job Description
      ↓
Gemini 2.5 Flash / NLP Parser (Structured Extraction)
      ↓
Skill Taxonomy Normalization (data/skill_taxonomy.json)
      ↓
BGE-M3 / Semantic Embedding Matching (Cosine Similarity)
      ↓
Kaggle-Trained ML Specialization Classifier (skill_classifier.joblib)
      ↓
Programmatic Hybrid Match Scoring (Non-LLM Fabricated)
      ↓
QUBO / QAOA Quantum Optimization (Qiskit Simulation)
      ↓
Interactive Evidence Graph (Neo4j Schema)
      ↓
Responsible AI Suite (PII Removal, Counterfactual Fairness: 0.0% Variance)
      ↓
30-Day Learning Roadmap & Portfolio Project Recommendations
      ↓
Interview Coach (Concept Rubric Evaluation)
      ↓
Top 3 Prioritized Actions
```

---

## 3. Machine Learning & Model Attributions

### A. Supervised Resume Classifier (Kaggle Dataset)
- **Training Dataset**: Kaggle Resume Dataset (`snehaanbhawal/resume-dataset`).
- **Pipeline**: Sublinear TF-IDF $(1, 2)$ n-grams with Scikit-Learn classifiers (`LogisticRegression`, `SGDClassifier`, `MultinomialNB`).
- **Role**: Classifies engineering specialization (*AI/ML*, *Backend*, *Data Engineering*, *DevOps/Cloud*, *Full-Stack Development*) with probability distributions.
- **Model File**: `backend/app/models/skill_classifier.joblib`.

### B. Gemini 2.5 Flash LLM
- **Role**: Pretrained LLM for structured resume/JD entity extraction, gap reasoning, roadmap generation, and interview question formulation.
- **Attribution**: Pretrained foundation model; not claimed to have been trained on the Kaggle dataset.

### C. QAOA Quantum Optimizer
- **Role**: Formulates requirement coverage and skill synergies into a Quadratic Unconstrained Binary Optimization (QUBO) Hamiltonian.
- **Execution**: Simulated via Qiskit Aer statevector simulation ($p=1$). Clearly labeled as an experimental simulation without false claims of quantum advantage.

---

## 4. Hybrid Match Score Formulation

The final score is calculated programmatically (never invented by the LLM):

$$\text{Overall Match} = 0.30 \cdot \text{Required Coverage} + 0.15 \cdot \text{Preferred Coverage} + 0.25 \cdot \text{Semantic Sim} + 0.20 \cdot \text{Evidence Strength} + 0.10 \cdot \text{Experience Relevance}$$

---

## 5. Quick Start & Setup

### Environment Variables
Copy `.env.example` to `.env`:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=password
DEMO_MODE=true
```

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit the application at `http://localhost:5173/`.
