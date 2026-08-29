import os
import re
import json
from typing import Dict, List, Any

TAXONOMY_FILE = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'data', 'skill_taxonomy.json')

def _load_taxonomy() -> Dict[str, Dict[str, Any]]:
    if os.path.exists(TAXONOMY_FILE):
        try:
            with open(TAXONOMY_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            pass
    return {
        'Python': {'category': 'Languages', 'aliases': ['python programming', 'python 3', 'python3', 'python development', 'py'], 'related': ['Django', 'FastAPI', 'PyTorch']},
        'Machine Learning': {'category': 'AI / ML', 'aliases': ['ml', 'machine learning algorithms', 'statistical learning'], 'related': ['Python', 'PyTorch']},
        'PyTorch': {'category': 'AI / ML', 'aliases': ['py torch', 'torch', 'pytorch'], 'related': ['Python', 'Deep Learning']},
        'Natural Language Processing': {'category': 'AI / ML', 'aliases': ['nlp', 'natural language', 'text processing'], 'related': ['Transformers', 'Large Language Models (LLMs)']},
        'JavaScript': {'category': 'Languages', 'aliases': ['js', 'javascript programming', 'vanilla js', 'ecmascript'], 'related': ['TypeScript', 'React']},
        'TypeScript': {'category': 'Languages', 'aliases': ['ts', 'typescript programming'], 'related': ['JavaScript', 'React']},
        'FastAPI': {'category': 'Backend', 'aliases': ['fast-api', 'fastapi'], 'related': ['Python', 'REST APIs']},
        'PostgreSQL': {'category': 'Databases', 'aliases': ['postgres', 'postgresql database', 'pgvector'], 'related': ['SQL']},
        'Docker': {'category': 'DevOps / Cloud', 'aliases': ['docker container', 'dockerization', 'dockerfile'], 'related': ['AWS', 'Kubernetes']},
        'AWS': {'category': 'DevOps / Cloud', 'aliases': ['amazon web services', 'aws cloud'], 'related': ['Docker']}
    }

SKILL_TAXONOMY = _load_taxonomy()

class SkillTaxonomyService:
    @classmethod
    def normalize_skill(cls, raw_skill_name: str) -> str:
        if not raw_skill_name:
            return ''
        clean = raw_skill_name.strip()
        query = clean.lower()
        query_compact = re.sub(r'[^a-z0-9]', '', query)
        
        # 1. Exact or compact key match
        for canon in SKILL_TAXONOMY:
            if query == canon.lower() or query_compact == re.sub(r'[^a-z0-9]', '', canon.lower()):
                return canon

        # 2. Alias matching
        for canon, meta in SKILL_TAXONOMY.items():
            for alias in meta.get('aliases', []):
                alias_lower = alias.lower()
                alias_compact = re.sub(r'[^a-z0-9]', '', alias_lower)
                if query == alias_lower or query_compact == alias_compact or f' {alias_lower} ' in f' {query} ':
                    return canon

        return clean.title()

    @classmethod
    def get_category(cls, canonical_skill: str) -> str:
        return SKILL_TAXONOMY.get(canonical_skill, {}).get('category', 'General Engineering')

    @classmethod
    def search_skills_in_text(cls, text: str) -> List[Dict[str, Any]]:
        found = []
        for canon, meta in SKILL_TAXONOMY.items():
            patterns = [canon.lower()] + [a.lower() for a in meta.get('aliases', [])]
            for p in patterns:
                regex = r'(?<![a-zA-Z0-9_])' + re.escape(p) + r'(?![a-zA-Z0-9_])'
                matches = list(re.finditer(regex, text, re.IGNORECASE))
                if matches:
                    found.append({
                        'canonical_skill': canon,
                        'category': meta.get('category', 'General Engineering'),
                        'matched_term': p,
                        'count': len(matches)
                    })
                    break
        return found
