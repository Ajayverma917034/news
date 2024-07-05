import React, { useEffect, useState } from "react";
import adsimgright1 from "../../assets/adsimgright1.png";
import adsimgright2 from "../../assets/adsimgright2.png";
import httpClient from "../../api/httpClient";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import banner from "../../assets/errorimg1.png";

import { AdvertisementSkelton1 } from "../../skeleton/Advertisement.skeltons";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
const CustomeAndGoogleAdd = ({ type = "square" }) => {
  const [ads, setAds] = useState(null);
  const fetchAds = async () => {
    try {
      const { data } = await httpClient.get(`/get-advertisement?type=${type}`);
      setAds(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);
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
        className="mySwiper p-0 w-[330px] h-[260px]"
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
                  <SwiperSlide key={index} className="w-full p-0">
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
      <div className="w-[330px] h-[260px] overflow-hidden ml-auto mr-auto">
        <img className="w-full h-auto object-contain" src={adsimgright2} />
      </div>
    </div>
  );
};

export default CustomeAndGoogleAdd;
