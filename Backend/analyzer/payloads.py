# payloads.py

class Payloads:
    def __init__(self):
        self.payloads = {
            'sql_injection': "' OR 1=1 --",
            'xss': "<script>alert('XSS')</script>"
        }

    def get_payload(self, attack_type):
        return self.payloads.get(attack_type, None)
