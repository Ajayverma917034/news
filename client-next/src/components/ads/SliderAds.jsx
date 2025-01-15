"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./slider.css";

import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { AdvertisementSkelton1 } from "../../skeleton/Advertisement.skeltons";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import banner from "../../assets/errorimg1.png";
import { useCustomeAds } from "@/hooks/ads";

export default function SliderAds() {
  const { data, isPending, isError, error } = useCustomeAds();

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
        modules={[EffectFade, Navigation, Autoplay]}
        className="mySwiper swiper1 !px-2 sm:!px-10 md:!px-32 mt-0 !py-3"
      >
        {isPending
          ? [0, 0, 0].map((item, index) => (
              <SwiperSlide key={index}>
                <AdvertisementSkelton1 />
              </SwiperSlide>
            ))
          : data && data?.bannerAds?.length
          ? data?.bannerAds?.map((ad, index) => {
              return (
                <SwiperSlide key={index} className="">
                  <Image
                    src={ad.banner.url}
                    alt="sliderimg"
                    width={1000}
                    height={400}
                    sizes={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                    className="w-full h-full object-fill"
                  />
                  <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 z-[100] flex gap-x-1 rounded-md p-1 font-sans items-center">
                    <Link
                      href={"/advertisement-us"}
                      className="text-[#f9f9f9] text-[12px] "
                    >
                      <HiOutlineExclamationCircle
                        size={18}
                        className="text-[#f9f9f9] font-sans"
                      />
                    </Link>
                    <span className="text-[#f9f9f9] text-[12px]">
                      Sponsored
                    </span>
                  </div>
                </SwiperSlide>
              );
            })
          : [0, 0, 0].map((item, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={banner}
                  alt="sliderimg"
                  width={1200}
                  height={300}
                  sizes={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  className="w-full h-full object-fill"
                />
              </SwiperSlide>
            ))}
      </Swiper>
    </>
  );
}
