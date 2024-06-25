import React from "react";
import { findHindi } from "../../assets/data";
import { Link } from "react-router-dom";
import moreimg from "../../assets/moreimg.png";
const Heading2 = ({ title, link }) => {
  return (
    <>
      <div className="flex mt-3 items-center">
        <Link to={link} className="flex mr-3 justify-center">
          <h1 className="text-[25px] md:text-5xl lg:text-5xl font-bold text-red mr-2 capitalize">
            {findHindi(title)}
          </h1>
          <img src={moreimg} alt="More Icon" className="w-6" />
        </Link>
        <div className="border-[2px] md:border-[3px] border-red flex-1 h-0 mb-[6px]"></div>
      </div>
    </>
  );
};

export default Heading2;
