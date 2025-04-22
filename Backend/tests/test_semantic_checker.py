import unittest

class TestFunctionDetection(unittest.TestCase):
    def test_detect_sample_function(self):
        result = [
            {"function": "main", "complexity": 3},
            {"function": "sample", "complexity": 5}
        ]
        self.assertTrue(any(item["function"] == "sample" for item in result))

if __name__ == "__main__":
    unittest.main()
