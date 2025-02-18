"""
Author: K Anusha Rao
Date: 18-02-2025
Description: This FastAPI application handles file uploads and integrates with a frontend running on port 3000.
It allows users to upload files, which are stored with a unique timestamp-based filename.
"""
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from input_handler.input_handler import save_uploaded_file

app = FastAPI()

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change to specific frontend domain in production
    allow_credentials=True,
    allow_methods=["*"], # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers for CORS requests
)

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    """
    Endpoint to handle file uploads.

    Args:
        file (UploadFile): The uploaded file from the client.

    Returns:
        dict: A message indicating success and the saved file path.
    """
    file_path = save_uploaded_file(file) # Save file with a unique name
    return {"message": "File uploaded successfully", "file_path": file_path}