import os
import unittest
from unittest.mock import MagicMock
from fastapi import UploadFile
from io import BytesIO
from input_handler.input_handler import save_uploaded_file
import time

# Assuming the save_uploaded_file function is imported from your module
# from your_module import save_uploaded_file, UPLOAD_DIR

class TestSaveUploadedFile(unittest.TestCase):
    
    def setUp(self):
        """Set up the test environment."""
        self.test_file_name = "test_file.txt"
        self.test_file_content = b"This is a test file."
        
        # Mock an UploadFile object
        self.mock_upload_file = MagicMock(spec=UploadFile)
        self.mock_upload_file.filename = self.test_file_name
        self.mock_upload_file.file = BytesIO(self.test_file_content)
    
    def test_save_uploaded_file(self):
        """Test that the file is saved correctly with a unique filename."""
    
        # Call the save_uploaded_file function
        result = save_uploaded_file(self.mock_upload_file)

        #Check that the result is in the "uploads" directory
        self.assertTrue(result.startswith("uploads"))
    
        #Check that the file ends with the correct original filename
        self.assertTrue(result.endswith(f"_{self.test_file_name}"))
    
        #Check file content
        with open(result, "rb") as f:
            content = f.read()
            self.assertEqual(content, self.test_file_content)

        #Clean up test file
        if os.path.exists(result):
            os.remove(result)


if __name__ == "__main__":
    unittest.main()
