from typing import Dict, Any

class LearningService:
    @classmethod
    def generate_learning_roadmap(cls, skill_gaps: Dict[str, Any], target_role: str) -> Dict[str, Any]:
        priority_items = skill_gaps.get("priority_gaps", [])
        gap_skills = [g["skill"] for g in priority_items]
        focus_skills = gap_skills[:4] if gap_skills else ["System Design", "Cloud Deployment", "Testing / TDD", "Clean Code Architecture"]
        
        week_templates = [
            {
                "week_number": 1,
                "title": f"Week 1: Foundations & Architecture of {focus_skills[0]}",
                "focus_skill": focus_skills[0],
                "objective": f"Establish core conceptual mastery, setup development environment, and master {focus_skills[0]} fundamentals.",
                "estimated_hours": 10,
                "tasks": [
                    {"id": "w1-t1", "title": f"Study {focus_skills[0]} architectural principles and official documentation", "completed": False, "duration": "3 hours", "resource": "Official Documentation & Guides"},
                    {"id": "w1-t2", "title": f"Setup local tooling, CLI, and configuration for {focus_skills[0]}", "completed": False, "duration": "2 hours", "resource": "Interactive Setup Tutorial"},
                    {"id": "w1-t3", "title": f"Build a minimalist starter prototype incorporating {focus_skills[0]}", "completed": False, "duration": "5 hours", "resource": "GitHub Starter Template"}
                ],
                "milestone": f"Functional {focus_skills[0]} sandbox with clean configuration and basic tests."
            },
            {
                "week_number": 2,
                "title": f"Week 2: Advanced Implementation & {focus_skills[1] if len(focus_skills) > 1 else 'Integration Patterns'}",
                "focus_skill": focus_skills[1] if len(focus_skills) > 1 else "Integration Patterns",
                "objective": "Deepen engineering workflows, error handling, and component modularity.",
                "estimated_hours": 12,
                "tasks": [
                    {"id": "w2-t1", "title": "Implement production-grade error handling and schema validation", "completed": False, "duration": "4 hours", "resource": "Architecture Best Practices Whitepaper"},
                    {"id": "w2-t2", "title": "Integrate database indexing / caching for high-throughput performance", "completed": False, "duration": "4 hours", "resource": "Database Optimization Guide"},
                    {"id": "w2-t3", "title": "Write comprehensive unit and integration tests (target >= 85% coverage)", "completed": False, "duration": "4 hours", "resource": "Pytest / Testing Framework Documentation"}
                ],
                "milestone": "Robust, tested module with documented API contracts and benchmarked latency."
            },
            {
                "week_number": 3,
                "title": f"Week 3: Containerization & Cloud Deployment ({focus_skills[2] if len(focus_skills) > 2 else 'DevOps & CI/CD'})",
                "focus_skill": focus_skills[2] if len(focus_skills) > 2 else "DevOps & CI/CD",
                "objective": "Automate deployment pipelines and package application for reproducible cloud execution.",
                "estimated_hours": 10,
                "tasks": [
                    {"id": "w3-t1", "title": "Write multi-stage Dockerfile optimized for lean container image size", "completed": False, "duration": "3 hours", "resource": "Docker Multi-stage Best Practices"},
                    {"id": "w3-t2", "title": "Setup GitHub Actions automated CI workflow for linting, security scan, and tests", "completed": False, "duration": "3 hours", "resource": "GitHub Actions Starter Workflow"},
                    {"id": "w3-t3", "title": "Deploy containerized service to cloud runtime (AWS ECS / GCP Cloud Run / Render)", "completed": False, "duration": "4 hours", "resource": "Cloud Deployment Walkthrough"}
                ],
                "milestone": "Live deployed public staging URL with automated CI/CD pipeline triggers on git push."
            },
            {
                "week_number": 4,
                "title": "Week 4: Capstone Engineering Project & Resume Proof-of-Work",
                "focus_skill": "Full Stack / AI Capstone",
                "objective": f"Synthesize all skills into a standalone, demonstrable GitHub portfolio project aligned with {target_role}.",
                "estimated_hours": 14,
                "tasks": [
                    {"id": "w4-t1", "title": "Author comprehensive README with architectural diagrams, API spec, and benchmark metrics", "completed": False, "duration": "3 hours", "resource": "Technical Writing & README Blueprint"},
                    {"id": "w4-t2", "title": "Record a 2-minute technical walkthrough video explaining design decisions and trade-offs", "completed": False, "duration": "3 hours", "resource": "Loom / Video Demo Guide"},
                    {"id": "w4-t3", "title": "Update resume with measurable accomplishment bullet points and GitHub repository link", "completed": False, "duration": "4 hours", "resource": "STAR Method Action Verb Guide"},
                    {"id": "w4-t4", "title": "Conduct simulated technical mock interview on newly acquired skill competencies", "completed": False, "duration": "4 hours", "resource": "SkillQ Interview Coach Module"}
                ],
                "milestone": "Polished open-source capstone repository and updated evidence-backed resume ready for applications."
            }
        ]
        
        return {
            "target_role": target_role,
            "total_weeks": 4,
            "total_estimated_hours": sum(w["estimated_hours"] for w in week_templates),
            "primary_gap_skills": focus_skills,
            "weeks": week_templates
        }
