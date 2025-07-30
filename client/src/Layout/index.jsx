import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Box } from "@mui/material";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Box component={'main'} minHeight={'70vh'}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
