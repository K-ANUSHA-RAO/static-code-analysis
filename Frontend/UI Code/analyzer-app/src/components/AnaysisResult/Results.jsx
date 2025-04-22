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
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SecurityIcon from "@mui/icons-material/Security";
import BugReportIcon from "@mui/icons-material/BugReport";
import InsightsIcon from "@mui/icons-material/Insights";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import TimerIcon from "@mui/icons-material/Timer";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
    syntax_errors,
    semantic_errors,
    advanced_security_errors,
    complexity_analysis,
    security_errors,
    dependency_errors,
    execution_time,
  } = analysisResult.analysis_result || {};

  const exportToExcel = () => {
    const data = [
      { Type: "Syntax Errors", Details: syntax_errors?.join("\n") || "None" },
      {
        Type: "Semantic Errors",
        Details: semantic_errors?.join("\n") || "None",
      },
      {
        Type: "Advanced Security Errors",
        Details: advanced_security_errors?.join("\n") || "None",
      },
      {
        Type: "Security Errors",
        Details: security_errors?.join("\n") || "None",
      },
      {
        Type: "Dependency Errors",
        Details: dependency_errors?.join("\n") || "None",
      },
      {
        Type: "Execution Time",
        Details: `${execution_time}s` || "Not Available",
      },
    ];

    if (complexity_analysis) {
      for (const [key, value] of Object.entries(complexity_analysis)) {
        for (const [subKey, subVal] of Object.entries(value)) {
          if (Array.isArray(subVal) && subVal.length > 0) {
            data.push({
              Type: `${key} - ${subKey}`,
              Details: JSON.stringify(subVal, null, 2),
            });
          }
        }
      }
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Analysis Results");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, "analysis_results.xlsx");
  };

  const exportToMarkdown = () => {
    let md = `# Analysis Results\n\n`;

    const addMarkdownSection = (title, items) => {
      if (items?.length) {
        md += `## ${title}\n`;
        items.forEach((err) => (md += `- ${err}\n`));
        md += `\n`;
      }
    };

    addMarkdownSection("Syntax Errors", syntax_errors);
    addMarkdownSection("Semantic Errors", semantic_errors);
    addMarkdownSection("Advanced Security Errors", advanced_security_errors);
    addMarkdownSection("Security Errors", security_errors);
    addMarkdownSection("Dependency Errors", dependency_errors);

    if (complexity_analysis) {
      md += `## Complexity Analysis\n`;
      // Access the correct key name "Cyclomatic Complexity" (with the space)
      if (complexity_analysis["Cyclomatic Complexity"]) {
        md += `### Cyclomatic Complexity\n`;
        complexity_analysis["Cyclomatic Complexity"].forEach((item) => {
          md += `- Function: ${item.function} | Complexity: ${item.complexity} at line ${item.line_number}\n`;
        });
        md += `\n`;
      }
    }

    md += `## Execution Time\n- ${execution_time}s\n`;

    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    saveAs(blob, "analysis_results.md");
  };

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

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button variant="outlined" onClick={exportToExcel}>
            Export to Excel
          </Button>
          <Button variant="outlined" onClick={exportToMarkdown}>
            Export to Markdown
          </Button>
        </Box>
        {/* Syntax Errors */}
        {syntax_errors?.length > 0 && (
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
            {syntax_errors.map((error, index) => (
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
        {/*Security Errors */}
        {security_errors?.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#d32f2f",
                display: "flex",
                alignItems: "center",
              }}
            >
              <SecurityIcon sx={{ mr: 1 }} /> Security Errors
            </Typography>
            <Paper elevation={2} sx={{ mt: 1, p: 2 }}>
              <List>
                {security_errors.map((error, index) => (
                  <ListItem key={index}>
                    <WarningAmberIcon sx={{ mr: 1, color: "#d32f2f" }} />
                    <ListItemText primary={error} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        )}

        {/* Dependency Errors */}
        {dependency_errors?.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#6a1b9a",
                display: "flex",
                alignItems: "center",
              }}
            >
              <SecurityIcon sx={{ mr: 1 }} /> Dependency Errors
            </Typography>
            <Paper elevation={2} sx={{ mt: 1, p: 2 }}>
              <List>
                {dependency_errors.map((error, index) => (
                  <ListItem key={index}>
                    <WarningAmberIcon sx={{ mr: 1, color: "#6a1b9a" }} />
                    <ListItemText primary={error} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        )}

        {/* Cyclomatic Complexity */}
        {complexity_analysis?.["Cyclomatic Complexity"]?.length > 0 && (
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
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    Cyclomatic Complexity
                  </Typography>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <List>
                      {complexity_analysis["Cyclomatic Complexity"].map(
                        (item, index) => (
                          <ListItem key={index}>
                            <ListItemText
                              primary={`Function: ${item.function}`}
                              secondary={
                                <pre
                                  style={{
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                    margin: 0,
                                  }}
                                >
                                  Complexity: {item.complexity} at line{" "}
                                  {item.line_number}
                                </pre>
                              }
                            />
                          </ListItem>
                        )
                      )}
                    </List>
                  </Paper>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        )}

        {/* Execution Time */}
        {execution_time && (
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TimerIcon sx={{ mr: 1 }} /> Execution Time
            </Typography>
            <Paper elevation={2} sx={{ mt: 1, p: 2 }}>
              <Typography variant="body1">{execution_time}s</Typography>
            </Paper>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default Results;
