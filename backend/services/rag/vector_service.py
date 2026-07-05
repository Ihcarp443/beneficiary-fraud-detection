from langchain_core.documents import Document


class VectorService:

    def __init__(self, vector_store):
        self.vector_store = vector_store

    def update_vector_db(
        self,
        analysis_uuid: str,
        user_id: str,
        masked_report: str,
        findings: list,
        risk_score: int,
        risk_level: str,
    ):
        """
        Stores one completed analysis into the vector database.

        Thread ID = Analysis UUID
        """

        documents = []

        # ----------------------------------------
        # AI Summary
        # ----------------------------------------

        documents.append(
            Document(
                page_content=masked_report,
                metadata={
                    "analysis_uuid": analysis_uuid,
                    "thread_id": analysis_uuid,
                    "user_id": user_id,
                    "type": "summary",
                    "risk_score": risk_score,
                    "risk_level": risk_level,
                },
            )
        )

        # ----------------------------------------
        # Verification Findings
        # ----------------------------------------

        for finding in findings:

            text = (
                f"""
Field : {finding['field']}

Status : {finding['status']}

Importance : {finding['importance']}

Document : {finding['document']}
                """
            ).strip()

            documents.append(
                Document(
                    page_content=text,
                    metadata={
                        "analysis_uuid": analysis_uuid,
                        "thread_id": analysis_uuid,
                        "user_id": user_id,
                        "type": "finding",
                        "field": finding["field"],
                        "document": finding["document"],
                        "status": finding["status"],
                        "importance": finding["importance"],
                    },
                )
            )

        self.vector_store.add_documents(documents)

        print(
            f"[VectorService] Indexed {len(documents)} chunks for analysis {analysis_uuid}"
        )