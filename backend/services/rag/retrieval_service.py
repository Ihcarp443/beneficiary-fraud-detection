class RetrievalService:

    def __init__(self, vector_store):
        self.vector_store = vector_store

    def retrieve(
        self,
        prompt: str,
        analysis_uuid: str,
        user_id: str,
        k: int = 5
    ):
        
        print(f"[Retriever] Query : {prompt}")
        print(f"[Retriever] Analysis : {analysis_uuid}")

        retriever = self.vector_store.as_retriever(
            search_kwargs={
                "k": k,
                "filter": {
                    "$and": [
                        {"analysis_uuid": analysis_uuid},
                        {"user_id": user_id}
                    ]
                }
            }
        )

        documents = retriever.invoke(prompt)

        print(f"[Retriever] Retrieved {len(documents)} chunks")

        return documents

    def retrieve_context(
        self,
        prompt: str,
        analysis_uuid: str,
        user_id: str,
        k: int = 5
    ):
        """
        Returns retrieved chunks as one formatted context string.
        """

        docs = self.retrieve(
            prompt,
            analysis_uuid,
            user_id,
            k
        )

        if not docs:
            return ""

        context = "\n\n".join(
            doc.page_content
            for doc in docs
        )

        return context