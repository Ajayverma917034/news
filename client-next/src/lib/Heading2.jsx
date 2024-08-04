import React from "react";
// import { findHindi } from "../assets/data";
// import moreimg from "../assets/moreimg.png";
import Link from "next/link";
import Image from "next/image";
const Heading2 = ({ title, link }) => {
  return (
    <>
      <div className="flex mt-3 items-center">
        <Link href={link} className="flex mr-3 item-center">
          <h1 className="text-[25px] md:text-5xl lg:text-5xl font-bold text-red mr-2 capitalize">
            {/* {findHindi(title)} */}
          </h1>
          {/* <Image
            width={100}
            height={100}
            src={moreimg}
            alt="More Icon"
            className="w-5 md:w-5 mt-[5px] md:mt-2"
          /> */}
        </Link>
        <div className="border-[2px] md:border-[3px] border-red flex-1 h-0 mb-[6px]"></div>
      </div>
    </>
  );
};

export default Heading2;
