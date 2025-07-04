import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import axios from "axios";

export default function CreateTenderPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/tender", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Tender created successfully!");
      setForm({ title: "", description: "", budget: "", deadline: "" });
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create tender.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Create Tender
      </Typography>

      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} mt={2}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          margin="normal"
          required
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          label="Budget (₹)"
          name="budget"
          type="number"
          value={form.budget}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Deadline"
          name="deadline"
          type="date"
          value={form.deadline}
          onChange={handleChange}
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}
