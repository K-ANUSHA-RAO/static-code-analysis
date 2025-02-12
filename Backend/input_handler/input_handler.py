import os

def get_input_files(target):
    """Returns a list of Python files to be analyzed."""
    files = []
    if os.path.isfile(target):
        if target.endswith(".py"):
            files.append(target)
    elif os.path.isdir(target):
        for root, _, filenames in os.walk(target):
            for filename in filenames:
                if filename.endswith(".py"):
                    files.append(os.path.join(root, filename))
    return files
