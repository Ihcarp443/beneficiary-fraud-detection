from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
import asyncio
from pydantic import BaseModel
from config.dependencies import analysis_service

class UploadedDocument(BaseModel):
    filename: str
    content_type: str
    content: bytes

router = APIRouter()

@router.post("/analyze")
async def analyze(
    userId: str,
    application: UploadFile = File(...),
    supporting_documents: List[UploadFile] = File(...)
):
    try:
        allowed_types = ["application/pdf", "image/jpeg", "image/png"]

        if application.content_type not in allowed_types:
            raise HTTPException(400, "Application must be a PDF or image.")

        for doc in supporting_documents:
            if doc.content_type not in allowed_types:
                raise HTTPException(400, f"Unsupported file type: {doc.filename}")

        if len(supporting_documents) == 0:
            raise HTTPException(400, "Please upload at least one supporting document.")

        application_doc = UploadedDocument(
            filename=application.filename,
            content_type=application.content_type,
            content=await application.read()
        )

        supporting_docs = [
            UploadedDocument(
                filename=doc.filename,
                content_type=doc.content_type,
                content=await doc.read()
            )
            for doc in supporting_documents
        ]
        analysis_result = await asyncio.to_thread(
            analysis_service.analyze,
            userId,
            application_doc,
            supporting_docs
        )

        return {
            "success": True,
            "analysis_id": analysis_result.analysis_id,
            "risk_score": analysis_result.risk_score,
            "risk_level": analysis_result.risk_level,
            "summary": analysis_result.summary,
            "findings": analysis_result.findings
        }

    except HTTPException:
        raise
    except Exception as e:
        print("Analysis Error:", e)
        raise HTTPException(500, "Failed to analyze the uploaded documents.")
