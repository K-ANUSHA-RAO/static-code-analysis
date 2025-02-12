import subprocess

def check_code_quality(file):
    """Runs pylint on the given file and returns the score and issues."""
    result = subprocess.run(["pylint", file, "--score=y", "--output-format=json"], capture_output=True, text=True)
    return result.stdout
