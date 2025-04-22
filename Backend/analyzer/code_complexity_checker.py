from radon.complexity import cc_visit
from radon.metrics import h_visit
from radon.visitors import ComplexityVisitor


class CodeComplexityChecker:
    def __init__(self, code):
        self.code = code

    def check_cyclomatic_complexity(self):
        """ Analyze the Cyclomatic Complexity (CC) of the given code. """
        try:
            complexity_results = cc_visit(self.code)  # Get CC metrics
            results = []

            for item in complexity_results:
                results.append({
                    "function": item.name,
                    "complexity": item.complexity,
                    "line_number": item.lineno
                })

            return results
        except Exception as e:
            return {"error": f"Error analyzing Cyclomatic Complexity: {str(e)}"}


    def analyze(self):
        """ Perform all complexity checks and return results. """
        return {
            "Cyclomatic Complexity": self.check_cyclomatic_complexity()
        }

