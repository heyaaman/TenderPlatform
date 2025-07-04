import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from "@mui/material";

export default function TendersPage() {
  const [tenders, setTenders] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedTender, setSelectedTender] = useState<any>(null);
  const [proposal, setProposal] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchTenders = async () => {
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:5000/tender", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTenders(res.data.tenders);
    } catch (err) {
      console.error("Error fetching tenders:", err);
      setMessage("Failed to load tenders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenders();
  }, [token]);

  const handleApply = async () => {
    if (!token || !selectedTender) {
      setMessage("Login required to apply.");
      return;
    }

    if (!proposal.trim()) {
      setMessage("Please enter your proposal before submitting.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/application/${selectedTender.id}`,
        { proposal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Proposal submitted successfully!");
      setProposal("");
      setOpen(false);
    } catch (err) {
      console.error("Apply error:", err);
      setMessage("Failed to submit proposal.");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Available Tenders
      </Typography>

      {message && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      {loading ? (
        <CircularProgress />
      ) : tenders.length === 0 ? (
        <Typography>No tenders available.</Typography>
      ) : (
        tenders.map((tender) => (
          <Card key={tender.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{tender.title}</Typography>
              <Typography>{tender.description}</Typography>
              <Typography>Budget: ₹{tender.budget}</Typography>
              <Typography>
                Deadline: {new Date(tender.deadline).toLocaleDateString()}
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 1 }}
                onClick={() => {
                  setSelectedTender(tender);
                  setOpen(true);
                }}
              >
                Apply
              </Button>
            </CardContent>
          </Card>
        ))
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Submit Proposal</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            fullWidth
            minRows={4}
            label="Your Proposal"
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleApply}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
