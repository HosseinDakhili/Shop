import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function CategoryCard({ id, name, img }) {
  const navigate = useNavigate();
  return (
  <Box
    onClick={() => navigate(`/products/${id}/${name.replaceAll(" ", "-")}`)}
    sx={{
      position: "relative",
      width: "100%",
      height: "300px",
      borderRadius: "20px",
      cursor: "pointer",
      overflow: "hidden",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "scale(1.03)",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
        "& div": {
          opacity: "1 !important",
          visibility: "visible !important",
        },
      },
    }}
  >
    <Box
      component="img"
      src={import.meta.env.VITE_BASE_FILE + img}
      alt={name}
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "filter 0.3s ease",
        filter: "brightness(1)",
        "&:hover": {
          filter: "brightness(0.85)",
        },
      }}
    />
    <Box
      sx={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,0,0,0.55)",
        color: "white",
        p: 2,
        opacity: 0,
        visibility: "hidden",
        transition: "all 0.4s ease",
        fontSize: "24px",
        fontWeight: "bold",
        letterSpacing: "1px",
        textTransform: "uppercase",
        textAlign: "center",
        backdropFilter: "blur(2px)",
      }}
    >
      {name}
    </Box>
  </Box>
);

}
