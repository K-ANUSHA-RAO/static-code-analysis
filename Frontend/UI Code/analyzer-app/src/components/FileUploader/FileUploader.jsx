/**
 * FileUploader Component
 *
 * Author: K Anusha Rao
 * Description: This component allows users to upload files by dragging and dropping or selecting files.
 * It displays a list of selected files with their sizes and offers an option to remove them before uploading.
 * It supports multiple file uploads and validates the file types to accept only `.py` and `.txt` files.
 *
 * Features:
 * - Drag & drop functionality using react-dropzone
 * - Displays selected file list with size
 * - Option to remove files from the list
 * - Upload button to trigger file upload action
 */
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertSnackbar from "../AlertSnackbar/AlertSnackbar";

const FileUploader = ({ onFileUpload, analysisResult, setAnalysisResult }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    if (onFileUpload) {
      onFileUpload(acceptedFiles);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".py",
    multiple: true,
  });

  const handleRemove = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
    setAnalysisResult(null);
  };

  const handleFileUpload = async () => {
    if (files.length === 0) {
      showSnackbar("Please select files before uploading.", "warning");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
        mode: "cors",
      });

      const result = await response.json();
      setAnalysisResult(result);

      if (response.ok) {
        showSnackbar(
          `Files uploaded successfully: ${result.file_path}`,
          "success"
        );
      } else {
        showSnackbar(`Error: ${result.message}`, "error");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      showSnackbar("Failed to upload files.", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelectButton = () => {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = ""; // Reset input to allow re-selection
      fileInput.click();
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        border: "2px dashed #1976d2",
        borderRadius: 2,
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        width: "100%",
        maxWidth: 500,
        mx: "auto",
      }}
    >
      <Box {...getRootProps()} sx={{ cursor: "pointer", p: 2 }}>
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 50, color: "#1976d2" }} />
        <Typography variant="h6" sx={{ mt: 1 }}>
          Drag & Drop files here
        </Typography>
        <Typography variant="body2">or click to select files</Typography>
      </Box>

      {files.length > 0 && (
        <List sx={{ mt: 2 }}>
          {files.map((file, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemove(file)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={file.name}
                secondary={`${(file.size / 1024).toFixed(2)} KB`}
              />
            </ListItem>
          ))}
        </List>
      )}

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          onClick={handleFileUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Files"}
        </Button>

        <Button
          variant="contained"
          sx={{ mr: 2 }}
          onClick={handleFileSelectButton}
        >
          Select Files
        </Button>
      </Box>

      <AlertSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default FileUploader;
