# Sample Python code for testing semantic analysis

x = 10      # Used
y = 20      # Unused
z = 30      # Used

result = x + z
print("Result is:", result)

name = "Alice"  # Unused
def add(x,y):return x+y
def subtract(x, y):
  return x - y


def multiply(x,y):
    result = x*y
    return result
def divide(x, y): return x / y  # This line is too long, and should be split

print(add(1,2))
print(subtract(5,3))
print(multiply(4 ,2))
print(divide(10 ,2))
