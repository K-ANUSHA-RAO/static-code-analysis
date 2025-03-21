import os
from analyzer.lexer import Lexer
from analyzer.syntax_analyzer import SyntaxAnalyzer
from analyzer.semantic_checker import SemanticChecker
from analyzer.advancedsecurity_checker import AdvancedSecurityChecker
from analyzer.code_complexity_checker import CodeComplexityChecker
from analyzer.security_checker import SecurityChecker
from analyzer.dependency_checker import DependencyChecker
from analyzer.quality_checker import QualityChecker

def analyze_file(file_path):
    """Runs all analysis functions on the uploaded file."""
    if not os.path.exists(file_path):
        return {"error": "File not found"}

    with open(file_path, 'r') as file:
        code = file.read()  # Read file content as a string
    
    # Syntax analysis
    syntax_analyzer = SyntaxAnalyzer(code)  # Pass the original code (as string)
    syntax_tree = syntax_analyzer.analyze()  # Generate the syntax tree from the code

    # Semantic Analysis
    semantic_checker = SemanticChecker(code)  # Pass the code to the semantic checker
    semantic_errors = semantic_checker.analyze()  # Get semantic errors or issues
    
    # Perform advanced security checks for vulnerabilities
    advanced_security_checker = AdvancedSecurityChecker(code)
    advanced_security_errors = advanced_security_checker.check()
    
    # Perform Code Complexity Analysis (Cyclomatic & Halstead)
    # complexity_checker = CodeComplexityChecker(code)
    # complexity_results = complexity_checker.analyze()
    
    # # # Tokenization & Parsing
    # lexer = Lexer(code)  # Pass the code to the lexer
    # tokens = lexer.tokenize()  # Tokenize the code (make sure this returns a string)
    
    # Perform general security checks
    security_checker = SecurityChecker(code)
    security_errors = security_checker.check()
    
    # Perform general security checks
    dependency_checker = DependencyChecker(code)
    dependency_errors = dependency_checker.check()

    # Perform code quality checks (PEP8, docstrings, etc.)
    # quality_checker = QualityChecker(code)
    # quality_errors = quality_checker.check()


    return {
        "syntax_tree": syntax_tree,
        "semantic_errors": semantic_errors,  # Errors found in semantic analysis
        "advanced_security_errors": advanced_security_errors,
        # "complexity_analysis": complexity_results,  # Added complexity analysis
        "security_errors": security_errors,
        "dependency_errors": dependency_errors,
        # "quality_errors": quality_errors,
    }
