
import os
import subprocess
import pickle

class DummyCursor:
    def execute(self, query):
        pass

cursor = DummyCursor()

api_key = "supersecret123"

user_input = input("Enter your name: ")
print(user_input)  # should trigger XSS

query = "SELECT * FROM users WHERE username = '" + user_input + "'"
cursor.execute(query)  # should trigger SQLi

with open("file.txt", "rw") as f:
    f.write("data")