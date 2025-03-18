import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SecurityIcon from "@mui/icons-material/Security";
import BugReportIcon from "@mui/icons-material/BugReport";
import InsightsIcon from "@mui/icons-material/Insights";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Results = ({ analysisResult }) => {
  if (!analysisResult) {
    return (
      <Card elevation={3} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
        <CardContent>
          <Typography variant="h6" color="textSecondary" align="center">
            No Analysis Results Available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const {
    syntax_tree,
    semantic_errors,
    advanced_security_errors,
    complexity_analysis,
  } = analysisResult.analysis_result || {};

  return (
    <Card elevation={3} sx={{ p: 3, backgroundColor: "white" }}>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#003c56" }}
        >
          Analysis Results
        </Typography>

        {/* Syntax Errors */}
        {syntax_tree?.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                color: "red",
              }}
            >
              <ErrorOutlineIcon sx={{ mr: 1 }} /> Syntax Errors
            </Typography>
            {syntax_tree.map((error, index) => (
              <Alert key={index} severity="error" sx={{ mt: 1 }}>
                {error}
              </Alert>
            ))}
          </Box>
        )}

        {/* Semantic Errors */}
        {semantic_errors?.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                color: "#f57c00",
              }}
            >
              <BugReportIcon sx={{ mr: 1 }} /> Semantic Errors
            </Typography>
            <Paper elevation={2} sx={{ mt: 1, p: 2 }}>
              <List>
                {semantic_errors.map((error, index) => (
                  <ListItem key={index}>
                    <WarningAmberIcon sx={{ mr: 1, color: "#f57c00" }} />
                    <ListItemText primary={error} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        )}

        {/* Advanced Security Errors */}
        {advanced_security_errors?.length > 0 && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 2,
              bgcolor: "#FFF8E1",
              borderLeft: "4px solid orange",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                color: "orange",
              }}
            >
              <SecurityIcon sx={{ mr: 1 }} /> Advanced Security Errors
            </Typography>
            <List>
              {advanced_security_errors.map((error, index) => (
                <ListItem key={index}>
                  <WarningAmberIcon sx={{ mr: 1, color: "orange" }} />
                  <ListItemText primary={error} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Complexity Analysis */}
        {complexity_analysis &&
          Object.values(complexity_analysis).some((value) =>
            Object.values(value).some(
              (subValue) => Array.isArray(subValue) && subValue.length > 0
            )
          ) && (
            <Box sx={{ mt: 3 }}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <InsightsIcon sx={{ mr: 1, color: "blue" }} /> Complexity
                    Analysis
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {Object.entries(complexity_analysis).map(
                    ([key, value], index) => {
                      const subEntries = Object.entries(value).filter(
                        ([_, subValue]) =>
                          Array.isArray(subValue) && subValue.length > 0
                      );

                      if (subEntries.length === 0) return null;

                      return (
                        <Box key={index} sx={{ mt: 2 }}>
                          {index === 0 && ( // Ensure title is only rendered once
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: "bold",
                                textTransform: "capitalize",
                              }}
                            >
                              {key.replace(/_/g, " ")}
                            </Typography>
                          )}

                          <Paper elevation={1} sx={{ p: 2 }}>
                            <List>
                              {subEntries.map(
                                ([subKey, subValue], subIndex) => (
                                  <ListItem key={subIndex}>
                                    <ListItemText
                                      primary={`${subKey.replace(/_/g, " ")}:`}
                                      secondary={
                                        <pre
                                          style={{
                                            whiteSpace: "pre-wrap",
                                            wordBreak: "break-word",
                                            margin: 0,
                                          }}
                                        >
                                          {JSON.stringify(subValue, null, 2)}
                                        </pre>
                                      }
                                    />
                                  </ListItem>
                                )
                              )}
                            </List>
                          </Paper>
                        </Box>
                      );
                    }
                  )}
                </AccordionDetails>
              </Accordion>
            </Box>
          )}
      </CardContent>
    </Card>
  );
};

export default Results;
