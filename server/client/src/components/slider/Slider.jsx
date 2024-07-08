import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import httpClient from "../../api/httpClient";
import banner from "../../assets/errorimg1.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./slider.css";

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { AdvertisementSkelton1 } from "../../skeleton/Advertisement.skeltons";
import { useDispatch, useSelector } from "react-redux";

export default function Slider() {
  const { loading, error, bannerAds } = useSelector((state) => state.ads);

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
        {!loading
          ? bannerAds.length > 0
            ? bannerAds.map((ad, index) => {
                return (
                  <SwiperSlide key={index}>
                    {/* <div> */}
                    <img
                      src={ad.banner.url}
                      alt="sliderimg"
                      className="w-full h-full object-fill"
                    />
                    {/* </div> */}
                  </SwiperSlide>
                );
              })
            : [0, 0, 0].map((item, index) => (
                <SwiperSlide key={index}>
                  <img src={banner} alt="sliderimg" className="w-full h-full" />
                </SwiperSlide>
              ))
          : [0, 0, 0].map((item, index) => (
              <SwiperSlide key={index}>
                <AdvertisementSkelton1 />
              </SwiperSlide>
            ))}
      </Swiper>
    </>
  );
}
