import React from "react";
import { NavLink } from "react-router-dom";
import logoimg from "../../assets/logoimg.png";
import { CiLocationOn, CiSearch } from "react-icons/ci";

const Navbar = () => {
  const navItems = [
    { name: "Home", hindiName: "होम", link: "/" },
    { name: "State", hindiName: "राज्य", link: "/state" },
    { name: "Country", hindiName: "देश", link: "/country" },
    { name: "World", hindiName: "विदेश", link: "/world" },
    { name: "Crime", hindiName: "क्राइम", link: "/crime" },
    { name: "IPL 2024", hindiName: "IPL 2024", link: "/ipl" },
    { name: "Sports", hindiName: "खेल कूद", link: "/sports" },
    { name: "Religion", hindiName: "धर्म", link: "/religion" },
  ];
  return (
    <>
      <div className="sticky top-0 bg-white z-[1000]">
        <div className="flex items-center justify-between px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] max-md:pt-3">
          <img
            src={logoimg}
            alt="logoimg"
            className="w-[50%]  sm:w-[35%] md:w-[30%] lg:w-[20%]"
          />
          <div className=" flex justify-between items-center gap-8 ">
            <div className="flex items-center justify-center gap-1 cursor-pointer">
              <CiLocationOn className="mb-1 text-red text-2xl" />
              <h3>अपना शहर</h3>
            </div>
            <div className=" justify-between items-center border border-gray rounded-[8px] px-4 hidden sm:flex ">
              <input
                type="text"
                placeholder="यहाँ लिखे"
                className=" border-none text-md py-0.5 outline-none placeholder:text-sm"
              />
              <CiSearch className=" cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="bg-blue py-3 max-md:mt-4">
          <ul className="flex gap-x-10 text-white px-2  md:px-20 overflow-x-auto overflow-y-hidden no-scrollbar justify-evenly items-center  no-scrollbar">
            {navItems.map((item, index) => (
              <NavLink
                to={item.link}
                className="text-2xl min-w-fit"
                key={index}
              >
                {item.hindiName}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
