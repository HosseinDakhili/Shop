import { useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";
import CategoryCard from "./CategoryCard";
import { Box } from "@mui/material";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetchData("categories?populate=*");
      setCategories(response.data);
    })();
  }, []);
  const items = categories?.map((category) => {
    return (
      <CategoryCard
        key={category?.id}
        id={category?.id}
        name={category?.name}
        img={category?.img?.[0]?.formats?.thumbnail?.url}
      />
    );
  });
  return (
  <Box
    sx={{
      mt: "40px",
      px: { xs: 2, md: 4 },
      display: "grid",
      gridTemplateColumns: {
        xs: "repeat(2, 1fr)",
        sm: "repeat(3, 1fr)",
        md: "repeat(4, 1fr)",
      },
      gap: { xs: 2, md: 3 }, // فاصله بهتر در سایزهای مختلف
      alignItems: "stretch",

      // افکت حرفه‌ای روی تمام آیتم‌ها داخل گرید
      "& > *": {
        backgroundColor: "#fff",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.18)",
        },
      },
    }}
  >
    {items}
  </Box>
);

}
