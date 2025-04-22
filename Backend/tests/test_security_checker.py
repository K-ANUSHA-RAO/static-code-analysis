# tests/test_security_checker.py

import unittest
from analyzer.security_checker import SecurityChecker

class TestSecurityChecker(unittest.TestCase):

    def test_security_checker_detects_eval(self):
        code = "eval('2+2')"
        checker = SecurityChecker(code)
        result = checker.check()
        self.assertTrue(any("eval" in warning.lower() for warning in result))

if __name__ == '__main__':
    unittest.main()
