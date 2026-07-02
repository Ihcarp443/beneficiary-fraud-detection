import sqlite3


class AnalysisRepository:

    def __init__(self, db_path="db.sqlite"):
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

    def save(
        self,
        analysis_uuid: str,
        analysis_number: str,
        user_id: str,
        application_path: str,
        supporting_paths: list[str],
        parsed_application: dict,
        parsed_supporting_documents: list,
        verification_result: dict,
        risk_assessment: dict,
        llm_summary: str,
        masked_report: str,
    ):

        conn = self.get_connection()

        conn.execute(
            """
            INSERT INTO analysis
            (
                analysis_uuid,
                analysis_number,
                user_id,
                application_path,
                supporting_paths,
                parsed_application,
                parsed_supporting_documents,
                verification_result,
                risk_assessment,
                llm_summary,
                masked_report
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                analysis_uuid,
                analysis_number,
                user_id,
                application_path,
                json.dumps(supporting_paths),
                json.dumps(parsed_application),
                json.dumps(parsed_supporting_documents),
                json.dumps(verification_result),
                json.dumps(risk_assessment),
                llm_summary,
                masked_report,
            ),
        )

        conn.commit()
        conn.close()