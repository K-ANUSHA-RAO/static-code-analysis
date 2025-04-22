import unittest
from analyzer.semantic_checker import SemanticChecker

class TestSemanticChecker(unittest.TestCase):

    def test_check_unused_variables(self):
        # Sample code with an unused variable
        code = """
x = 5
y = 10
z = 15
print(x)
"""
        checker = SemanticChecker(code)
        result = checker.analyze()

        # Check if the unused variable 'y' is detected
        self.assertIn("Unused variable: y", result)
        self.assertIn("Unused variable: z", result)

    def test_no_unused_variables(self):
        # Sample code with no unused variables
        code = """
x = 5
y = 10
print(x)
print(y)
"""
        checker = SemanticChecker(code)
        result = checker.analyze()

        # Ensure no errors are detected
        self.assertEqual(result, [])

    def test_syntax_error_in_code(self):
        # Code with a syntax error (missing closing parenthesis)
        code = """
x = 5
y = 10
print(x
"""
        checker = SemanticChecker(code)
        result = checker.analyze()

        # Ensure syntax error is detected
        self.assertIn("Syntax Error:", result[0])  # Syntax error message should appear

    def test_empty_code(self):
        # Empty code (no statements)
        code = ""
        checker = SemanticChecker(code)
        result = checker.analyze()

        # Ensure no errors are detected
        self.assertEqual(result, [])

    def test_multiple_unused_variables(self):
        # Sample code with multiple unused variables
        code = """
a = 1
b = 2
c = 3
print(a)
"""
        checker = SemanticChecker(code)
        result = checker.analyze()

        # Check that multiple unused variables are detected
        self.assertIn("Unused variable: b", result)
        self.assertIn("Unused variable: c", result)

if __name__ == "__main__":
    unittest.main()
