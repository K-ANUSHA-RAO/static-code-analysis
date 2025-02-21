import tokenize
from io import BytesIO

class Lexer:
    def __init__(self, code):
        self.code = code

    def tokenize(self):
        """ Tokenize the Python source code. """
        tokens = []

        # Ensure the code is encoded into bytes (UTF-8)
        byte_code = self.code.encode('utf-8')

        # Use BytesIO to handle byte stream
        byte_stream = BytesIO(byte_code)
        
        # Define readline to return a single line of text (string)
        def readline():
            line = byte_stream.readline()  # Read a line from the byte stream
            return line.decode('utf-8')  # Decode bytes to string

        try:
            # Tokenize using the tokenize module
            for token in tokenize.generate_tokens(readline):
                tokens.append(token)
        except tokenize.TokenError as e:
            print(f"Tokenization error: {e}")

        return tokens
