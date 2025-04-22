import ast

class SecurityChecker:
    def __init__(self, code):
        self.code = code
        self.errors = []

    def check(self):
        try:
            tree = ast.parse(self.code)
            self.visit(tree)
        except SyntaxError as e:
            self.errors.append(f"Syntax Error at line {e.lineno}: {e.msg} ")
        return self.errors

    def visit(self, node):
        for child in ast.iter_child_nodes(node):
            self.visit(child)

        if isinstance(node, ast.Call):
            self.check_for_insecure_calls(node)
            self.check_for_sql_injection(node)
            self.check_for_xss(node)

        if isinstance(node, ast.Assign):
            self.check_for_hardcoded_secrets(node)

        if isinstance(node, ast.Import):
            self.check_for_insecure_imports(node)

        if isinstance(node, ast.With):
            self.check_for_insecure_file_handling(node)

    def check_for_insecure_calls(self, node):
        insecure_functions = ['eval', 'exec', 'os.system', 'subprocess.call']
        if isinstance(node.func, ast.Name) and node.func.id in insecure_functions:
            self.errors.append(f"Security Warning at line {node.lineno}: Use of '{node.func.id}'.")
        if isinstance(node.func, ast.Attribute) and node.func.attr == 'exec':
            self.errors.append(f"Security Warning at line {node.lineno}: Use of 'exec()'.")

    def check_for_hardcoded_secrets(self, node):
        for target in node.targets:
            if isinstance(target, ast.Name) and any(x in target.id.lower() for x in ['key', 'secret', 'password', 'token']):
                if isinstance(node.value, ast.Str):
                    self.errors.append(f"Security Warning at line {node.lineno}: Hardcoded secret '{target.id}'.")

    def check_for_insecure_imports(self, node):
        insecure_modules = ['pickle', 'subprocess', 'os']
        for alias in node.names:
            if alias.name in insecure_modules:
                self.errors.append(f"Security Warning at line {node.lineno}: Insecure import '{alias.name}'.")

    def check_for_insecure_file_handling(self, node):
        for item in node.items:
            if isinstance(item.context_expr, ast.Call) and isinstance(item.context_expr.func, ast.Name):
                if item.context_expr.func.id == 'open':
                    if len(item.context_expr.args) > 1:
                        try:
                            mode = ast.literal_eval(item.context_expr.args[1])
                            if mode not in ['r', 'rb', 'w', 'wb', 'a', 'ab']:
                                self.errors.append(f"Security Warning at line {node.lineno}: Insecure file mode '{mode}'.")
                        except:
                            pass

    def check_for_xss(self, node):
        # print(input), return input in HTML, etc.
        if isinstance(node.func, ast.Name) and node.func.id == 'print':
            for arg in node.args:
                if isinstance(arg, ast.Name) and 'input' in arg.id.lower():
                    self.errors.append(f"XSS Warning at line {node.lineno}: Potential XSS via unsanitized input.")

        if isinstance(node.func, ast.Attribute) and node.func.attr in ['write', 'render_template']:
            for arg in node.args:
                if isinstance(arg, ast.JoinedStr) or isinstance(arg, ast.BinOp):
                    self.errors.append(f"XSS Warning at line {node.lineno}: Unescaped user input in HTML response.")

    def check_for_sql_injection(self, node):
        if isinstance(node.func, ast.Attribute) and node.func.attr == 'execute':
            if node.args:
                arg = node.args[0]
                # Check for binary operations or joined strings
                if isinstance(arg, ast.BinOp) or isinstance(arg, ast.JoinedStr):
                    self.errors.append(f"SQL Injection Warning at line {node.lineno}: Possible unsafe SQL construction. Use parameterized queries.")
