import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import 'swiper/css';


export default function App() {

  return (
    <>
      <Swiper
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
        <SwiperSlide>
          <div className='swiper-slide'>
            <img src="/img/img1.jpg" style={{ height: "100%", width: "100%", objectFit: "cover" }} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='swiper-slide'>
            <img src="/img/img2.jpg" style={{ height: "100%", width: "100%", objectFit: "cover" }} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='swiper-slide'>
            <img src="/img/img3.jpg" style={{ height: "100%", width: "100%", objectFit: "cover" }} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='swiper-slide'>
            <img src="/img/img5.jpg" style={{ height: "100%", width: "100%", objectFit: "cover" }} alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
