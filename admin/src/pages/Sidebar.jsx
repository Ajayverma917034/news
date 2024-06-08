import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { TbVideoPlus } from "react-icons/tb";
import { MdNewspaper } from "react-icons/md";
import { IoNewspaper } from "react-icons/io5";
import { MdOutlineVideoSettings } from "react-icons/md";
import { FaHome, FaUser, FaCog, FaBars } from "react-icons/fa";
import { RiAdvertisementLine } from "react-icons/ri";
import { lookInSession } from "../common/session";

const SideBar = () => {
  let page = location.pathname.split("/")[2];
  let [pageState, setPageState] = useState(("-", ""));
  let [showSideNav, setShowSideNav] = useState(false);
  let sidebarRef = useRef();

  const changePageState = (e) => {
    let { offsetWidth, offsetLeft } = e.target;
    // You can modify activeTabLine if needed, or remove it
    // activeTabLine.current.style.width = offsetWidth + "px";
    // activeTabLine.current.style.left = offsetLeft + "px";

    if (
      e.target === sidebarRef.current ||
      e.target.closest(".sidebar-toggle")
    ) {
      // Clicking on the sidebar or its toggle button, don't close it
      return;
    }

    setShowSideNav(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSideNav && !event.target.closest(".sidebar")) {
        setShowSideNav(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSideNav]);

  useEffect(() => {
    setShowSideNav(false);
    // pageStateTap.current.click(); // If needed
  }, [pageState]);

  const sessionData = JSON.parse(lookInSession("user"));
  const user = sessionData?.user;
  return (
    <>
      <section className="relative flex py-0 m-0 max-md:flex-col bg-white">
        {/* Overlay */}
        {showSideNav && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => setShowSideNav(false)}
          ></div>
        )}

        <div className="sticky top-[72px] z-[150]">
          <div className="relative md:hidden bg-white py-1 border-b border-grey flex flex-nowrap overflow-x-auto pl-5">
            <button
              className="p-1 capitalize sidebar-toggle"
              onClick={() => setShowSideNav(!showSideNav)}
            >
              <FaBars />
            </button>
            <button className="p-1 capitalize sidebar-toggle">
              {pageState}
            </button>
            {/* Remove the <hr> if not needed */}
            {/* <hr className="absolute bottom-0 duration-500" /> */}
          </div>

          <div
            ref={sidebarRef}
            className={
              "min-w-[200px] pt-3 px-5 !h-[calc(100vh-107px)] max-md:pb-4 md:min-h-[calc(100vh-107px)] bg-white md:bg-white md:h-cover md:sticky top-[90px] overflow-y-auto z-[150] md:border-gray-light md:border-r absolute max-md:top-[33px] max-md:px-16 max-md:-ml-7 duration-500 sidebar" +
              (!showSideNav
                ? " max-md:opacity-0 max-md:pointer-events-none"
                : "")
            }
          >
            <Link
              className="flex items-center gap-2 text-gray hover:bg-red hover:text-white p-2 rounded w-full"
              to="/"
              onClick={() => setShowSideNav(false)}
            >
              <FaHome size={24} />
              <span>Home</span>
            </Link>
            {/* <Link
              className="flex items-center  gap-2 text-gray hover:bg-red hover:text-white p-2 rounded w-full"
              to="/profile"
              onClick={() => setShowSideNav(false)}
            >
              <FaUser size={24} />
              <span>Profile</span>
            </Link>
            <Link
              className="flex items-center gap-2 text-gray hover:bg-red hover:text-white p-2 rounded w-full"
              to="/settings"
              onClick={() => setShowSideNav(false)}
            >
              <FaCog size={24} />
              <span>Settings</span>
            </Link> */}
            <hr className="text-gray w-full py-2 mt-3" />
            {user?.role === "admin" && (
              <Link
                className="flex items-center gap-2 text-gray hover:bg-red hover:text-white p-2 rounded w-full"
                to="/dashboard/all-ads"
                onClick={() => setShowSideNav(false)}
              >
                <RiAdvertisementLine size={25} />
                <span>Ads</span>
              </Link>
            )}
            <Link
              className="flex items-center gap-2 text-gray hover:bg-red hover:text-white p-2 rounded w-full"
              to="/dashboard/create-news"
              onClick={() => setShowSideNav(false)}
            >
              <IoNewspaper size={25} />
              <span>Create News</span>
            </Link>
            {user?.role === "admin" && (
              <Link
                className="flex items-center gap-2 text-gray hover:bg-red hover:text-white p-2 rounded w-full"
                to="/dashboard/create-videos"
                onClick={() => setShowSideNav(false)}
              >
                <TbVideoPlus size={25} />
                <span>Create YtVideo</span>
              </Link>
            )}
            <Link
              className="flex items-center gap-2 text-gray hover:bg-red hover:text-white p-2 rounded w-full"
              to="/dashboard/all-news-data"
              onClick={() => setShowSideNav(false)}
            >
              <MdNewspaper size={25} />
              <span>All-News</span>
            </Link>
            {user?.role === "admin" && (
              <Link
                className="flex items-center gap-2 text-gray hover:bg-red hover:text-white p-2 rounded w-full"
                to="/dashboard/all-videos-data"
                onClick={() => setShowSideNav(false)}
              >
                <MdOutlineVideoSettings size={25} />
                <span>All-Videos</span>
              </Link>
            )}
          </div>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default SideBar;
