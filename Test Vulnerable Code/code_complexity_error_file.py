def sample_function_1(x):
    if x > 10:
        return x + 10
    else:
        return x - 10

def sample_function_2(x):
    if x > 10:
        if x > 20:
            return x + 100
        else:
            return x + 50
    else:
        return x - 20

def sample_function_3(x, y):
    total = 0
    for i in range(x):
        total += i
    for j in range(y):
        total += j
    return total
