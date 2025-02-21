import React, { useState } from "react";
import FileUploader from "../components/FileUploader/FileUploader";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
} from "@mui/material";

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

      {analysisResult && (
        <Card elevation={3} sx={{ p: 3, backgroundColor: "white" }}>
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#003c56" }}
            >
              Analysis Results
            </Typography>

            {/* Syntax Tree */}
            {analysisResult.analysis_result.syntax_tree.length > 0 && (
              <>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                  Syntax Tree
                </Typography>
                <List>
                  {analysisResult.analysis_result.syntax_tree.map(
                    (error, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={`• ${error}`} />
                      </ListItem>
                    )
                  )}
                </List>
              </>
            )}

            {/* Semantic Errors */}
            {analysisResult.analysis_result.semantic_errors.length > 0 && (
              <>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                  Semantic Errors
                </Typography>
                <List>
                  {analysisResult.analysis_result.semantic_errors.map(
                    (error, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={`• ${error}`} />
                      </ListItem>
                    )
                  )}
                </List>
              </>
            )}

            {/* Advanced Security Errors */}
            {analysisResult.analysis_result.advanced_security_errors.length >
              0 && (
              <>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                  Advanced Security Errors
                </Typography>
                <List>
                  {analysisResult.analysis_result.advanced_security_errors.map(
                    (error, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={`• ${error}`} />
                      </ListItem>
                    )
                  )}
                </List>
              </>
            )}

            {/* Complexity Analysis (Ensure It Appears Only Once) */}
            {analysisResult.analysis_result.complexity_analysis &&
              Object.values(analysisResult.analysis_result.complexity_analysis).some(
                (value) => Object.values(value).some((subValue) => Array.isArray(subValue) && subValue.length > 0)
              ) && (
                <>
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                    Complexity Analysis
                  </Typography>
                  {Object.entries(
                    analysisResult.analysis_result.complexity_analysis
                  ).map(([key, value], index) => {
                    const subEntries = Object.entries(value).filter(
                      ([_, subValue]) =>
                        Array.isArray(subValue) && subValue.length > 0
                    );

                    return subEntries.length > 0 ? (
                      <div key={index} style={{ marginBottom: "10px" }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", textTransform: "capitalize" }}
                        >
                          {key.replace(/_/g, " ")}
                        </Typography>
                        <List>
                          {subEntries.map(([subKey, subValue], subIndex) => (
                            <ListItem key={subIndex}>
                              <ListItemText
                                primary={`${subKey.replace(/_/g, " ")}:`}
                                secondary={JSON.stringify(subValue)}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </div>
                    ) : null;
                  })}
                </>
              )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Dashboard;
