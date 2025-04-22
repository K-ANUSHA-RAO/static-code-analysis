import os
import unittest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from fastapi import FastAPI, UploadFile, File
from run_analyzer import app  # Import your FastAPI app here

class TestUploadFile(unittest.TestCase):

    def setUp(self):
        """Set up the test environment."""
        # Create a TestClient for interacting with the FastAPI app
        self.client = TestClient(app)
        self.test_file_name = "test_file.txt"
        self.test_file_content = b"This is a test file."

    @patch('input_handler.input_handler.save_uploaded_file')
    @patch('analyzer.analyze.analyze_file')
    def test_upload_file(self, mock_analyze_file, mock_save_uploaded_file):
        """Test the file upload endpoint."""
        
        # Mock the behavior of save_uploaded_file to return a test file path
        mock_save_uploaded_file.return_value = "uploads/1234567890_test_file.txt"
        
        # Mock the behavior of analyze_file to return a dummy analysis result
        mock_analyze_file.return_value = {
            "syntax_error": [],
            "semantic_errors": [],
            "advanced_security_errors": [],
            "complexity_analysis": {"Cyclomatic Complexity": []},
            "security_errors": [],
            "dependency_errors": [],
            "execution_time": 0.1
        }
        
        # Create a file-like object for the mock file upload
        file = UploadFile(filename=self.test_file_name, file=MagicMock())
        file.file.read.return_value = self.test_file_content
        
        # Send a POST request to the file upload endpoint
        response = self.client.post("/upload/", files={"file": ("test_file.txt", self.test_file_content)})
        
        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)
        
        # Check if the correct response message is returned
        response_json = response.json()
        self.assertEqual(response_json["message"], "File uploaded successfully")
        self.assertEqual(response_json["file_path"], "uploads/1234567890_test_file.txt")
        self.assertIn("analysis_result", response_json)
        
        # Verify that the mock functions were called with the correct arguments
        mock_save_uploaded_file.assert_called_once()
        mock_analyze_file.assert_called_once()

    def tearDown(self):
        """Clean up any files or resources after tests."""
        # Clean up the uploads directory if needed
        if os.path.exists("uploads"):
            for filename in os.listdir("uploads"):
                file_path = os.path.join("uploads", filename)
                if os.path.isfile(file_path):
                    os.remove(file_path)

if __name__ == "__main__":
    unittest.main()
