"use client";
import React, { useEffect, useState } from "react";
import "./popup.css";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import GoogleAds from "../../components/GoogleAds";

const BottomPopUp = () => {
  const [popUpOpen, setPopUpOpen] = useState(true);

  useEffect(() => {
    setPopUpOpen(true);
  }, []);

  const togglePopUp = () => {
    setPopUpOpen(!popUpOpen);
  };

  return (
    <div
      id="bottom-popup"
      className={`fixed left-0 w-full bottom-0 bg-white shadow-lg flex justify-between items-center z-50 max-h-[5rem]  transition-all ease-in-out duration-1000 ${
        popUpOpen ? "translate-y-0" : "translate-y-full"
      }`}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.5) 0px 3px 15px",
      }}
    >
      <div className="flex items-center space-x-4 relative w-full max-h-[5rem]">
        <GoogleAds
          adClient="ca-pub-5839947415375117"
          adSlot="9778722714"
          style={{
            display: "inline-block",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div
        className="flex flex-col bg-white pt-2 max-md:pb-2 md:pt-3 px-4 md:px-3 absolute -top-7 right-0 rounded-tl-2xl"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.2) 0px -8px 10px",
        }}
      >
        <button
          id="toggle-popup"
          onClick={togglePopUp}
          className="outline-none"
        >
          {popUpOpen ? (
            <IoMdArrowDropdown size={23} />
          ) : (
            <IoMdArrowDropup size={23} />
          )}
        </button>
      </div>
    </div>
  );
};

export default BottomPopUp;
