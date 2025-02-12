import subprocess

def check_dependencies():
    """Runs pip-audit to check for known vulnerabilities in installed packages."""
    result = subprocess.run(["pip-audit", "--format=json"], capture_output=True, text=True)
    return result.stdout
