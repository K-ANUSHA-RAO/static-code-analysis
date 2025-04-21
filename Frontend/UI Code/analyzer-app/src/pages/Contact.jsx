import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import AlertSnackbar from "../components/AlertSnackbar/AlertSnackbar";

const Contact = () => {
  const [open, setOpen] = useState(false);

  // Form field states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true); // Show snackbar

    // 🔄 Clear form fields
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* Snackbar Alert */}
      <AlertSnackbar
        open={open}
        onClose={() => setOpen(false)}
        message="Message sent successfully!"
        severity="success"
      />

      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" gutterBottom>
        Have a question or need support? Reach out to us.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          data-testid="name-input"
          fullWidth
          label="Name"
          margin="normal"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          data-testid="email-input"
          fullWidth
          label="Email"
          margin="normal"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          data-testid="message-input"
          fullWidth
          label="Message"
          multiline
          rows={4}
          margin="normal"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Send Message
        </Button>
      </Box>
    </Container>
  );
};

export default Contact;
