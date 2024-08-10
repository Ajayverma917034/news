import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaBars } from "react-icons/fa";

const Sidebar = ({ isOpen = true, toggleSidebar }) => {
  return (
    <div
      className={`bg-white h-full ${
        isOpen ? "w-64" : "w-20"
      } transition-width duration-300 fixed top-0 left-0 shadow-dark-shadow`}
    >
      <div className="flex items-center justify-between h-16 p-4 text-gray">
        <span className={`${isOpen ? "block" : "hidden"} font-bold text-xl`}>
          Admin
        </span>
        <button onClick={toggleSidebar} className="block md:hidden">
          <FaBars />
        </button>
      </div>
      <nav className="flex flex-col items-start p-4 space-y-4">
        <Link
          className="flex items-center text-gray hover:bg-red hover:text-white p-2 rounded w-full"
          to="/"
        >
          <FaHome size={24} />
          <span className={`${isOpen ? "block" : "hidden"} ml-4`}>Home</span>
        </Link>
        <Link
          className="flex items-center text-gray hover:bg-red hover:text-white p-2 rounded w-full"
          to="/profile"
        >
          <FaUser size={24} />
          <span className={`${isOpen ? "block" : "hidden"} ml-4`}>Profile</span>
        </Link>
        <Link
          className="flex items-center text-gray hover:bg-red hover:text-white p-2 rounded w-full"
          to="/settings"
        >
          <FaCog size={24} />
          <span className={`${isOpen ? "block" : "hidden"} ml-4`}>
            Settings
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
