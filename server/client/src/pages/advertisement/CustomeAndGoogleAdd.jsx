import React from "react";
import adsimgright1 from "../../assets/adsimgright1.png";
import adsimgright2 from "../../assets/adsimgright2.png";
const CustomeAndGoogleAdd = () => {
  return (
    <div className="flex flex-wrap  gap-y-1 gap-x-4 md:flex md:w-full  justify-center lg:flex-col ">
      <div className="w-[330px] h-[260px] overflow-hidden">
        <img className="w-full h-auto object-contain" src={adsimgright1} />
      </div>
      <div className="w-[330px] h-[260px] overflow-hidden">
        <img className="w-full h-auto object-contain" src={adsimgright2} />
      </div>
    </div>
  );
};

export default CustomeAndGoogleAdd;
