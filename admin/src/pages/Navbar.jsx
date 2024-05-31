import React from "react";
import logo from "../assets/logo.png";
import { FaCircleUser } from "react-icons/fa6";
const Navbar = () => {
  return (
    <div className="flex items-center justify-between gap-3 px-3 md:px-20 lg:px-28 py-1 border-b border-gray sticky top-0 z-[1000] bg-white">
      <img
        src={logo}
        alt="logoimg"
        className="w-[50%]  sm:w-[35%] md:w-[30%] lg:w-[28%]"
      />
      <div className="flex items-center justify-center gap-4">
        {/* <button className="btn-dark">Log In</button> */}
        <div className="flex items-center justify-center gap-4">
          <FaCircleUser size={30} className="text-gray" />
          <button className="btn-dark">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
