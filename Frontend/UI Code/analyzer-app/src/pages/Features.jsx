import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Features = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#003c56" }}
      >
        Features
      </Typography>
      <Typography variant="body1" gutterBottom>
        Our static code analyzer helps identify code issues, potential bugs, and
        vulnerabilities early in the development process.
      </Typography>
      <Box mt={2}>
        <Typography variant="body1" paragraph>
          ✔️ Detects common security vulnerabilities
        </Typography>
        <Typography variant="body1" paragraph>
          🧠 Highlights poor coding practices and logical errors
        </Typography>
        <Typography variant="body1" paragraph>
          ⚙️ Supports Python programming language
        </Typography>
        <Typography variant="body1" paragraph>
          📈 Generates detailed and exportable analysis reports
        </Typography>
      </Box>
    </Container>
  );
};

export default Features;
