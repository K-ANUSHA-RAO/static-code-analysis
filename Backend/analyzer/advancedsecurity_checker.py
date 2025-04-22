# advancedsecurity_checker.py

class AdvancedSecurityChecker:
    def __init__(self, code):
        self.code = code
        self.errors = []

    def check(self):
        """Perform advanced security checks on the code."""
        self.check_for_hardcoded_secrets()
        self.check_for_insecure_functions()
        return self.errors

    def check_for_hardcoded_secrets(self):
        """Check for hardcoded secrets like passwords or API keys with line numbers."""
        keywords = ["password", "API_KEY", "secret", "token"]
        for lineno, line in enumerate(self.code.splitlines(), start=1):
            for keyword in keywords:
                if keyword in line:
                    self.errors.append(f"Potential hardcoded secret '{keyword}' at line {lineno}: {line.strip()}")

    def check_for_insecure_functions(self):
        """Check for usage of insecure functions with line numbers."""
        insecure_functions = ['eval', 'exec', 'os.system']
        for lineno, line in enumerate(self.code.splitlines(), start=1):
            for func in insecure_functions:
                if func in line:
                    self.errors.append(f"Usage of insecure function '{func}' at line {lineno}: {line.strip()}")


