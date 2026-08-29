from typing import List, Dict, Any, Optional
from app.core.config import settings

class EvidenceGraphService:
    @classmethod
    def build_evidence_graph_payload(
        cls,
        candidate_name: str,
        role_title: str,
        matched_matrix: List[Dict[str, Any]],
        projects: List[Dict[str, Any]],
        experience: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        
        nodes = [
            {"id": "node-candidate", "label": candidate_name or "Candidate", "type": "Candidate", "details": "Sanitized Candidate Profile"},
            {"id": "node-job", "label": role_title, "type": "Job", "details": "Target Entry-Level Role"}
        ]
        
        links = []

        # Connect Projects and Experience
        for i, proj in enumerate(projects):
            p_id = f"node-proj-{i}"
            nodes.append({"id": p_id, "label": proj.get("name", f"Project {i+1}"), "type": "Project", "details": proj.get("description", "")[:120]})
            links.append({"source": "node-candidate", "target": p_id, "relation": "COMPLETED_PROJECT"})

        for i, exp in enumerate(experience):
            e_id = f"node-exp-{i}"
            nodes.append({"id": e_id, "label": f"{exp.get('role', 'Role')} ({exp.get('company', 'Company')})", "type": "Experience", "details": exp.get("description", "")[:120]})
            links.append({"source": "node-candidate", "target": e_id, "relation": "HAS_EXPERIENCE"})

        # Connect Skills & Requirements
        for m in matched_matrix:
            s_name = m["skill"]
            s_id = f"node-skill-{s_name}"
            status = m["match_status"]
            req_type = m["requirement"]
            
            nodes.append({
                "id": s_id,
                "label": s_name,
                "type": "Skill",
                "status": status,
                "requirement": req_type,
                "evidence_strength": m.get("evidence_strength", status),
                "details": m.get("reason", "")
            })
            
            # Job REQUIRES Skill
            links.append({"source": "node-job", "target": s_id, "relation": "REQUIRES", "tier": req_type})
            
            # Candidate Match relation
            if status == "Strong":
                links.append({"source": "node-candidate", "target": s_id, "relation": "HAS_SKILL", "status": "Strong"})
            elif status == "Partial":
                links.append({"source": "node-candidate", "target": s_id, "relation": "PARTIAL_MATCH", "status": "Partial"})
            else:
                links.append({"source": "node-candidate", "target": s_id, "relation": "MISSING", "status": "Missing"})

        return {
            "graph_summary": {
                "total_nodes": len(nodes),
                "total_edges": len(links),
                "backend": "Neo4j Semantic Graph Representation",
                "answers": {
                    "what_matched": [m["skill"] for m in matched_matrix if m["match_status"] == "Strong"],
                    "partial_matches": [m["skill"] for m in matched_matrix if m["match_status"] == "Partial"],
                    "missing_skills": [m["skill"] for m in matched_matrix if m["match_status"] == "Missing"]
                }
            },
            "nodes": nodes,
            "links": links
        }
