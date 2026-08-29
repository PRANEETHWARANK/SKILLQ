import time
from typing import List, Dict, Any

class ClassicalOptimizer:
    @staticmethod
    def optimize(
        matched_items: List[Dict[str, Any]],
        required_weight: float = 1.0,
        preferred_weight: float = 0.55
    ) -> Dict[str, Any]:
        start_time = time.perf_counter()
        
        if not matched_items:
            return {
                "classical_score": 0.0,
                "objective_value": 0.0,
                "selected_skills": [],
                "execution_time_ms": 0.1,
                "matched_count": 0,
                "total_requirements": 0
            }
            
        total_weight = 0.0
        achieved_weight = 0.0
        selected = []
        
        for item in matched_items:
            is_req = item.get("requirement", "Required").lower() == "required"
            w = required_weight if is_req else preferred_weight
            confidence = item.get("confidence", 0.0)
            status = item.get("match_status", "Missing")
            
            total_weight += w
            
            if status in ["Strong", "Partial"] and confidence >= 0.40:
                score_contrib = w * confidence
                achieved_weight += score_contrib
                selected.append({
                    "skill": item["skill"],
                    "requirement": item["requirement"],
                    "confidence": confidence,
                    "contribution": round(score_contrib, 3)
                })
            elif status == "Weak":
                score_contrib = w * confidence * 0.5
                achieved_weight += score_contrib
                
        classical_score = (achieved_weight / total_weight * 100.0) if total_weight > 0 else 0.0
        elapsed_ms = round((time.perf_counter() - start_time) * 1000, 3)
        
        return {
            "classical_score": round(classical_score, 1),
            "objective_value": round(achieved_weight, 4),
            "total_possible_weight": round(total_weight, 4),
            "selected_skills": selected,
            "execution_time_ms": elapsed_ms,
            "matched_count": len(selected),
            "total_requirements": len(matched_items),
            "algorithm": "Classical Greedy Weighted Matching"
        }
