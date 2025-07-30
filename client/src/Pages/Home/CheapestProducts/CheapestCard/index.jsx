import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CheapestCard({
  name,
  price,
  discount,
  img,

  quantity,
  category,
  id,
}) {
  const navigate = useNavigate();
    // console.log(import.meta.env.VITE_BASE_FILE + img);
  return (
    <Box
      width={"100%"}
      height={"100%"}
      onClick={() =>
        navigate(`/product-details/${id}/${name.replaceAll(" ", "-")}`)
      }
    >
      <img
        src={import.meta.env.VITE_BASE_FILE + img}
        width={"100%"}
        height={"50%"}
        alt=""
      />
      <Box p={2}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {category}
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          ${(price * (1 - discount/100)).toFixed(2)}
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          {quantity}
        </Typography>
      </Box>
    </Box>
  );
}
