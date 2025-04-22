import os
import subprocess
import pickle

api_key = "supersecret123"

def risky_function(user_input):
    query = "SELECT * FROM users WHERE username = '" + user_input + "'"
    cursor.execute(query)  # SQL injection risk
    print(user_input)  # XSS risk

with open("file.txt", "rw") as f:  # Insecure file mode
    f.write("data")

eval("print('unsafe')")  # Unsafe function call
subprocess.call(['ls', '-l'])  # Unsafe subprocess call
with open("data.pkl", "rb") as f:
    data = pickle.load(f)  # Unsafe pickle

undefined_variable = 10  # Semantic issue: Undefined variable