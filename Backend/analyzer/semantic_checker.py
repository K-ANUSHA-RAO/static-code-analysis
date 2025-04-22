import ast

class SemanticChecker:
    def __init__(self, code):
        self.code = code
        self.errors = []
        self.tree = ast.parse(code)  # Let syntax errors raise normally

    def analyze(self):
        """Perform semantic analysis of the code only."""
        self.check_for_unused_variables()
        return self.errors

    def check_for_unused_variables(self):
        """Check for unused variables in the AST and report their line numbers."""
        assigned_variables = {}
        used_variables = set()

        for node in ast.walk(self.tree):
            if isinstance(node, ast.Assign):
                for target in node.targets:
                    if isinstance(target, ast.Name):
                        assigned_variables[target.id] = target.lineno
            elif isinstance(node, ast.Name) and isinstance(node.ctx, ast.Load):
                used_variables.add(node.id)

        unused_variables = set(assigned_variables.keys()) - used_variables
        for var in unused_variables:
            lineno = assigned_variables[var]
            self.errors.append(f"Unused variable at line {lineno}: '{var}'")
