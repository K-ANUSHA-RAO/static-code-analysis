def scan(file):
    """Scans the file for security vulnerabilities like eval(), SQLi, and XSS."""
    vulnerabilities = []
    with open(file, 'r') as f:
        content = f.read()
    if "eval(" in content:
        vulnerabilities.append("Use of eval() detected (potential code injection).")
    if "exec(" in content:
        vulnerabilities.append("Use of exec() detected (potential code injection).")
    if "SELECT" in content and ("input(" in content or "raw_input(" in content):
        vulnerabilities.append("Potential SQL injection risk detected.")
    return vulnerabilities
