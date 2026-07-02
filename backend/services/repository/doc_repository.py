from backend.services.repository.sqlite import get_db_connection
import uuid

def save_document(
    thread_id: str,
    user_id: str,
    filename: str,
    original_filename: str,
    display_name: str,
    category: str,
    file_type: str,
    file_path: str
):
    conn = get_db_connection()

    conn.execute(
        """
        INSERT INTO documents (
            document_id,
            thread_id,
            user_id,
            filename,
            original_filename,
            display_name,
            category,
            file_type,
            file_path
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            str(uuid.uuid4()),
            thread_id,
            user_id,
            filename,
            original_filename,
            display_name,
            category,
            file_type,
            file_path
        )
    )

    conn.commit()
    conn.close()

# def get_documents(
#     thread_id: str,
#     user_id: str
# ):
#     conn = get_db_connection()

#     cursor = conn.execute(
#         """
#         SELECT
#             document_id,
#             display_name,
#             original_filename,
#             filename,
#             category,
#             file_type,
#             file_path,
#             created_at
#         FROM documents
#         WHERE thread_id = ?
#           AND user_id = ?
#         ORDER BY created_at DESC
#         """,
#         (thread_id, user_id)
#     )

#     rows = cursor.fetchall()
#     conn.close()

#     return [
#         {
#             "document_id": row[0],
#             "display_name": row[1],
#             "original_filename": row[2],
#             "filename": row[3],
#             "category": row[4],       # uploaded/generated
#             "file_type": row[5],
#             "file_path": row[6],
#             "created_at": row[7]
#         }
#         for row in rows
#     ]


def get_documents(user_id: str):
    conn = get_db_connection()

    cursor = conn.execute(
        """
        SELECT
            document_id,
            thread_id,
            display_name,
            original_filename,
            filename,
            category,
            file_type,
            file_path,
            created_at
        FROM documents
        WHERE user_id = ?
        ORDER BY created_at DESC
        """,
        (user_id,)
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