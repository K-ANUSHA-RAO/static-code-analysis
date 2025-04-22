import os
import time
from analyzer.syntax_analyzer import SyntaxAnalyzer
from analyzer.semantic_checker import SemanticChecker
from analyzer.advancedsecurity_checker import AdvancedSecurityChecker
from analyzer.code_complexity_checker import CodeComplexityChecker
from analyzer.security_checker import SecurityChecker
from analyzer.dependency_checker import DependencyChecker

def analyze_file(file_path):
    """Runs all analysis functions on the uploaded file."""
    if not os.path.exists(file_path):
        return {"error": "File not found"}

    with open(file_path, 'r') as file:
        code = file.read()  # Read file content as a string
    
    start_time = time.time()
    
    # Syntax analysis
    syntax_analyzer = SyntaxAnalyzer(code)  # Pass the original code (as string)
    syntax_tree = syntax_analyzer.analyze()  # Generate the syntax tree from the code
    if syntax_tree:  # If there are syntax errors, stop further analysis
        return {"syntax_errors": syntax_tree}

    # Semantic Analysis
    semantic_checker = SemanticChecker(code)  # Pass the code to the semantic checker
    semantic_errors = semantic_checker.analyze()  # Get semantic errors or issues
    
    # Perform advanced security checks for vulnerabilities
    advanced_security_checker = AdvancedSecurityChecker(code)
    advanced_security_errors = advanced_security_checker.check()
    
    # Perform Code Complexity Analysis (Cyclomatic & Halstead)
    complexity_checker = CodeComplexityChecker(code)
    complexity_results = complexity_checker.analyze()
    
    # Perform general security checks
    security_checker = SecurityChecker(code)
    security_errors = security_checker.check()
    
    # Perform general security checks
    dependency_checker = DependencyChecker(code)
    dependency_errors = dependency_checker.check()
    
    # End time tracking
    end_time = time.time()
    execution_time = end_time - start_time  # Time taken for execution

    return {
        "syntax_error": syntax_tree,
        "semantic_errors": semantic_errors,  # Errors found in semantic analysis
        "advanced_security_errors": advanced_security_errors,
        "complexity_analysis": complexity_results,  # Added complexity analysis
        "security_errors": security_errors,
        "dependency_errors": dependency_errors,
        "execution_time": execution_time  # Include the time taken for execution
    }
