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

export default function Slider() {
  const [ads, setAds] = useState(null);
  const fetchAds = async () => {
    try {
      const { data } = await httpClient.get(
        "/get-advertisement?type=rectangle"
      );
      setAds(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);
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
        {/* {[0, 0, 0].map((item, index) => (
          <SwiperSlide key={index}>
            <AdvertisementSkelton1 />
          </SwiperSlide>
        ))} */}
        {ads
          ? ads.length > 0
            ? ads.map((ad, index) => {
                return (
                  <SwiperSlide key={index}>
                    <img
                      src={ad.banner.url}
                      alt="sliderimg"
                      className="w-full h-full"
                    />
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
