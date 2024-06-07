import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./slider.css";

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { AdvertisementSkelton1 } from "../../skeleton/Advertisement.skeltons";

export default function Slider() {
  return (
    <>
      <Swiper
        spaceBetween={20}
        effect={"fade"}
        // navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        {[0, 0, 0].map((item, index) => (
          <SwiperSlide key={index}>
            <AdvertisementSkelton1 />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
