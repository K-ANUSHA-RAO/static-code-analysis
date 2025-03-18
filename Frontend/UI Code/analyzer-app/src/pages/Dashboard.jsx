import React, { useState } from "react";
import FileUploader from "../components/FileUploader/FileUploader";
import {
  Typography,
  Box,
  Paper,
} from "@mui/material";
import Results from "../components/AnaysisResult/Results";

const Dashboard = () => {
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileUpload = (files) => {
    console.log("Uploaded Files:", files);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#003c56" }}
      >
        Dashboard
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: "white" }}>
        <FileUploader
          onFileUpload={handleFileUpload}
          analysisResult={analysisResult}
          setAnalysisResult={setAnalysisResult}
        />
      </Paper>

      <Results
      analysisResult={analysisResult}
      />
    </Box>
  );
};

export default Dashboard;
