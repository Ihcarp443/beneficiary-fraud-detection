from fastapi import APIRouter
from pydantic import BaseModel
from services.chat_service import ChatService

router = APIRouter()
chatbot_service = ChatService()

class ChatRequest(BaseModel):
    prompt: str
    analysis_uuid: str
    user_id: str

@router.post("/chatservice")
async def chat(req: ChatRequest):

    answer = chatbot_service.ask(
        prompt=req.prompt,
        analysis_uuid=req.analysis_uuid,
        user_id=req.user_id
    )

    return {
        "success": True,
        "answer": answer
    }