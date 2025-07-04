'use client';

import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

export default function CompanyProfile() {
  const [company, setCompany] = useState<any>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please login.");
      return;
    }

    axios
      .get("http://localhost:5000/company/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCompany(res.data.company);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading company:", err);
        alert("Access denied or invalid token.");
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e: any) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token. Please login again.");
        return;
      }

      const formData = new FormData();
      formData.append("name", company.name);
      formData.append("industry", company.industry);
      formData.append("description", company.description);
      if (logo) formData.append("logo", logo);

      await axios.put(`http://localhost:5000/company`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile.");
    }
  };

  if (loading || !company) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" mb={2}>Company Profile</Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Company Name"
        name="name"
        value={company.name}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Industry"
        name="industry"
        value={company.industry}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        multiline
        rows={4}
        value={company.description}
        onChange={handleInputChange}
      />

      <Box mt={2} display="flex" alignItems="center" gap={2}>
        <Avatar src={company.logo_url} sx={{ width: 64, height: 64 }} />
        <Button variant="contained" component="label">
          Upload Logo
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files?.[0] || null)}
          />
        </Button>
      </Box>

      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{ mt: 4 }}
        fullWidth
      >
        Save Profile
      </Button>
    </Box>
  );
}
