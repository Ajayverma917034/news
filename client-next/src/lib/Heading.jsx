import { findHindi } from "@/assets/data";
import React from "react";
import "./heading.css";

const Heading = ({ title }) => {
  return (
    <div className="flex items-center max-sm:px-1 gap-x-2">
      <p
        className=" text-red font-semibold"
        style={{
          fontSize: "1.9rem",
          minWidth: "fit-content",
        }}
      >
        {findHindi(title)}
      </p>
      <div
        className="flex w-full p-[2px] bg-red mb-2"
        style={{
          background: "red",
          padding: "2px",
          marginLeft: "0px 0 5px 5px",
        }}
      ></div>
    </div>
  );
};

export default Heading;

// <div className="flex items-center max-sm:px-1 gap-x-2">
//   <p
//     className="font-semibold animate-color-change "
//     style={{
//       fontSize: "1.9rem",
//       minWidth: "fit-content",
//     }}
//   >
//     {findHindi(title)}
//   </p>
//   <div
//     className="flex w-full h-[2px] mb-2"
//     style={{
//       width: "100%",
//       background: "linear-gradient(to right, #FF9933, #FFFFFF, #138808)",
//       marginLeft: "5px",
//       height: "3px",
//     }}
//   ></div>
// </div>
