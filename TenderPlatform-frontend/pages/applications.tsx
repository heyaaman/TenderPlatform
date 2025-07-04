import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container, Typography, Card, CardContent, Select, MenuItem, InputLabel, FormControl
} from "@mui/material";

export default function ApplicationsPage() {
  const [tenders, setTenders] = useState<any[]>([]);
  const [selectedTender, setSelectedTender] = useState("");
  const [applications, setApplications] = useState<any[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;
    axios.get("http://localhost:5000/tender/mine", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setTenders(res.data.tenders));
  }, [token]);

  useEffect(() => {
    if (!selectedTender || !token) return;
    axios.get(`http://localhost:5000/application/tender/${selectedTender}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setApplications(res.data.applications));
  }, [selectedTender]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Applications Received</Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Tender</InputLabel>
        <Select
          value={selectedTender}
          label="Select Tender"
          onChange={(e) => setSelectedTender(e.target.value)}
        >
          {tenders.map(t => (
            <MenuItem key={t.id} value={t.id}>{t.title}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {applications.map(app => (
        <Card key={app.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1">Proposal:</Typography>
            <Typography>{app.proposal}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
