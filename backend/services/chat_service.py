from services.rag.retrieval_service import RetrievalService
from services.llm.llm_service import HfProvider
from services.rag.vector_store import vector_store
llm = HfProvider()
retrieval = RetrievalService(vector_store=vector_store)

from prompts.botprompt import CHAT_PROMPT

class ChatService:

    def ask(
        self,
        prompt,
        analysis_uuid,
        user_id
    ):

        docs = retrieval.retrieve(
            prompt=prompt,
            analysis_uuid=analysis_uuid,
            user_id=user_id
        )

        context = "\n\n".join(
            doc.page_content
            for doc in docs
        )

        final_prompt = CHAT_PROMPT.format(
            context=context,
            question=prompt
        )

        response = llm.generate(final_prompt)

        return response.content