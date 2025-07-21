import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/index.jsx";
import { Toaster } from "react-hot-toast";
import { CssBaseline } from "@mui/material";

export default function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
