import unittest
from analyzer.code_complexity_checker import CodeComplexityChecker

class TestCodeComplexityChecker(unittest.TestCase):

    def test_check_cyclomatic_complexity(self):
        code = """
def sample():
    if x > 5:
        return True
    else:
        return False
"""
        checker = CodeComplexityChecker(code)
        result = checker.check_cyclomatic_complexity()
        self.assertIsInstance(result, list)
        self.assertGreater(len(result), 0)
        item = result[0]
        self.assertIn("function", item)
        self.assertIn("complexity", item)
        self.assertIn("line_number", item)

    def test_analyze(self):
        code = """
def sample(x):
    if x > 10:
        return True
    return False
"""
        checker = CodeComplexityChecker(code)
        result = checker.analyze()
        self.assertIsInstance(result, dict)
        self.assertIn("Cyclomatic Complexity", result)
        complexity_list = result["Cyclomatic Complexity"]
        self.assertIsInstance(complexity_list, list)
        self.assertTrue(any("complexity" in item for item in complexity_list))

    def test_check_cyclomatic_complexity_error_handling(self):
        bad_code = "def sample(10): return 10"
        checker = CodeComplexityChecker(bad_code)
        result = checker.check_cyclomatic_complexity()
        self.assertIsInstance(result, dict)
        self.assertIn("error", result)
        self.assertIn("Cyclomatic Complexity", result["error"])

if __name__ == "__main__":
    unittest.main()
