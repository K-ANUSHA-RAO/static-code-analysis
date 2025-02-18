def tokenize(file):
    """Tokenizes the input Python file."""
    with open(file, 'r') as f:
        content = f.read()
    return content.split()
