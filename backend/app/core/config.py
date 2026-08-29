from typing import List, Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "SkillQ"
    PROJECT_TAGLINE: str = "One AI Ranks. One AI Checks. You Decide."
    PROJECT_DESCRIPTION: str = "Hybrid LLM + ML + Semantic Embedding + Quantum Optimization Career Intelligence."
    API_V1_STR: str = "/api"
    CORS_ORIGINS: List[str] = ["*"]
    DATABASE_URL: str = "sqlite:///./skillq.db"
    
    # Gemini 2.5 Flash configuration
    GEMINI_API_KEY: Optional[str] = None
    GEMINI_MODEL: str = "gemini-2.5-flash"
    
    # Neo4j Graph DB configuration
    NEO4J_URI: Optional[str] = "bolt://localhost:7687"
    NEO4J_USERNAME: Optional[str] = "neo4j"
    NEO4J_PASSWORD: Optional[str] = "password"
    
    MAX_UPLOAD_SIZE_MB: int = 10
    DEMO_MODE: bool = True

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
