import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaBars } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import { TbVideoPlus } from "react-icons/tb";

const Sidebar = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <section className="relative flex gap-10 py-0 m-0 ">
        <div
          className={`bg-white h-[calc(100vh-125px)] ${
            open ? "w-64" : "w-20"
          } transition-width duration-300 sticky top-[123px] left-0 shadow-dark-shadow overflow-y-auto`}
        >
          <div className="flex items-center justify-between h-16 p-4 text-gray">
            <span className={`${open ? "block" : "hidden"} font-bold text-xl`}>
              Admin
            </span>
            <button onClick={() => setOpen(!open)} className="block">
              <FaBars />
            </button>
          </div>
          <nav className="flex flex-col items-start p-4 space-y-4">
            <Link
              className="flex items-center text-gray hover:bg-red hover:text-white p-2 rounded w-full"
              to="/"
            >
              <FaHome size={24} />
              <span className={`${open ? "block" : "hidden"} ml-4`}>Home</span>
            </Link>
            <Link
              className="flex items-center text-gray hover:bg-red hover:text-white p-2 rounded w-full"
              to="/profile"
            >
              <FaUser size={24} />
              <span className={`${open ? "block" : "hidden"} ml-4`}>
                Profile
              </span>
            </Link>
            <Link
              className="flex items-center text-gray hover:bg-red hover:text-white p-2 rounded w-full"
              to="/settings"
            >
              <FaCog size={24} />
              <span className={`${open ? "block" : "hidden"} ml-4`}>
                Settings
              </span>
            </Link>
            <hr className="text-gray w-full" />
            <Link
              className="flex items-center text-gray hover:bg-red hover:text-white p-2 rounded w-full"
              to="/dashboard/create-news"
            >
              <IoCreateOutline size={25} />
              <span className={`${open ? "block" : "hidden"} ml-4 mt-1`}>
                Create News
              </span>
            </Link>
            <Link
              className="flex items-center text-gray hover:bg-red hover:text-white p-2 rounded w-full"
              to="/dashboard/create-videos"
            >
              <TbVideoPlus size={25} />
              <span className={`${open ? "block" : "hidden"} ml-4 `}>
                Create YtVideo
              </span>
            </Link>
          </nav>
        </div>
        <div className="max-md: mt-5 w-full">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Sidebar;
