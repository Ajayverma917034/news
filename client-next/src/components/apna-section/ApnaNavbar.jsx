import React, { useState, useEffect, useRef } from "react";
import ApnaPagi from "./ApnaPagi";
import { findHindi } from "@/assets/data";
const ApnaNavbar = ({ navItems, currentIndex, setCurrentIndex, hint }) => {
  const [hovered, setHovered] = useState(false);
  const [visibleNavItems, setVisibileNavItems] = useState(6);

  const updatevisibleNavItems = () => {
    const width = window.innerWidth;
    if (width < 380) {
      setVisibileNavItems(3);
    } else if (width < 400) {
      setVisibileNavItems(4);
    } else if (width < 640) {
      setVisibileNavItems(5);
    } else if (width < 768) {
      setVisibileNavItems(6);
    } else if (width < 1024) {
      setVisibileNavItems(7);
    } else {
      setVisibileNavItems(8);
    }
  };

  useEffect(() => {
    updatevisibleNavItems();
    window.addEventListener("resize", updatevisibleNavItems);
    return () => window.removeEventListener("resize", updatevisibleNavItems);
  }, []);

  return (
    <nav
      className={`px-0 md:px-3 flex justify-between items-center pt-1  border-b-2 ${
        hint === "state"
          ? "pb-1 bg-white border-[#36373a]"
          : "bg-[#1f2024] border-[#36373a]"
      }`}
    >
      <div className="flex space-x-2 md:space-x-4 items-center relative">
        {navItems.slice(0, visibleNavItems).map((district, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={` text-xl md:text-xl hover:underline decoration-red capitalize ${
              currentIndex === index ? " !text-red" : ""
            } ${hint === "state" ? "text-black font-semibold" : "text-white"}`}
          >
            {findHindi(district)}
          </button>
        ))}
        {navItems.length > visibleNavItems && (
          <div
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <button
              className={`text-center mb-2 text-[25px] ${
                hint === "state" ? "" : "text-white"
              }`}
            >
              ...
            </button>
            {hovered && (
              <div
                className={`absolute  z-10 top-[80%] right-[-50px] p-1 w-28 border  px-2 rounded shadow-lg mt-2 py-2 ${
                  hint === "state"
                    ? "border-black bg-white"
                    : "bg-[#1f2024] border-white"
                }`}
              >
                {navItems.slice(visibleNavItems).map((district, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(visibleNavItems + index);
                      setHovered(false);
                    }}
                    className={` block text-xl md:text-xl w-full mt-1 hover:underline decoration-red ${
                      currentIndex === index + visibleNavItems
                        ? "!text-red"
                        : ""
                    } ${
                      hint === "state"
                        ? "text-black font-semibold"
                        : "text-white"
                    }`}
                  >
                    {findHindi(district)}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <ApnaPagi
          {...{
            currentIndex,
            setCurrentIndex,
            hint,
            navItems,
          }}
        />
      </div>
    </nav>
  );
};

export default ApnaNavbar;
