import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../Utils/fetchData";
import { Box, Button, Stack, Typography } from "@mui/material";
import SkeletonDetails from "./SkeletonDetails";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItems } from "../../Store/Slices/CartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const cartQuantity =
    useSelector((state) => state.cart.items).find((items) => items.id === id)
      ?.cartQuantity || 0;
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const response = await fetchData(
        `products?populate=*&filters[id][$eq]=${id}`
      );
      setProduct(response.data?.[0]);
    })();
  }, [id]);
  if (!product) return <SkeletonDetails />;
  return (
    <Stack
  direction={{ xs: "column", md: "row" }}
  spacing={4}
  sx={{
    p: 3,
    bgcolor: "#fff",
    borderRadius: 3,
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  }}
>
  <Box sx={{ flex: 1 }}>
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
        mb: 2,
      }}
    >
      <img
        src={
          import.meta.env.VITE_BASE_FILE +
          product?.img?.[currentImg]?.formats?.thumbnail?.url
        }
        alt=""
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          borderRadius: 12,
        }}
      />
    </Box>
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      {product?.img.map((image, index) => (
        <img
          key={index}
          src={
            import.meta.env.VITE_BASE_FILE +
            image?.formats?.thumbnail?.url
          }
          alt=""
          onClick={() => setCurrentImg(index)}
          style={{
            width: 64,
            height: 64,
            borderRadius: 8,
            cursor: "pointer",
            objectFit: "cover",
            border:
              currentImg === index ? "2px solid #1976d2" : "2px solid transparent",
            transition: "border 0.3s",
          }}
        />
      ))}
    </Box>
  </Box>

  <Box sx={{ flex: 1 }}>
    <Typography variant="h4" fontWeight={600} mb={1}>
      {product?.name}
    </Typography>
    <Typography variant="subtitle1" color="text.secondary" mb={1}>
      {product?.categories?.name}
    </Typography>
    <Typography variant="h6" color="primary" mb={1}>
      ${product?.price}
    </Typography>
    <Typography variant="body1" color="text.secondary" mb={1}>
      Discount: {product?.discount}%
    </Typography>
    <Typography variant="body2" color="text.secondary" mb={2}>
      Quantity: {product?.quantity}
    </Typography>

    <Stack direction="row" spacing={2} alignItems="center">
      {cartQuantity === 0 ? (
        <Button
          onClick={() => dispatch(addItem(product))}
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          Add to Cart
        </Button>
      ) : (
        <>
          <Button
            onClick={() => dispatch(removeItems(product?.id))}
            variant="outlined"
            color="primary"
            sx={{ minWidth: 40, borderRadius: 2 }}
          >
            -
          </Button>
          <Button
            onClick={() => dispatch(addItem(product))}
            variant="outlined"
            color="primary"
            sx={{ minWidth: 40, borderRadius: 2 }}
          >
            +
          </Button>
        </>
      )}
    </Stack>
  </Box>
</Stack>
  );
}
