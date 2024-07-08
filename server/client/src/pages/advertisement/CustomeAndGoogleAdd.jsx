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
const CustomeAndGoogleAdd = ({ type = "square" }) => {
  const { loading, error, sideAds } = useSelector((state) => state.ads);

  return (
    <div className="flex flex-wrap  gap-y-3 gap-x-4 md:flex md:w-full  lg:flex-col ">
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
                    <div className="w-[330px] h-[330px] overflow-hidden ml-auto mr-auto">
                      <img
                        src={ad.banner.url}
                        alt="sliderimg"
                        className="w-full h-full object-fill"
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
      </Swiper>
      <div className="w-[330px] h-[330px] overflow-hidden ml-auto mr-auto">
        <img className="w-full h-auto object-fill" src={adsimgright2} />
      </div>
    </div>
  );
};

export default CustomeAndGoogleAdd;
