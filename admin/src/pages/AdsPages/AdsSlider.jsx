import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import sliderimg from "../../assets/news banner.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./AdsSlider.css";

// import required modules
import { Pagination, Navigation, HashNavigation } from "swiper/modules";

export default function AdsSlider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        hashNavigation={{
          watchState: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, HashNavigation]}
        className="mySwiper"
      >
        {[1, 2, 3, 4, 5].map((img, index) => (
          <SwiperSlide key={index}>
            <img src={sliderimg} alt="sliderimg" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
