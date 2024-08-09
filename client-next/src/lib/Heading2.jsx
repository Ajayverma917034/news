import React from "react";
import moreimg from "../assets/moreimg.png";
import Link from "next/link";
import Image from "next/image";
import { findHindi } from "@/assets/data";
const Heading2 = ({ title, link }) => {
  return (
    <>
      <div
        className="flex mt-3"
        style={{
          alignItems: "center",
        }}
      >
        <Link href={link} className="flex mr-3 item-center">
          <h1
            className="text-[25px] md:text-5xl lg:text-5xl font-bold text-red mr-2 capitalize"
            style={{
              fontSize: "1.9rem",
              minWidth: "fit-content",
            }}
          >
            {findHindi(title)}
          </h1>
          <Image
            width={100}
            height={100}
            src={moreimg}
            alt="More Icon"
            className="w-5 md:w-5 mt-[5px] md:mt-5"
          />
        </Link>
        <div className="flex">
          <div
            className="flex w-full p-[2px] bg-red mb-2"
            style={{
              background: "red",
              padding: "2px",
              marginLeft: "0px 0 5px 5px",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Heading2;
