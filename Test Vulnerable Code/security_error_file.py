API_KEY = "12345"  # Hardcoded secret
password = "mypassword"  # Hardcoded password

import os
os.system('rm -rf /')  # Dangerous command execution

eval("print('This is insecure')")  # Insecure eval usage
exec("print('Exec is risky')")  # Insecure exec usage

# Unused variable
unused_variable = 42

# Type Mismatch
a = 5 + "hello"  # This will raise a TypeError