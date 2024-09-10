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
import { useSelector } from "react-redux";
import Image from "next/image";
import banner from "../../assets/errorimg1.png";
import { useContext } from "react";
import { CustomeAdsContext } from "@/lib/CustomeAdsContext";
import Link from "next/link";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

export default function CustomeAndGoogleAdd() {
  // Always call useSelector at the top level
  // const { error, loading, detailAds } = useSelector((state) => state.ads);
  const { ads } = useContext(CustomeAdsContext);
  const sideAds = ads.sideAds;

  return (
    <div className="flex flex-wrap gap-y-3 gap-x-4 md:flex max-sm:items-center w-full max-w-[330px] sm:w-[330px] lg:flex-col ">
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
        className="mySwiper p-0 w-full max-w-[330px] sm:w-[330px] h-[330px]"
        style={{
          width: "330px",
          height: "330px",
          padding: "0px",
        }}
      >
        {sideAds
          ? sideAds.length > 0
            ? sideAds.map((ad, index) => {
                return (
                  <SwiperSlide key={index} className="w-full h-full p-0">
                    <div className="w-full max-w-[330px] sm:w-[330px] h-[330px] overflow-hidden ml-auto mr-auto rounded-md">
                      <Image
                        src={ad.banner.url}
                        alt="sliderimg"
                        className="w-full h-full object-fill rounded-md"
                        width={300}
                        height={330}
                        sizes={{
                          maxWidth: "100%",
                          height: "auto",
                        }}
                      />
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
                    height={400}
                    sizes={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                    className="w-full h-full"
                  />
                </SwiperSlide>
              ))
          : [0, 0, 0].map((item, index) => (
              <SwiperSlide key={index}>
                <AdvertisementSkelton1 />
              </SwiperSlide>
            ))}
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
          <span className="text-[#f9f9f9] text-[12px]">Sponsored</span>
        </div>
      </Swiper>
    </div>
  );
}
