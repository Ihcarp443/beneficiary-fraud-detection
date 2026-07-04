from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.repository.doc_repository import get_all_analysis,get_documents, get_document_analysis_uuid, get_stats
router = APIRouter()

class DocRequest(BaseModel):
    user_id: str
    user_type: str

def isAllowed(user_type:str):
    return user_type == "ADMIN"

@router.get("/stats")
async def get_document_stats():
    # Implementation for fetching document statistics
    return get_stats()

@router.get("/all/{user_type}")
async def get_all_documents_name(user_type: str):
    try:
        if not isAllowed(user_type):
            raise HTTPException(
                status_code=403,
                detail="Only admins are allowed to fetch result"
            )
        docs = get_all_analysis()
        return {
            "success": True,
            "status_code":200,
            "docs":docs
        }
    except Exception as e:
        print("Error while fetching documents", e)
        raise HTTPException(
            status_code=500,
            detail="Something went wrong. Please try again."
        )

@router.get("/{uuid}")
async def get_doc_by_analysis_uuid(uuid: str):
# async def get_document_analysis_uuid(uuid: str):
    try:
        doc = get_document_analysis_uuid(uuid)
        print("Document fetched successfully:", doc)
        if not doc:
            raise HTTPException(
                status_code=404,
                detail="Document not found"
            )
        return {
            "success": True,
            "status_code":200,
            "doc": doc
        }
    except Exception as e:
        print("Error while fetching document", e)
        raise HTTPException(
            status_code=500,
            detail="Something went wrong. Please try again."
        )