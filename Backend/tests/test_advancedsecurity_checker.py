import unittest
from analyzer import advancedsecurity_checker

class TestAdvancedSecurityChecker(unittest.TestCase):

    def test_hardcoded_secrets(self):
        code_with_secret = "password = 'secret123'  # hardcoded password"
        checker = advancedsecurity_checker.AdvancedSecurityChecker(code_with_secret)
        result = checker.check()
        self.assertIn("Potential hardcoded secrets found.", result)

    def test_insecure_function_eval(self):
        code_with_eval = "eval('2 + 2')"
        checker = advancedsecurity_checker.AdvancedSecurityChecker(code_with_eval)
        result = checker.check()
        self.assertIn("Usage of insecure function: eval", result)

    def test_insecure_function_exec(self):
        code_with_exec = "exec('print(\"Hello World\")')"
        checker = advancedsecurity_checker.AdvancedSecurityChecker(code_with_exec)
        result = checker.check()
        self.assertIn("Usage of insecure function: exec", result)

    def test_insecure_function_os_system(self):
        code_with_os_system = "os.system('ls')"
        checker = advancedsecurity_checker.AdvancedSecurityChecker(code_with_os_system)
        result = checker.check()
        self.assertIn("Usage of insecure function: os.system", result)

    def test_no_issues(self):
        safe_code = "print('Hello, World!')"
        checker = advancedsecurity_checker.AdvancedSecurityChecker(safe_code)
        result = checker.check()
        self.assertEqual(result, [])

if __name__ == "__main__":
    unittest.main()
