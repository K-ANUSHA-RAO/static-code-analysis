def check(ast):
    """Performs semantic checks for type mismatches and logical errors."""
    errors = []
    # Example semantic check
    if "undefined_variable" in ast["ast"]:
        errors.append("Undefined variable detected.")
    return errors
