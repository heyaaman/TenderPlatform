import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Alert,
} from "@mui/material";

export default function MyTendersPage() {
  const [tenders, setTenders] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", budget: "", deadline: "" });
  const [message, setMessage] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchMyTenders = async () => {
    try {
      if (!token) return;

      const res = await axios.get("http://localhost:5000/tender/mine", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Use dynamic token
        },
      });
      setTenders(res.data.tenders);
    } catch (err) {
      console.error("Error loading tenders", err);
    }
  };

  useEffect(() => {
    fetchMyTenders();
  }, [token]);

  const handleCreateTender = async () => {
    try {
      if (!token) {
        setMessage("You must be logged in to post a tender.");
        return;
      }

      await axios.post("http://localhost:5000/tender", form, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ No hardcoding
        },
      });

      setMessage("Tender posted!");
      setForm({ title: "", description: "", budget: "", deadline: "" });
      setOpen(false);
      fetchMyTenders(); // refresh list
    } catch (err) {
      console.error(err);
      setMessage("Error posting tender.");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        My Tenders
      </Typography>

      {message && <Alert severity="info" sx={{ mb: 2 }}>{message}</Alert>}

      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpen(true)}>
        Post New Tender
      </Button>

      {tenders.map((tender) => (
        <Card key={tender.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{tender.title}</Typography>
            <Typography>{tender.description}</Typography>
            <Typography>Budget: ₹{tender.budget}</Typography>
            <Typography>Deadline: {new Date(tender.deadline).toLocaleDateString()}</Typography>
          </CardContent>
        </Card>
      ))}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Post Tender</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            margin="dense"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            fullWidth
            label="Description"
            margin="dense"
            multiline
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <TextField
            fullWidth
            label="Budget"
            type="number"
            margin="dense"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
          />
          <TextField
            fullWidth
            label="Deadline"
            type="date"
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateTender} variant="contained">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
