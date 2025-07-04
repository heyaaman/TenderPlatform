import { useState } from "react";
import axios from "axios";
import {
  Container, TextField, Button, Box, Typography, Card, CardContent
} from "@mui/material";

export default function CompanySearchPage() {
  const [query, setQuery] = useState({ name: "", industry: "" });
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    const res = await axios.get("http://localhost:5000/company/search", {
      params: {
        name: query.name,
        industry: query.industry,
      },
    });
    setResults(res.data.results);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Search Companies</Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Name"
          value={query.name}
          onChange={(e) => setQuery({ ...query, name: e.target.value })}
        />
        <TextField
          label="Industry"
          value={query.industry}
          onChange={(e) => setQuery({ ...query, industry: e.target.value })}
        />
        <Button variant="contained" onClick={handleSearch}>Search</Button>
      </Box>

      {results.map((company) => (
        <Card key={company.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{company.name}</Typography>
            <Typography>Industry: {company.industry}</Typography>
            <Typography>{company.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
