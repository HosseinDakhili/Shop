import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../Utils/fetchData";
import ProductSkeleton from "./ProductSkeleton";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
} from "@mui/material";
import ProductCard from "./ProductCard";

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
            ? `populate=*&sort=${sort}&filters[price][$gte]=${price[0]}&filters[price][$lte]=${price[1]}`
            : `populate=*&filters[categories][id][$eq]=${categoryId}&sort=${sort}&filters[price][$gte]=${price[0]}&filters[price][$lte]=${price[1]}`
        }`
      );
      setProduct(response?.data);
    })();
  }, [categoryId, sort, price]);

  const loadingArrayComponent = new Array(12).fill(<ProductSkeleton />);
  const items = product?.map((e) => {
    return (
      <ProductCard
        key={e?.id}
        id={e?.id}
        name={e?.name}
        price={e?.price}
        discount={e?.discount}
        quantity={e?.quantity}
       img={e?.img?.[0]?.formats?.thumbnail?.url}
      />
    );
  });
  return (
   <Box sx={{ p: 2 }}>
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        mb: 3,
        alignItems: "center",
      }}
    >
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id="sort-label">Sort</InputLabel>
        <Select
          labelId="sort-label"
          value={sort}
          label="Sort"
          onChange={handleSort}
        >
          <MenuItem value="name">A-Z</MenuItem>
          <MenuItem value="name:desc">Z-A</MenuItem>
          <MenuItem value="price">Price low to high</MenuItem>
          <MenuItem value="price:desc">Price high to low</MenuItem>
          <MenuItem value="createdAt:desc">Newest</MenuItem>
          <MenuItem value="createdAt">Oldest</MenuItem>
          <MenuItem value="quantity">Quantity</MenuItem>
          <MenuItem value="discount:desc">Discount</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ width: { xs: "100%", sm: 300 } }}>
        <Slider
          value={price}
          min={0}
          max={1000}
          marks={marks}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
    </Box>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 2,
      }}
    >
      {product ? items : loadingArrayComponent}
    </Box>
  </Box>
  );
}
