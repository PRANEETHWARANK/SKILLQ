import numpy as np
from typing import List, Dict, Any
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class EmbeddingService:
    @classmethod
    def compute_similarity(cls, text_a: str, text_b: str) -> float:
        if not text_a or not text_b:
            return 0.0
        
        words_a = set(w.lower() for w in text_a.split() if len(w) > 1)
        words_b = set(w.lower() for w in text_b.split() if len(w) > 1)
        
        overlap = len(words_a.intersection(words_b)) / min(len(words_a), len(words_b)) if min(len(words_a), len(words_b)) > 0 else 0.0
        
        try:
            vec = TfidfVectorizer(ngram_range=(1, 2), sublinear_tf=True)
            tfidf = vec.fit_transform([text_a, text_b])
            cos = float(cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0])
        except Exception:
            cos = 0.0

        score = float(0.5 * cos + 0.5 * overlap)
        return float(max(0.0, min(1.0, score)))

    @classmethod
    def compute_semantic_coverage(cls, candidate_texts: List[str], requirement_texts: List[str]) -> Dict[str, Any]:
        if not candidate_texts or not requirement_texts:
            return {'mean_similarity': 0.0, 'match_scores': {}}

        cand_corpus = ' '.join(candidate_texts)
        scores = {}
        for req in requirement_texts:
            sim = cls.compute_similarity(cand_corpus, req)
            if req.lower() in cand_corpus.lower():
                sim = max(sim, 0.92)
            scores[req] = round(sim, 3)

        mean_sim = float(np.mean(list(scores.values()))) if scores else 0.0
        return {
            'mean_similarity': round(mean_sim, 3),
            'match_scores': scores
        }
