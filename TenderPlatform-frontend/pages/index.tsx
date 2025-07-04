import React from "react";
import Link from "next/link";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const pages = [
  { title: "Dashboard", href: "/dashboard", icon: <DashboardIcon fontSize="large" color="primary" /> },
  { title: "My Tenders", href: "/my-tenders", icon: <WorkIcon fontSize="large" color="primary" /> },
  { title: "Create Tender", href: "/create-tender", icon: <AddBoxIcon fontSize="large" color="primary" /> },
  { title: "Company Profile", href: "/company-profile", icon: <BusinessIcon fontSize="large" color="primary" /> },
  { title: "Company Search", href: "/company-search", icon: <SearchIcon fontSize="large" color="primary" /> },
  { title: "Applications", href: "/applications", icon: <AssignmentTurnedInIcon fontSize="large" color="primary" /> },
];

export default function HomePage() {
  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Tender Platform
      </Typography>
      <Typography align="center" sx={{ mb: 4 }}>
        Navigate through the platform using the options below
      </Typography>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
      >
        {pages.map((page) => (
          <Link key={page.href} href={page.href} passHref legacyBehavior>
            <a style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  width: 260,
                  textAlign: "center",
                  p: 2,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardActionArea>
                  <Box sx={{ pt: 2 }}>{page.icon}</Box>
                  <CardContent>
                    <Typography variant="h6">{page.title}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </a>
          </Link>
        ))}
      </Box>
    </Container>
  );
}
