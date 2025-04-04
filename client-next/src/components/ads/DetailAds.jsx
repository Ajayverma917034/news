"use client";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { AdvertisementSkelton1 } from "../../skeleton/Advertisement.skeltons";
import Image from "next/image";
import banner from "../../assets/errorimg1.png";
import { useCustomeAds } from "@/hooks/ads";

export default function DetailAds() {
  const { data, isPending, isError, error } = useCustomeAds();

  return (
    <Swiper
      spaceBetween={20}
      effect={"fade"}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[EffectFade, Navigation, Autoplay]}
      className="w-full p-0 h-[200px] md:h-[300px]"
      style={{
        width: "100%",
        // height: "200px",
        padding: "0 !important",
      }}
    >
      {isPending
        ? [0, 0, 0].map((item, index) => (
            <SwiperSlide key={index}>
              <AdvertisementSkelton1 />
            </SwiperSlide>
          ))
        : data && data?.detailAds?.length
        ? data?.detailAds?.map((ad, index) => {
            return (
              <SwiperSlide
                key={index}
                className="w-full h-[200px] md:h-[300px]"
              >
                <Image
                  src={ad.banner.url}
                  alt="sliderimg"
                  width={20}
                  height={10}
                  sizes={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  className=" object-fill h-[200px] md:h-[300px]"
                />
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
          ))}
    </Swiper>
  );
}
