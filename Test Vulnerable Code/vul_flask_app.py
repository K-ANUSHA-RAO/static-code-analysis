from flask import Flask, request, render_template_string, redirect
import sqlite3

app = Flask(__name__)

# Initialize database
def init_db():
    conn = sqlite3.connect("vuln_db.db")
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)")
    cursor.execute("INSERT INTO users (username, password) VALUES ('admin', 'admin123'), ('test', 'test123')")
    conn.commit()
    conn.close()

init_db()

# 🚨 Vulnerable SQL Injection Endpoint
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        conn = sqlite3.connect("vuln_db.db")
        cursor = conn.cursor()

        # ❌ SQL Injection Vulnerability: User input is directly concatenated into the query
        query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
        cursor.execute(query)
        user = cursor.fetchone()
        conn.close()

        if user:
            return f"Welcome, {user[1]}!"
        else:
            return "Invalid credentials"

    return '''
        <form method="post">
            Username: <input type="text" name="username"><br>
            Password: <input type="password" name="password"><br>
            <input type="submit" value="Login">
        </form>
    '''

# 🚨 Vulnerable XSS Endpoint
@app.route('/profile')
def profile():
    username = request.args.get('name', 'Guest')

    # ❌ XSS Vulnerability: User input is directly inserted into HTML without sanitization
    return render_template_string(f"<h1>Welcome, {username}</h1>")

# 🚨 Vulnerable IDOR Endpoint
@app.route('/view_user')
def view_user():
    user_id = request.args.get('id', '1')

    conn = sqlite3.connect("vuln_db.db")
    cursor = conn.cursor()

    # ❌ IDOR Vulnerability: No authentication check for user access
    cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")
    user = cursor.fetchone()
    conn.close()

    if user:
        return f"User: {user[1]}, Password: {user[2]}"
    else:
        return "User not found"

if __name__ == '__main__':
    app.run(debug=True)
