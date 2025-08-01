import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import useFormFields from "../../../Hooks/useFormFields";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/Notify";
import { useDispatch } from "react-redux";
import { login } from "../../../Store/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
export default function Login({ handlePageType }) {
  const [fields, handleChange] = useFormFields({ identifier: "", password: "" });
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetchData('auth/local',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:
        JSON.stringify(fields)
      
    })
    console.log(response)
    if(response.jwt){
      notify('success','login successfully')
      dispatch(login({jwt:response?.jwt,user:response?.user}))
      navigate('/')
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
      Login Form
    </Typography>

    <TextField
      name="identifier"
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
);

}
