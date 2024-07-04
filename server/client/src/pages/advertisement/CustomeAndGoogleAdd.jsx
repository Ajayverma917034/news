import React, { useEffect, useState } from "react";
import adsimgright1 from "../../assets/adsimgright1.png";
import adsimgright2 from "../../assets/adsimgright2.png";
import httpClient from "../../api/httpClient";
const CustomeAndGoogleAdd = ({ index = 0 }) => {
  const [ads, setAds] = useState(null);
  const fetchAds = async () => {
    try {
      const { data } = await httpClient.get(
        `/get-advertisement-side?type=square&index=${index}`
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
    <div className="flex flex-wrap  gap-y-3 gap-x-4 md:flex md:w-full  justify-center lg:flex-col ">
      {!ads ? (
        <div className="w-[330px] h-[260px] animate-pulse bg-[#dddbdd]"></div>
      ) : (
        <div className="w-[330px] h-[260px]">
          <img className="w-full h-full object-cover" src={ads?.banner?.url} />
        </div>
      )}
      <div className="w-[330px] h-[260px] overflow-hidden">
        <img className="w-full h-auto object-contain" src={adsimgright2} />
      </div>
    </div>
  );
};

export default CustomeAndGoogleAdd;
