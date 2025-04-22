import unittest
from analyzer.dependency_checker import DependencyChecker

class TestDependencyChecker(unittest.TestCase):

    def test_check_for_outdated_dependencies(self):
        # Sample code with an outdated dependency
        code = """
import some_old_package
def sample_function():
    pass
"""
        checker = DependencyChecker(code)
        result = checker.check()
        
        # Check that the outdated dependency error is detected
        self.assertIn("Outdated dependency detected: some_old_package.", result)

    def test_check_for_vulnerable_dependencies(self):
        # Sample code with a vulnerable dependency
        code = """
import vulnerable_package
def sample_function():
    pass
"""
        checker = DependencyChecker(code)
        result = checker.check()
        
        # Check that the vulnerable dependency error is detected
        self.assertIn("Vulnerable dependency detected.", result)

    def test_no_dependencies(self):
        # Sample code with no dependencies
        code = """
def sample_function():
    pass
"""
        checker = DependencyChecker(code)
        result = checker.check()
        
        # Ensure no errors are detected
        self.assertEqual(result, [])

    def test_multiple_issues(self):
        # Sample code with both outdated and vulnerable dependencies
        code = """
import some_old_package
import vulnerable_package
def sample_function():
    pass
"""
        checker = DependencyChecker(code)
        result = checker.check()
        
        # Check for both outdated and vulnerable dependency errors
        self.assertIn("Outdated dependency detected: some_old_package.", result)
        self.assertIn("Vulnerable dependency detected.", result)

if __name__ == "__main__":
    unittest.main()
