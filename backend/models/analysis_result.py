from pydantic import BaseModel

class AnalysisResult(BaseModel):
    analysis_id: str
    risk_score: int
    risk_level: str
    findings: list
    summary: str