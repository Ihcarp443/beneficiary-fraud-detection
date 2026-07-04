import sqlite3
def init_db():
    conn = get_db_connection()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS analysis (
            analysis_uuid TEXT PRIMARY KEY,
            analysis_number TEXT NOT NULL,
            user_id TEXT NOT NULL,
            analysis_name TEXT,
            verification_result TEXT,
            risk_score INTEGER,
            risk_level TEXT,
            llm_summary TEXT,
            masked_report TEXT,
            status TEXT DEFAULT 'COMPLETED',
            comments TEXT,
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

            verification_status TEXT,
            severity TEXT,

            matched_fields INTEGER DEFAULT 0,
            mismatched_fields INTEGER DEFAULT 0,
            missing_fields INTEGER DEFAULT 0,

            comments TEXT,

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
            id INTEGER PRIMARY KEY AUTOINCREMENT,s````````````````````````````````````````````````
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
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        user_type TEXT DEFAULT 'PUBLIC',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                 
        )
    """)

def get_db_connection():
    return sqlite3.connect(
        "sessions/app.db",
        check_same_thread=False
    )
