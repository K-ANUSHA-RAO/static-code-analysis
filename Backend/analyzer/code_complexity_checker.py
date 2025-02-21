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

            return {"Cyclomatic Complexity": results}
        except Exception as e:
            return {"error": f"Error analyzing Cyclomatic Complexity: {str(e)}"}

    def check_halstead_metrics(self):
        """ Analyze the Halstead complexity metrics of the given code. """
        try:
            metrics = h_visit(self.code)  # Get Halstead metrics dictionary
            return {"Halstead Metrics": metrics}  # Return raw dictionary
        except Exception as e:
            return {"error": f"Error analyzing Halstead Metrics: {str(e)}"}

    def check_complexity_visitor(self):
        """ Extract function/method-level complexity using ComplexityVisitor. """
        try:
            visitor = ComplexityVisitor.from_code(self.code)  # Get complexity details
            functions = []

            for block in visitor.functions:
                functions.append({
                    "function": block.name,
                    "complexity": block.complexity,
                    "line_number": block.lineno
                })

            return {"Function Complexity": functions}
        except Exception as e:
            return {"error": f"Error analyzing Function Complexity: {str(e)}"}

    def analyze(self):
        """ Perform all complexity checks and return results. """
        return {
            "Cyclomatic Complexity": self.check_cyclomatic_complexity(),
            "Halstead Metrics": self.check_halstead_metrics(),
            "Function Complexity": self.check_complexity_visitor()
        }

