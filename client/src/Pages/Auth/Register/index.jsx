import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

export default function Register() {
  const [fields, handleChange] = useFormFields({ username: "", email: "",password:'' });
  return (
   <Box
    component={"form"}
    onSubmit={handleSubmit}
    sx={{
      maxWidth: 400,
      mx: "auto",
      mt: 6,
      display: "flex",
      flexDirection: "column",
      gap: 3,
      bgcolor: "#fafafa",
      p: 4,
      borderRadius: 3,
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    }}
  >
    <Typography variant="h5" fontWeight="700" textAlign="center" mb={2}>
      Login Form
    </Typography>

    <TextField
      name="username"
      label="username"
      variant="filled"
      value={fields?.identifier}
      onChange={handleChange}
      required
      fullWidth
      autoComplete="username"
    />
    <TextField
      name="email"
      label="Email"
      type="email"
      variant="filled"
      value={fields?.identifier}
      onChange={handleChange}
      required
      fullWidth
      autoComplete="username"
    />

    <TextField
      name="password"
      label="Password"
      variant="filled"
      type="password"
      value={fields?.password}
      onChange={handleChange}
      required
      fullWidth
      autoComplete="current-password"
    />

    <Button
      type="submit"
      variant="contained"
      color="primary"
      size="large"
      sx={{ mt: 1 }}
    >
      Login
    </Button>

    <Typography variant="body2" textAlign="center" mt={2}>
      Don&apos;t have an account?{" "}
      <Button
        variant="text"
        onClick={() => handlePageType("register")}
        sx={{ textTransform: "none" }}
      >
        Register
      </Button>
    </Typography>
  </Box>
  )
}
