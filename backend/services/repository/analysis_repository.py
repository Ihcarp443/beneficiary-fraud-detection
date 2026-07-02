
import json
import sqlite3
import uuid

class AnalysisRepository:

    def __init__(self, db_path="sessions/app.db"):
        self.db_path = db_path

    def get_connection(self):
        return sqlite3.connect(self.db_path)

    def get_next_analysis_number(self, user_id: str) -> str:
        """
        Returns:
            ANALYSIS001
            ANALYSIS002
            ...
        """
        conn = self.get_connection()

        cursor = conn.execute(
            """
            SELECT COUNT(*)
            FROM analysis
            WHERE user_id = ?
            """,
            (user_id,)
        )

        count = cursor.fetchone()[0]

        conn.close()

        next_number = count + 1

        return f"ANALYSIS{next_number:03d}"

    def save_analysis(
        self,
        analysis_uuid: str,
        analysis_number: str,
        user_id: str,
        verification_result: dict,
        risk_score: int,
        risk_level: str,
        llm_summary: str,
        masked_report: str,
        status: str = "COMPLETED",
    ):
        conn = self.get_connection()

        conn.execute(
            """
            INSERT INTO analysis (
                analysis_uuid,
                analysis_number,
                user_id,
                verification_result,
                risk_score,
                risk_level,
                llm_summary,
                masked_report,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                analysis_uuid,
                analysis_number,
                user_id,
                json.dumps(verification_result),
                risk_score,
                risk_level,
                llm_summary,
                masked_report,
                status,
            ),
        )

        conn.commit()
        conn.close()


    def save_document(
        self,
        analysis_uuid: str,
        user_id: str,
        document_type: str,
        document_name: str,
        content_type: str,
        file_path: str,
    ):
        conn = self.get_connection()

        conn.execute(
            """
            INSERT INTO documents (
                document_id,
                analysis_uuid,
                user_id,
                document_type,
                document_name,
                content_type,
                file_path
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                str(uuid.uuid4()),
                analysis_uuid,
                user_id,
                document_type,
                document_name,
                content_type,
                file_path,
            ),
        )

        conn.commit()
        conn.close()

    def get_analysis(self, analysis_uuid: str):
        conn = self.get_connection()

        cursor = conn.execute(
            """
            SELECT *
            FROM analysis
            WHERE analysis_uuid=?
            """,
            (analysis_uuid,),
        )

        row = cursor.fetchone()

        conn.close()

        return row
    
    def get_documents(
        self,
        analysis_uuid: str,
    ):
        conn = self.get_connection()

        cursor = conn.execute(
            """
            SELECT
                document_id,
                document_type,
                document_name,
                content_type,
                file_path
            FROM documents
            WHERE analysis_uuid=?
            ORDER BY created_at
            """,
            (analysis_uuid,),
        )

        rows = cursor.fetchall()

        conn.close()

        return rows
    
    def get_user_analyses(
        self,
        user_id: str,
    ):
        conn = self.get_connection()

        cursor = conn.execute(
            """
            SELECT
                analysis_uuid,
                analysis_number,
                risk_score,
                risk_level,
                status,
                created_at
            FROM analysis
            WHERE user_id=?
            ORDER BY created_at DESC
            """,
            (user_id,),
        )

        rows = cursor.fetchall()

        conn.close()

        return rows

# import sqlite3
# import json

# class AnalysisRepository:

#     

#     def save(
#         self,
#         analysis_uuid: str,
#         analysis_number: str,
#         user_id: str,
#         application_path: str,
#         supporting_paths: list[str],
#         parsed_application: dict,
#         parsed_supporting_documents: list,
#         verification_result: dict,
#         risk_assessment: dict,
#         llm_summary: str,
#         masked_report: str,
#     ):

#         conn = self.get_connection()

#         conn.execute(
#             """
#             INSERT INTO analysis
#             (
#                 analysis_uuid,
#                 analysis_number,
#                 user_id,
#                 application_path,
#                 supporting_paths,
#                 parsed_application,
#                 parsed_supporting_documents,
#                 verification_result,
#                 risk_assessment,
#                 llm_summary,
#                 masked_report
#             )
#             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
#             """,
#             (
#                 analysis_uuid,
#                 analysis_number,
#                 user_id,
#                 application_path,
#                 json.dumps(supporting_paths),
#                 json.dumps(parsed_application),
#                 json.dumps(parsed_supporting_documents),
#                 json.dumps(verification_result),
#                 json.dumps(risk_assessment),
#                 llm_summary,
#                 masked_report,
#             ),
#         )

#         conn.commit()
#         conn.close()