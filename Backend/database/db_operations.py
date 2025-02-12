import sqlite3
import json

DB_FILE = "database/scan_results.db"

def insert_scan_result(file, semantic_errors, vulnerabilities, quality_issues, dependency_issues):
    """Inserts a scan result into the database."""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO scan_results (file, semantic_errors, vulnerabilities, quality_issues, dependency_issues)
        VALUES (?, ?, ?, ?, ?)
    """, (file, json.dumps(semantic_errors), json.dumps(vulnerabilities), quality_issues, dependency_issues))
    conn.commit()
    conn.close()
