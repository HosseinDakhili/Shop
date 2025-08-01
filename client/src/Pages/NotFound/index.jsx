import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        bgcolor: "#f5f5f5",
        p: 3,
      }}
    >
      <Typography variant="h1" color="primary" fontWeight={700}>
        404
      </Typography>
      <Typography variant="h5" mt={2} mb={1}>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </Box>
  );
}
