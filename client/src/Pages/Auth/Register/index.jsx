import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import useFormFields from '../../../Hooks/useFormFields';
import fetchData from '../../../Utils/fetchData';
import notify from '../../../Utils/Notify';

export default function Register({handlePageType}) {
  const [fields, handleChange] = useFormFields({ username: "", email: "",password:'' });


   const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetchData('auth/local/register',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:
        JSON.stringify(fields)
      
    })
    if(response.jwt){
      notify('success','sign up successfully')
      handlePageType()
    }else{
      notify('error',response.error?.message)
    }
  };
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
      Welcome to my Website
    </Typography>

    <TextField
      name="username"
      label="username"
      variant="filled"
      value={fields?.username}
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
      value={fields?.email}
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
      Sign up
    </Button>

    <Typography variant="body2" textAlign="center" mt={2}>
      Don&apos;t Already have an account?{" "}
      <Button
        variant="text"
        onClick={() => handlePageType("register")}
        sx={{ textTransform: "none" }}
      >
        Login
      </Button>
    </Typography>
  </Box>
  )
}
