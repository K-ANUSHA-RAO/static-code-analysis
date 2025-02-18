import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const FileUploader = ({ onFileUpload }) => {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    if (onFileUpload) {
      onFileUpload(acceptedFiles);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.py,.txt',
    multiple: true,
  });

  const handleRemove = (fileToRemove) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  return (
    <Box sx={{ 
      p: 3, border: '2px dashed #1976d2', borderRadius: 2, textAlign: 'center',
      backgroundColor: '#f9f9f9', width: '100%', maxWidth: 500, mx: 'auto' 
    }}>
      <Box {...getRootProps()} sx={{ cursor: 'pointer', p: 2 }}>
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 50, color: '#1976d2' }} />
        <Typography variant="h6" sx={{ mt: 1 }}>Drag & Drop files here</Typography>
        <Typography variant="body2">or click to select files</Typography>
      </Box>

      {files.length > 0 && (
        <List sx={{ mt: 2 }}>
          {files.map((file, index) => (
            <ListItem key={index} secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(file)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={file.name} secondary={`${(file.size / 1024).toFixed(2)} KB`} />
            </ListItem>
          ))}
        </List>
      )}

      <Button variant="contained" sx={{ mt: 2 }} onClick={() => document.querySelector('input[type="file"]').click()}>
        Select Files
      </Button>
    </Box>
  );
};

export default FileUploader;
