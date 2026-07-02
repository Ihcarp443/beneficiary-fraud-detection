from typing import TypedDict
from langchain_core.messages import BaseMessage, add_messages
from typing import Annotated

class GraphState(TypedDict):
    user_id: str
    analysis_id: str
    query: str
    analysis: dict
    messages: Annotated[list[BaseMessage], add_messages]
    answer: str | None
    conversation_summary: str | None