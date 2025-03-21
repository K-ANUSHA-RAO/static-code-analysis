import ast

class SecurityChecker:
    def __init__(self, code):
        self.code = code
        self.errors = []

    def check(self):
        # Parse the code into an Abstract Syntax Tree (AST)
        try:
            tree = ast.parse(self.code)
            self.visit(tree)
        except SyntaxError as e:
            self.errors.append(f"Syntax Error: {e.msg} at line {e.lineno}")
        return self.errors

    def visit(self, node):
        # Visit each node in the AST
        for child in ast.iter_child_nodes(node):
            self.visit(child)

        # Check for specific security issues
        if isinstance(node, ast.Call):
            self.check_for_insecure_calls(node)

        if isinstance(node, ast.Assign):
            self.check_for_hardcoded_secrets(node)

        if isinstance(node, ast.Import):
            self.check_for_insecure_imports(node)

        if isinstance(node, ast.With):
            self.check_for_insecure_file_handling(node)

    def check_for_insecure_calls(self, node):
        # Check for calls to insecure functions
        insecure_functions = ['eval', 'exec', 'os.system', 'subprocess.call']
        if isinstance(node.func, ast.Name) and node.func.id in insecure_functions:
            self.errors.append(f"Security Warning: Use of '{node.func.id}' detected at line {node.lineno}.")

        # Check for exec() with dynamic content
        if isinstance(node.func, ast.Attribute) and node.func.attr == 'exec':
            self.errors.append(f"Security Warning: Use of 'exec()' detected at line {node.lineno}. Ensure it is not executed with dynamic content.")

    def check_for_hardcoded_secrets(self, node):
        # Check for hardcoded API keys or passwords
        for target in node.targets:
            if isinstance(target, ast.Name) and 'key' in target.id.lower():
                if isinstance(node.value, ast.Str):
                    self.errors.append(f"Security Warning: Hardcoded secret detected at line {node.lineno}. Consider using environment variables.")

    def check_for_insecure_imports(self, node):
        # Check for imports of insecure modules
        insecure_modules = ['pickle', 'subprocess', 'os']
        for alias in node.names:
            if alias.name in insecure_modules:
                self.errors.append(f"Security Warning: Insecure import '{alias.name}' detected at line {node.lineno}. Consider alternatives.")

    def check_for_insecure_file_handling(self, node):
        # Check for open() calls with potentially unsafe modes
        for item in node.items:
            if isinstance(item.context_expr, ast.Call) and isinstance(item.context_expr.func, ast.Name):
                if item.context_expr.func.id == 'open':
                    if len(item.context_expr.args) > 1:
                        mode = ast.literal_eval(item.context_expr.args[1])
                        if mode not in ['r', 'rb', 'w', 'wb', 'a', 'ab']:
                            self.errors.append(f"Security Warning: Insecure file mode '{mode}' detected at line {node.lineno}. Use safe modes like 'r', 'rb', 'w', 'wb', 'a', or 'ab'.")

    def check_for_input_usage(self, node):
        # Check for the use of input() which can lead to command injection
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id == 'input':
            self.errors.append(f"Security Warning: Use of 'input()' detected at line {node.lineno}. Be cautious of command injection vulnerabilities.")
