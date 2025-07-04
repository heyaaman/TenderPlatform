import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Container,
  Box,
  CircularProgress,
  Alert,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

export default function DashboardPage() {
  const router = useRouter();
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    location: "",
    email: "",
    description: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchCompany = async () => {
      try {
        const res = await axios.get("http://localhost:5000/company", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ fixed token usage
          },
        });

        setCompany(res.data.company);
        setLoading(false);
      } catch (err: any) {
        // Company not created yet = not an error
        setCompany(null);
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Missing token. Please login again.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/company", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ fixed hardcoded token
        },
      });

      setCompany(res.data.company);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create company");
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box p={4} boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {company ? (
          <>
            <Typography variant="h6">Company Name: {company.name}</Typography>
            <Typography>Industry: {company.industry}</Typography>
            <Typography>Location: {company.location}</Typography>
            <Typography>Email: {company.email}</Typography>
            <Typography>Description: {company.description}</Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Create Your Company Profile
            </Typography>
            <form onSubmit={handleCreateCompany}>
              <TextField
                fullWidth
                label="Company Name"
                margin="normal"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <TextField
                fullWidth
                label="Industry"
                margin="normal"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              />
              <TextField
                fullWidth
                label="Location"
                margin="normal"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <TextField
                fullWidth
                label="Description"
                margin="normal"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Create Company
              </Button>
            </form>
          </>
        )}
      </Box>
    </Container>
  );
}
