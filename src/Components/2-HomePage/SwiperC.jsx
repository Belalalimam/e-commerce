import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function App() {
  const heightSiwper = {
    height: {
      xs: "200px",
      sm: "300px",
      md: "400px"
    }
  };
  return (
    <>
      <Swiper
        style={{ marginTop: "10px" }}
        slidesPerView={1.5}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide style={heightSiwper}>
          <div className="swiper-slide" style={heightSiwper}>
            <img src="/img/img1.jpg" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide style={heightSiwper}>
          <div className="swiper-slide" style={heightSiwper}>
            <img src="/img/img2.jpg" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide style={heightSiwper}>
          <div className="swiper-slide" style={heightSiwper}>
            <img src="/img/img3.jpg" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide style={heightSiwper}>
          <div className="swiper-slide" style={heightSiwper}>
            <img src="/img/img5.jpg" alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
