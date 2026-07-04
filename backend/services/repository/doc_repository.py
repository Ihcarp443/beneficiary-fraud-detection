from services.repository.sqlite import get_db_connection
def get_count_of_docs(uuid: str):
    conn = get_db_connection()
    cursor = conn.execute(
        """
        SELECT
            COUNT(*) AS total_documents,
            SUM(CASE WHEN document_type = 'supporting' THEN 1 ELSE 0 END) AS supporting_documents,
            SUM(CASE WHEN document_type = 'application' THEN 1 ELSE 0 END) AS application_documents
        FROM documents where analysis_uuid=?
        """,(uuid,)
    )
    stats = cursor.fetchone()
    conn.close()
    print("Document statistics fetched successfully:", stats)

    return {
        "total_documents": stats[0],
        "supporting_documents": stats[1],
        "application_documents": stats[2]
    }

# def get_all_analysis():
#     conn = get_db_connection()
#     cursor = conn.execute(
#         """
#         SELECT *
#         FROM analysis
#         """
#     )
#     analysis_list = cursor.fetchall()
#     for analysis in analysis_list:
#         analysis["doc_count"] = get_count_of_docs(analysis["analysis_uuid"])

#     conn.close()
#     return analysis_list

# from services.repository.sqlite import get_db_connection


def get_all_analysis():
    conn = get_db_connection()

    cursor = conn.execute(
        """
        SELECT
            analysis_uuid,
            analysis_number,
            user_id,
            verification_result,
            risk_score,
            risk_level,
            llm_summary,
            masked_report,
            status,
            comments,
            created_at
        FROM analysis
        ORDER BY created_at DESC
        """
    )

    rows = cursor.fetchall()
    conn.close()

    analysis_list = []

    for row in rows:
        analysis = {
            "analysis_uuid": row[0],
            "analysis_number": row[1],
            "user_id": row[2],
            "verification_result": row[3],
            "risk_score": row[4],
            "risk_level": row[5],
            "llm_summary": row[6],
            "masked_report": row[7],
            "status": row[8],
            "comments": row[9],
            "created_at": row[10],
        }

        analysis["doc_count"] = get_count_of_docs(
            analysis["analysis_uuid"]
        )

        analysis_list.append(analysis)

    return analysis_list

def get_stats():
    conn = get_db_connection()
    cursor = conn.execute(
        """
        SELECT
            COUNT(*) AS total_documents,
            SUM(CASE WHEN status = 'unverified' THEN 1 ELSE 0 END) AS unverified_documents,
            SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) AS completed_documents,
            SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending_documents
        FROM analysis
        """
    )
    stats = cursor.fetchone()
    conn.close()
    print("Document statistics fetched successfully:", stats)

    return {
        "total_documents": stats[0],
        "verified_documents": stats[2],
        "unverified_documents": stats[1],
        "pending_documents": stats[3]
    }

def get_document_analysis_uuid(analysis_uuid: str):
    conn = get_db_connection()
    print("Fetching document for analysis_uuid:", analysis_uuid)

    cursor = conn.execute(
        """
        SELECT
            document_id,
            analysis_uuid,
            user_id,
            document_type,
            document_name,
            content_type,
            file_path,
            verification_status,
            severity,
            matched_fields,
            mismatched_fields,
            missing_fields,
            comments,
            created_at
        FROM documents
        WHERE analysis_uuid = ?
          AND document_type = "supporting"
        """,
        (analysis_uuid,)
    )

    rows = cursor.fetchall()
    # print("row",row)
    conn.close()
    if rows:
        return rows
    else:
        return None

def get_documents():
    conn = get_db_connection()

    cursor = conn.execute(
        """
        SELECT
            document_id,
            analysis_uuid,
            user_id,
            document_type,
            document_name,
            content_type
            file_path,
            created_at
        FROM documents
        ORDER BY created_at DESC
        """,
        ()
    )

    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "document_id": row[0],
            "thread_id": row[1],
            "display_name": row[2],
            "original_filename": row[3],
            "filename": row[4],
            "category": row[5],
            "file_type": row[6],
            "file_path": row[7],
            "created_at": row[8]
        }
        for row in rows
    ]

def delete_documents_by_thread(
    thread_id: str,
    user_id: str
):
    conn = get_db_connection()

    conn.execute(
        """
        DELETE FROM documents
        WHERE thread_id = ?
          AND user_id = ?
        """,
        (thread_id, user_id)
    )

    conn.commit()
    conn.close()