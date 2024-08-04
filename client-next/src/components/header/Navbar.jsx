"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import the usePathname hook
import "./Navbar.css";
import AllState from "./AllStates";
import Search from "./Search";
import logoimg from "../../assets/logoimg.png";

const Navbar = () => {
  const navItems = [
    { name: "Home", hindiName: "होम", link: "/" },
    { name: "Videos", hindiName: "वीडियो", link: "/videos" },
    { name: "State", hindiName: "राज्य", link: "/state" },
    { name: "Crime", hindiName: "क्राइम", link: "/crime" },
    { name: "Country", hindiName: "देश", link: "/country" },
    { name: "Sports", hindiName: "खेल कूद", link: "/sports" },
    { name: "Entertainment", hindiName: "मनोरंजन", link: "/entertainment" },
    { name: "Astrology", hindiName: "राशिफल", link: "/astrology" },
    { name: "Career", hindiName: "करियर", link: "/career" },
    { name: "Religion", hindiName: "धर्म", link: "/religion" },
    { name: "World", hindiName: "विदेश", link: "/world" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const pathname = usePathname(); // Get the current path

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > window.innerHeight * 0.2) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickSearch = () => {
    setSearchOpen(true);
  };

  return (
    <>
      <div className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="flex items-center justify-between px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] max-md:pt-3">
          <Image
            src={logoimg}
            alt="logo"
            className="w-[50%] sm:w-[35%] md:w-[30%] lg:w-[20%]"
            priority={true}
          />
          <div className="flex justify-between items-center gap-x-3 sm:gap-8 max-sm:mt-[8px]">
            <div
              className="flex items-center justify-center gap-1 cursor-pointer"
              onClick={toggleMenu}
            >
              <CiLocationOn className="mb-1 text-red text-2xl" />
              <h3 className="select-none text-black">अपना शहर</h3>
            </div>
            <div className="justify-between items-center sm:border border-gray rounded-[8px] sm:px-4 flex">
              <input
                type="text"
                placeholder="यहाँ लिखे"
                onClick={handleClickSearch}
                className="border-none text-md py-0.5 outline-none placeholder:text-sm hidden sm:flex"
              />
              <CiSearch
                size={20}
                className="cursor-pointer"
                onClick={handleClickSearch}
              />
            </div>
          </div>
        </div>
        <div className="bg-blue pt-3 pb-2 max-md:mt-1">
          <ul className="flex gap-x-10 text-white px-5 md:px-20 overflow-x-auto overflow-y-hidden no-scrollbar justify-evenly items-center">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`text-2xl min-w-fit nav-item ${
                  pathname === item.link ? "active" : ""
                }`}
              >
                <Link href={item.link}>{item.hindiName}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AllState isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
    </>
  );
};

export default Navbar;
