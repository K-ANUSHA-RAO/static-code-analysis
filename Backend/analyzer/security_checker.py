def scan(file):
    """Scans the file for common security vulnerabilities."""
    vulnerabilities = []
    with open(file, 'r') as f:
        content = f.read()
    if "eval(" in content:
        vulnerabilities.append("Use of eval() detected.")
    return vulnerabilities
