import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import  {Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Box, Typography } from "@mui/material";

const categories = [
  { label: "lace fabric", image: "/img/img1.jpg" },
  { label: "lace fabric", image: "/img/img1.jpg" },
  { label: "lace fabric", image: "/img/img1.jpg" },
  { label: "lace fabric", image: "/img/img1.jpg" },
  { label: "lace fabric", image: "/img/img1.jpg" },
  { label: "lace fabric", image: "/img/img1.jpg" },
  { label: "lace fabric", image: "/img/img1.jpg" },
  { label: "lace fabric", image: "/img/img1.jpg" },
  { label: "lace fabric", image: "/img/img1.jpg" },
];

const CategoriesCarousel = () => {
  return (
    <Box sx={{ width: "100%", py: 2, overflow: "hidden", }}>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={8}
        breakpoints={{
          320: { slidesPerView: 3 },
          640: { slidesPerView: 5 },
          1024: { slidesPerView: 8 },
        }}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Circular Image with Yellow Background */}
              <Box
                sx={{
                  width: 90,
                  height: 90,
                  backgroundColor: "",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center", 
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  mb: 1,
                }}
              >
                <img
                  src={category.image}
                  alt={category.label}
                  style={{
                    width: "65%",
                    height: "65%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              {/* Label */}
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.9rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {category.label}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CategoriesCarousel;
