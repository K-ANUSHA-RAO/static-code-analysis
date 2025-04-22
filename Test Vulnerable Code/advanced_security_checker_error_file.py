def example_function():
    password = "mysecretpassword"  # Hardcoded password
    API_KEY = "12345"  # Hardcoded API key
    eval('print("Hello World")')  # Insecure function usage

def safe_function():
    username = "user"
    password = input("Enter password: ")
    print("Safe operation.")