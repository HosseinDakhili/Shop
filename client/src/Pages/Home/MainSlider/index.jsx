import React, { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import fetchData from "../../../Utils/fetchData";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function MainSlider() {
  const [sliders, setSliders] = useState();
  useEffect(() => {
    (async () => {
      const response = await fetchData("sliders?populate=*");
      setSliders(response.data);
    })();
  }, []);

  const items = sliders?.map((slide) => (
    <SwiperSlide key={slide?.id}>
      <img
        src={
          import.meta.env.VITE_BASE_FILE +
          slide?.img?.[0]?.formats?.thumbnail?.url
        }
      />
      {console.log(
        import.meta.env.VITE_BASE_FILE +
          slide?.img?.[0]?.formats?.thumbnail?.url
      )}
    </SwiperSlide>
  ));



  if (!sliders)
    return (
      <Skeleton
      animation='wave'
        variant="rectangular"
        sx={{
          my: "48px",
          mx: "auto",
          width: "90%",
          height: { xs: "50vh", md: "70vh" },
          borderRadius: "25px",
          overflow: "hidden",
        }}
      />
      )

  return (
    <Box
      my={"48px"}
      mx={"auto"}
      width={"90%"}
      height={"70vh"}
      borderRadius={"25px"}
      overflow={"hidden"}
      sx={{
        height: { xs: "50vh", md: "70vh" },
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation
        className="mainSlider"
      >
        {items}
      </Swiper>
    </Box>
  );
}
