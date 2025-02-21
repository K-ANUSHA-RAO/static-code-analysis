import ast

class SyntaxAnalyzer:
    def __init__(self, code):
        self.code = code  # The code to analyze

    def analyze(self):
        """Analyze the code and generate the syntax tree."""
        try:
            # Parse the code into an AST
            tree = ast.parse(self.code)
            errors = []
            errors.extend(self.check_missing_colon())
            errors.extend(self.check_type_mismatch(tree))
            return errors
        except SyntaxError as e:
            return [f"Syntax Error: {e.msg} at line {e.lineno}, column {e.offset}"]
        except Exception as e:
            return [f"Error while analyzing code: {str(e)}"]

    def check_missing_colon(self):
        """Check for missing colons in function definitions and control flow statements."""
        errors = []
        for lineno, line in enumerate(self.code.splitlines(), start=1):
            if ('if ' in line or 'def ' in line or 'for ' in line or 'while ' in line or 'class ' in line) and not line.endswith(":"):
                errors.append(f"Missing colon at the end of line {lineno}: {line.strip()}")
        return errors

    def check_type_mismatch(self, tree):
        """Check for mismatched types in binary operations."""
        errors = []
        for node in ast.walk(tree):
            if isinstance(node, ast.BinOp):
                if isinstance(node.left, ast.Constant) and isinstance(node.right, ast.Constant):
                    if isinstance(node.left.value, int) and isinstance(node.right.value, str):
                        errors.append(f"Type mismatch: int + str at line {node.lineno}")
        return errors
