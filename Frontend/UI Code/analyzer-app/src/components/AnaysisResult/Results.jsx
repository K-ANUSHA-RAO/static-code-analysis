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
    syntax_tree,
    semantic_errors,
    advanced_security_errors,
    complexity_analysis,
  } = analysisResult.analysis_result || {};

  const exportToExcel = () => {
    const data = [
      { Type: "Syntax Errors", Details: syntax_tree?.join("\n") || "None" },
      {
        Type: "Semantic Errors",
        Details: semantic_errors?.join("\n") || "None",
      },
      {
        Type: "Advanced Security Errors",
        Details: advanced_security_errors?.join("\n") || "None",
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

    if (syntax_tree?.length) {
      md += `## Syntax Errors\n`;
      syntax_tree.forEach((err) => (md += `- ${err}\n`));
      md += `\n`;
    }

    if (semantic_errors?.length) {
      md += `## Semantic Errors\n`;
      semantic_errors.forEach((err) => (md += `- ${err}\n`));
      md += `\n`;
    }

    if (advanced_security_errors?.length) {
      md += `## Advanced Security Errors\n`;
      advanced_security_errors.forEach((err) => (md += `- ${err}\n`));
      md += `\n`;
    }

    if (complexity_analysis) {
      md += `## Complexity Analysis\n`;
      for (const [key, value] of Object.entries(complexity_analysis)) {
        md += `### ${key}\n`;
        for (const [subKey, subVal] of Object.entries(value)) {
          if (Array.isArray(subVal) && subVal.length > 0) {
            md += `#### ${subKey}\n\`\`\`json\n${JSON.stringify(
              subVal,
              null,
              2
            )}\n\`\`\`\n`;
          }
        }
      }
    }

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
