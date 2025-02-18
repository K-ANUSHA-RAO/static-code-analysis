import os
import time
from fastapi import UploadFile

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_uploaded_file(file: UploadFile) -> str:
    """
    Save the uploaded file with a unique filename to avoid overwriting existing files.

    Author: K Anusha Rao
    Description: This function takes an uploaded file, generates a unique filename by 
                 appending the current timestamp to the original filename, and stores it 
                 in the specified directory. The function returns the file path of the 
                 saved file.

    Args:
    - file (UploadFile): The uploaded file to be saved.

    Returns:
    - str: The file path where the file was saved.
    """
    
    # Generate a unique filename by appending timestamp to the original filename
    timestamp = int(time.time() * 1000)  # Milliseconds timestamp
    file_name = f"{timestamp}_{file.filename}" # Combining timestamp and original filename
    file_path = os.path.join(UPLOAD_DIR, file_name)

    # Write the file content to the specified file path
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read()) # Save the file

    return file_path
