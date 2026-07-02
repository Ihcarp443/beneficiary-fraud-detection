import sqlite3
def init_db():
    conn = get_db_connection()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS analysis (
            analysis_uuid TEXT PRIMARY KEY,
            analysis_number TEXT NOT NULL,
            user_id TEXT NOT NULL,

            verification_result TEXT,

            risk_score INTEGER,
            risk_level TEXT,

            llm_summary TEXT,
            masked_report TEXT,

            status TEXT DEFAULT 'COMPLETED',

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY(user_id) REFERENCES users(id)
        )
        """)
    
    conn.execute("""
        CREATE TABLE IF NOT EXISTS documents (   
            document_id TEXT PRIMARY KEY,
            analysis_uuid TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            document_type TEXT,
            document_name TEXT,
            content_type TEXT,
            file_path TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(analysis_uuid) REFERENCES analysis(analysis_uuid),
            FOREIGN KEY(user_id) REFERENCES users(id)
            )
        """)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS threads(
            thread_id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            title TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            thread_id TEXT,
            question TEXT,
            answer TEXT,
            feedback TEXT,
            reason TEXT,
            comment TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        phone TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    


def get_db_connection():
    return sqlite3.connect(
        "sessions/app.db",
        check_same_thread=False
    )
