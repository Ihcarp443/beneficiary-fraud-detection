from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import uuid

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    analysis_id: str
    thread_id: str | None = None
    user_id: str | None = None

def create_title(content):
    return content[:50]

@router.post('/chat')
async def chat(req: ChatRequest):
    if req.thread_id is None:
        thread_id = str(uuid.uuid4())
        # save_thread(thread_id,user_id=req.user_id,title=create_title(req.message[:50]))
    else:
        thread_id=req.thread_id

    user_id=req.user_id or 'unknown'
    print("user_id",user_id)
    config = {
        "configurable": {
            "thread_id": thread_id
        }
    }

    analysis_data = get_analysis(req.analysis_id)

    if analysis_data is None:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found."
        )
    
    state = {
        "user_id": user_id,
        "analysis_id": req.analysis_id,
        "query": req.message,
        "analysis": analysis_data,
        "messages": load_chat_history(thread_id) or [],
        "answer": ""
    }

    try:
        result = graph.invoke(
            state,
            config = config
        )
        return {
            "success":True,
            "thread_id":thread_id,
            "answer": result.get("answer","")
        }
    except Exception as e:
        print("Error during chat", e)
        raise HTTPException(
            status_code=500,
            detail="Something went wrong. Please try again."
        )

