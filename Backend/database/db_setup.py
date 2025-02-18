import sqlite3

DB_FILE = "database/scan_results.db"

def initialize_db():
    """Initializes the database schema."""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS scan_results (
            id INTEGER PRIMARY KEY,
            file TEXT,
            semantic_errors TEXT,
            vulnerabilities TEXT,
            quality_issues TEXT,
            dependency_issues TEXT
        )
    """)
    conn.commit()
    conn.close()
