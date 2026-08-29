from typing import Dict, Any, List

QUESTION_BANK = [
    {
        "id": "q-rest-1",
        "skill": "REST APIs",
        "category": "Technical",
        "question": "How would you design an idempotent REST API endpoint for order processing, and how do you prevent duplicate transaction executions?",
        "context": "The target role requires backend API design and your resume has partial evidence.",
        "key_points": ["Idempotency-Key HTTP headers", "Database unique constraints", "Distributed locks with Redis", "HTTP status 200 vs 409 vs 201"]
    },
    {
        "id": "q-docker-1",
        "skill": "Docker",
        "category": "Skill Gap",
        "question": "Explain the difference between a multi-stage Docker build and a single-stage build. How does multi-stage compilation reduce container image attack surface and deployment footprint?",
        "context": "Identified as a HIGH PRIORITY skill gap required by the target role.",
        "key_points": ["Builder stage vs lean runtime container", "Exclusion of compilers / dev-dependencies", "Layer caching efficiency", "Security surface reduction"]
    },
    {
        "id": "q-pg-1",
        "skill": "PostgreSQL",
        "category": "Technical",
        "question": "When querying a table with 10 million rows, what indexing strategies would you use to optimize composite queries with WHERE and ORDER BY clauses, and how do you analyze the query plan with EXPLAIN ANALYZE?",
        "context": "The role requires database optimization and indexing expertise.",
        "key_points": ["B-tree composite index column ordering", "Index Scan vs Seq Scan", "EXPLAIN ANALYZE cost estimation", "Covering indexes (INCLUDE clause)"]
    },
    {
        "id": "q-llm-1",
        "skill": "Large Language Models (LLMs)",
        "category": "Scenario",
        "question": "Suppose your RAG pipeline is generating hallucinated answers for specialized domain queries. What systematic evaluation metrics and retrieval optimizations would you implement?",
        "context": "Applied AI requirement for production generative AI systems.",
        "key_points": ["Chunking strategy & overlap tuning", "Hybrid search (BM25 + Dense embeddings)", "Reranking models (Cross-encoders)", "RAG triad metrics: Faithfulness, Answer Relevance, Context Precision"]
    },
    {
        "id": "q-python-1",
        "skill": "Python",
        "category": "Technical",
        "question": "Explain how Python's Global Interpreter Lock (GIL) impacts CPU-bound versus I/O-bound concurrency, and when you would select AsyncIO versus multiprocessing.",
        "context": "Core backend programming competency verification.",
        "key_points": ["GIL thread serialization for CPU bound tasks", "AsyncIO event loop for cooperative I/O concurrency", "Multiprocessing for separate memory space & multi-core utilization", "Subinterpreters / Python 3.13 free-threaded modes"]
    },
    {
        "id": "q-proj-1",
        "skill": "System Design",
        "category": "Project",
        "question": "Walk me through an engineering trade-off you encountered in a recent software project. What technical alternatives did you evaluate and why did you select your final architecture?",
        "context": "Evaluates architectural decision making and communication clarity.",
        "key_points": ["Clear problem framing & constraints", "Concrete trade-off evaluation (e.g. latency vs consistency)", "Measurable outcome / metric improvement", "Reflection on what could be improved"]
    }
]

class InterviewService:
    @classmethod
    def generate_interview_questions(cls, skill_gaps: Dict[str, Any], target_role: str) -> List[Dict[str, Any]]:
        priority_gaps = {g["skill"].lower() for g in skill_gaps.get("priority_gaps", [])}
        selected = []
        for q in QUESTION_BANK:
            if q["skill"].lower() in priority_gaps:
                selected.append(q)
        for q in QUESTION_BANK:
            if q not in selected and len(selected) < 5:
                selected.append(q)
        return selected

    @classmethod
    def evaluate_candidate_answer(cls, question_id: str, question_text: str, candidate_answer: str, target_skill: str) -> Dict[str, Any]:
        answer_clean = candidate_answer.strip()
        if len(answer_clean) < 15:
            return {
                "overall_score": 35,
                "grade": "Needs Elaboration",
                "strengths": ["Attempted response to the question."],
                "missing_concepts": ["Detailed architectural reasoning", "Specific implementation terms", "Concrete trade-off analysis"],
                "technical_accuracy": "Response is too brief to evaluate technical depth.",
                "suggested_improvement": "Provide a structured answer detailing: 1) Core mechanism, 2) Step-by-step implementation, 3) Edge case / failure handling."
            }
            
        q_meta = next((q for q in QUESTION_BANK if q["id"] == question_id), None)
        key_points = q_meta["key_points"] if q_meta else ["Technical depth", "Trade-off analysis", "Implementation clarity", "Security/scalability"]
        
        hits = []
        misses = []
        ans_lower = answer_clean.lower()
        
        for kp in key_points:
            words = [w for w in kp.lower().replace('(', '').replace(')', '').replace('/', ' ').split() if len(w) > 3]
            if any(w in ans_lower for w in words):
                hits.append(kp)
            else:
                misses.append(kp)
                
        score = int(45 + (len(hits) / len(key_points) * 50))
        score = min(96, max(40, score))
        
        if score >= 80:
            grade = "Strong Technical Response"
        elif score >= 65:
            grade = "Good Foundational Understanding"
        else:
            grade = "Partial Understanding"
            
        strengths = [f"Directly addressed {target_skill} requirements in the context of the question."]
        if hits:
            strengths.append(f"Articulated critical concepts: {', '.join(hits[:2])}.")
            
        improvements = "Incorporate quantifiable benchmarks and explain how you would handle failure recovery in a production system."
        
        return {
            "overall_score": score,
            "grade": grade,
            "strengths": strengths,
            "missing_concepts": misses if misses else ["Minor edge cases during network partitions."],
            "technical_accuracy": f"Demonstrates solid grasp of {target_skill} mechanics with sound engineering terminology.",
            "suggested_improvement": improvements
        }
