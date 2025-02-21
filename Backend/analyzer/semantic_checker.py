import ast

class SemanticChecker:
    def __init__(self, code):
        self.code = code
        self.errors = []

        # Handle SyntaxError while parsing
        try:
            self.tree = ast.parse(code)
        except SyntaxError as e:
            self.errors.append(f"Syntax Error: {e.msg} at line {e.lineno}, column {e.offset}")
            self.tree = None  # Set tree to None to avoid further processing

    def analyze(self):
        """Perform semantic analysis of the code."""
        if self.tree is None:
            return self.errors  # Return syntax errors directly

        self.check_for_unused_variables()
        return self.errors

    def check_for_unused_variables(self):
        """Check for unused variables in the AST."""
        assigned_variables = set()
        used_variables = set()

        for node in ast.walk(self.tree):
            if isinstance(node, ast.Assign):
                for target in node.targets:
                    if isinstance(target, ast.Name):
                        assigned_variables.add(target.id)
            elif isinstance(node, ast.Name) and isinstance(node.ctx, ast.Load):
                used_variables.add(node.id)

        unused_variables = assigned_variables - used_variables
        for var in unused_variables:
            self.errors.append(f"Unused variable: {var}")
