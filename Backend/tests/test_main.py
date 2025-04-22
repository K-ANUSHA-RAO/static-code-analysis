# tests/test_main.py
from analyzer.analyze import analyze_file
import tempfile

def test_analyze_file_with_safe_code():
    safe_code = "def foo():\n    return 42"
    with tempfile.NamedTemporaryFile("w", delete=False, suffix=".py") as temp:
        temp.write(safe_code)
        temp_path = temp.name

    result = analyze_file(temp_path)
    assert "syntax_error" in result
    assert isinstance(result["security_errors"], list)
