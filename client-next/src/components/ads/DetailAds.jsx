"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { AdvertisementSkelton1 } from "../../skeleton/Advertisement.skeltons";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import banner from "../../assets/errorimg1.png";

export default function DetailAds() {
  const { loading, error, detailAds } = useSelector((state) => state.ads);

  // const [bannerAds, setBannerAds] = useState(null);

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
        className="w-full p-0 h-[200px]"
        style={{
          width: "100%",
          height: "200px",
        }}
      >
        {!loading
          ? detailAds.length > 0
            ? detailAds.map((ad, index) => {
                return (
                  <SwiperSlide key={index} className="w-full h-[200px]">
                    {/* <div> */}
                    <Image
                      src={ad.banner.url}
                      alt="sliderimg"
                      width={20}
                      height={10}
                      sizes={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                      className=" object-fill h-[200px] "
                    />
                    {/* </div> */}
                  </SwiperSlide>
                );
              })
            : [0, 0, 0].map((item, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={banner}
                    alt="sliderimg"
                    width={1200}
                    height={400}
                    sizes={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                    className="w-full h-full max-sm:max-w-screen-sm"
                  />
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
