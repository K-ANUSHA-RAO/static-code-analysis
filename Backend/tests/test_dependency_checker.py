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

        # Check that an outdated dependency is detected
        self.assertTrue(any("Outdated dependency detected" in msg for msg in result))

    def test_check_for_vulnerable_dependencies(self):
        # Sample code with a vulnerable dependency
        code = """
import vulnerable_package
def sample_function():
    pass
"""
        checker = DependencyChecker(code)
        result = checker.check()

        # Check that a vulnerable dependency is detected
        self.assertTrue(any("Vulnerable dependency detected" in msg for msg in result))

    def test_no_dependencies(self):
        # Sample code with no imports
        code = """
def sample_function():
    pass
"""
        checker = DependencyChecker(code)
        result = checker.check()

        # Expect no outdated or vulnerable dependency messages
        self.assertFalse(any("Outdated dependency detected" in msg or "Vulnerable dependency detected" in msg for msg in result))

    def test_multiple_issues(self):
        # Code with both outdated and vulnerable dependencies
        code = """
import some_old_package
import vulnerable_package
def sample_function():
    pass
"""
        checker = DependencyChecker(code)
        result = checker.check()

        # Ensure both types of issues are detected
        self.assertTrue(any("Outdated dependency detected" in msg for msg in result))
        self.assertTrue(any("Vulnerable dependency detected" in msg for msg in result))

if __name__ == "__main__":
    unittest.main()
