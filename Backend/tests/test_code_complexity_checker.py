import unittest
from analyzer.code_complexity_checker import CodeComplexityChecker

class TestCodeComplexityChecker(unittest.TestCase):

    def test_check_cyclomatic_complexity(self):
        # Sample code with simple branching to check cyclomatic complexity
        code = """
def sample():
    if x > 5:
        return True
    else:
        return False
"""
        checker = CodeComplexityChecker(code)
        result = checker.check_cyclomatic_complexity()
        
        # Check that the result contains the expected 'Cyclomatic Complexity' key
        self.assertIn("Cyclomatic Complexity", result)
        
        # Check that the Cyclomatic Complexity is a list
        self.assertTrue(isinstance(result["Cyclomatic Complexity"], list))
        
        # Ensure that the list is not empty
        self.assertGreater(len(result["Cyclomatic Complexity"]), 0)
        
        # Check that the list contains the expected function-related details
        self.assertIn("function", result["Cyclomatic Complexity"][0])
        self.assertIn("complexity", result["Cyclomatic Complexity"][0])
        self.assertIn("line_number", result["Cyclomatic Complexity"][0])

    def test_analyze(self):
        # Sample code for overall analysis
        code = """
def sample(x):
    if x > 10:
        return True
    return False
"""
        checker = CodeComplexityChecker(code)
        result = checker.analyze()

        # Check that the analyze method returns the expected results
        self.assertIn("Cyclomatic Complexity", result)
        self.assertTrue(isinstance(result["Cyclomatic Complexity"], dict))

    def test_check_cyclomatic_complexity_error_handling(self):
        # Malformed code for error handling
        bad_code = "def sample(10): return 10"
        checker = CodeComplexityChecker(bad_code)
        result = checker.check_cyclomatic_complexity()
        
        # Check that the result contains an error key when something goes wrong
        self.assertIn("error", result)
        self.assertTrue("Error" in result["error"])

if __name__ == "__main__":
    unittest.main()
