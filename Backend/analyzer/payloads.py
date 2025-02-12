PAYLOADS = {
    "sql_injection": ["' OR '1'='1", "'; DROP TABLE users; --"],
    "xss": ["<script>alert('XSS')</script>", "<img src='x' onerror='alert(1)'>"]
}

def get_payloads(type):
    """Returns payloads for the given type (e.g., sql_injection, xss)."""
    return PAYLOADS.get(type, [])
