import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import "./styles.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import CheapestCard from "./CheapestCard";
import CheapestProductSkeleton from "./CheapestProductSkeleton";
export default function CheapestProducts() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetchData(
        "products?populate=*&sort=price&pagination[limit]=6"
      );
      console.log(response.data);
      setProduct(response.data);
    })();
  }, []);
  const items = product?.map((product) => (
    <SwiperSlide key={product?.id}>
      <CheapestCard
        id={product?.id}
        name={product?.name}
        quantity={product?.quantity}
        img={product?.img?.[0]?.formats?.thumbnail?.url}
        price={product?.price}
        discount={product?.discount}
        category={product?.categories?.[0]?.name}
      />
    </SwiperSlide>
  ));
    if(!product) return <CheapestProductSkeleton />
    
  return (
    <Box
      my={"48px"}
      mx="auto"
      width={"90%"}
      height={"550px"}
      borderRadius={"25px"}
      overflow={"hidden"}
      px={"5%"}
      py={"32px"}
    >
      <Typography variant="h4" fontWeight={600} textAlign={"center"}>
        Cheapest Products
      </Typography>
      <Box my={"32px"} mx="auto" width={"90%"} height={"420px"}>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={50}
          slidesPerView={4}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          navigation
          className="cheapProductsSlider"
        >
          {items}
        </Swiper>
      </Box>
    </Box>
  );
}
