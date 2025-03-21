def greet(name)
    print(f"Hello, {name}") # Syntax Error: Missing colon

def add_numbers(a, b):
return a + b  # Syntax Error: Incorrect indentation

def main():
    name == input("Enter your name: ")  # Semantic Error: Should be '=' instead of '=='
    greet(name)
    
    num1 = int(input("Enter first number: "))  
    num2 == int(input("Enter second number: "))  # Semantic Error: Incorrect assignment operator
    result = add_numbers(num1 num2)  # Syntax Error: Missing comma
    
    print("The sum is: " result)  # Syntax Error: Missing comma
    
    open("file.txt", "w")  # Potential Semantic Error: Unsafe file handling without closing it

    data = [1, 2, 3]
    print(data[5])  # Semantic Error: IndexError, accessing out-of-bounds index

    x = 10
    if x = 5:  # Syntax Error: Assignment instead of comparison
        print("x is 5")

    for i in range(5)
        print(i)  # Syntax Error: Missing colon
    
    undefined_function()  # Semantic Error: Calling a function that is not defined

    with open("example.txt", "r") as file:
        content = file.read()
    print(file.read())  # Semantic Error: Using a closed file

if __name__ == "__main__":
    main()