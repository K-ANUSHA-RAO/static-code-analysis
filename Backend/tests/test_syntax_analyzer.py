# tests/test_syntax_analyzer.py

import unittest
from analyzer.syntax_analyzer import SyntaxAnalyzer

class TestSyntaxAnalyzer(unittest.TestCase):

    def test_valid_python_code(self):
        code = "x = 5\ny = x + 2"
        analyzer = SyntaxAnalyzer(code)
        result = analyzer.analyze()
        self.assertIsNotNone(result)

if __name__ == '__main__':
    unittest.main()
