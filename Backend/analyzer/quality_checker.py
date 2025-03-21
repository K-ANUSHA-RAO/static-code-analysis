# quality_checker.py

import pycodestyle

class QualityChecker:
    def __init__(self, code):
        self.code = code
        self.errors = []

    def check(self):
        """ Perform code quality checks. """
        self.check_pep8_compliance()
        return self.errors

    def check_pep8_compliance(self):
        """ Check for PEP8 compliance. """
        style_guide = pycodestyle.StyleGuide()
        report = style_guide.check_files(['-'])

        if report.total_errors > 0:
            self.errors.append(f"PEP8 issues found: {report.total_errors} errors.")
