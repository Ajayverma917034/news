import React from "react";
import adsimgright2 from "../../assets/adsimgright2.png";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import banner from "../../assets/errorimg1.png";

import { AdvertisementSkelton1 } from "../../skeleton/Advertisement.skeltons";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import GoogleAd from "../../google-ads/GoogleAd";
const CustomeAndGoogleAdd = () => {
  const { loading, error, sideAds } = useSelector((state) => state.ads);

  return (
    <div className="flex flex-wrap gap-y-3 gap-x-4 md:flex max-sm:items-center w-full lg:flex-col ">
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
        className="mySwiper p-0 w-[330px] h-[330px]"
      >
        {/* {[0, 0, 0].map((item, index) => (
          <SwiperSlide key={index}>
            <AdvertisementSkelton1 />
          </SwiperSlide>
        ))} */}
        {!loading
          ? sideAds.length > 0
            ? sideAds.map((ad, index) => {
                return (
                  <SwiperSlide key={index} className="w-full h-full p-0">
                    <div className="w-[330px] h-[330px] overflow-hidden ml-auto mr-auto rounded-md">
                      <img
                        src={ad.banner.url}
                        alt="sliderimg"
                        className="w-full h-full object-fill rounded-md"
                      />
                    </div>
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
        <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 z-[100] flex gap-x-1 rounded-md p-1 font-sans items-center">
          <Link
            to={"/advertisement-us"}
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
      <div className="w-[330px] h-[330px] overflow-hidden ml-auto mr-auto">
        {/* <img className="w-full h-auto object-fill" src={adsimgright2} /> */}
        <GoogleAd
          adClient="ca-pub-5839947415375117"
          adSlot="7478609423"
          style={{ display: "block", width: 728, height: 90 }}
          format="auto"
        />
      </div>
    </div>
  );
};

export default CustomeAndGoogleAdd;
