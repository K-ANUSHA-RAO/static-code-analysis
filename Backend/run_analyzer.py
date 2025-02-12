import sys
from input_handler.input_handler import get_input_files
from analyzer import lexer, syntax_analyzer, semantic_checker, security_checker, quality_checker, dependency_checker
from database.db_operations import initialize_db
from report.report_generator import generate_pdf_report

def main():
    if len(sys.argv) < 2:
        print("Usage: python run_analyzer.py <file_or_directory>")
        sys.exit(1)

    initialize_db()
    target = sys.argv[1]
    files = get_input_files(target)
    results = []

    for file in files:
        print(f"\nAnalyzing {file}...")
        tokens = lexer.tokenize(file)
        ast = syntax_analyzer.parse(tokens)
        complexity_report = quality_checker.check_code_complexity(file)
        security_report = security_checker.scan_security(file)
        dependency_report = dependency_checker.check_dependencies()

        result = {
            "file": file,
            "complexity_report": complexity_report,
            "security_report": security_report,
            "dependency_report": dependency_report
        }
        results.append(result)

    generate_pdf_report(results)
    print("Analysis complete. Report generated.")

if __name__ == "__main__":
    main()
