import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../Utils/fetchData";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
} from "@mui/material";

function valuetext(value) {
  return `$${value}`;
}
export default function Products() {
  const { categoryId } = useParams();
  const [product, setProduct] = useState();
  const [sort, setSort] = useState("createdAt:desc");
  const [price, setPrice] = useState([0, 1000]);
  const marks = [];
  for (let i = 0; i <= 1000; i += 200) {
    marks.push({
      value: i,
      label: valuetext(i),
    });
  }
  const handleSort = (e) => {
    setSort(e?.target?.value);
  };
  const handlePriceChange = (e, newValue) => {
    setPrice(newValue);
  };
  useEffect(() => {
    (async () => {
      const response = await fetchData(
        `products?${
          categoryId == "all"
            ? `sort=${sort}&filters[price][$gte]=${price[0]}&filters[price][$lte]=${price[1]}`
            : `filters[categories][id][$eq]=${categoryId}&sort=${sort}&filters[price][$gte]=${price[0]}&filters[price][$lte]=${price[1]}`
        }`
      );
      setProduct(response?.data);
    })();
  }, [categoryId, sort, price]);

  return (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      gap: 4,
      alignItems: "center",
      justifyContent: "space-between",
      bgcolor: "#fff",
      p: 3,
      borderRadius: 3,
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      mt: 4,
    }}
  >
    <FormControl sx={{ minWidth: 180 }} size="medium">
      <InputLabel id="demo-simple-select-label">Sort</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sort}
        label="Sort"
        onChange={handleSort}
      >
        <MenuItem value={"name"}>A-Z</MenuItem>
        <MenuItem value={"name:desc"}>Z-A</MenuItem>
        <MenuItem value={"price"}>Price low to high</MenuItem>
        <MenuItem value={"price:desc"}>Price high to low</MenuItem>
        <MenuItem value={"createdAt:desc"}>Newest</MenuItem>
        <MenuItem value={"createdAt"}>Oldest</MenuItem>
        <MenuItem value={"quantity"}>Quantity</MenuItem>
        <MenuItem value={"discount:desc"}>Discount</MenuItem>
      </Select>
    </FormControl>

    <Box sx={{ width: { xs: "100%", sm: 300 } }}>
      <Slider
        getAriaLabel={() => "Price Range"}
        value={price}
        min={0}
        max={1000}
        marks={marks}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        sx={{
          color: "primary.main",
        }}
      />
    </Box>
  </Box>
);

}
