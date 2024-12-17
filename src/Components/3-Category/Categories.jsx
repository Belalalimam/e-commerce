import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsBasedOnCategory } from "../../redux/apiCalls/productApiCalls";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../redux/apiCalls/categoryApiCalls";


const CategoriesCarousel = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = category

  return (
    <Box sx={{ width: "100%", py: 2, overflow: "hidden", display: "flex" }} className='justify-center'>
      {categories.map((category, index) => (

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            mb: 1,
            cursor: "pointer",
            mx:3
          }}
          className='w-[90px] h-[90px]'
        >
          <div className="flex relative bg-cover">
            <img
              src={category.categoryImage.url}
              className="rounded-full bg-cover"
            />
          </div>

          <Typography
            variant="body2"
            sx={{
              fontSize: "0.9rem",
              textAlign: "center",
              fontWeight: "bold",
              color: "#333",
            }}
            className="absolute "
          >
            {category.title}
          </Typography>
        </Box>

      ))}
    </Box>
  );
};

export default CategoriesCarousel;
