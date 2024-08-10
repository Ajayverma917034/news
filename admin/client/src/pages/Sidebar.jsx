import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { TbVideoPlus } from "react-icons/tb";
import { MdNewspaper } from "react-icons/md";
import { IoNewspaper } from "react-icons/io5";
import { MdOutlineVideoSettings } from "react-icons/md";
import { FaHome, FaUser, FaCog, FaBars } from "react-icons/fa";
import { RiAdvertisementLine } from "react-icons/ri";
import { lookInSession } from "../common/session";
import { FaUsersCog } from "react-icons/fa";
import { PiNewspaper } from "react-icons/pi";
import { RiDraftLine } from "react-icons/ri";
import { MdAutoGraph } from "react-icons/md";
import { GiNewspaper } from "react-icons/gi";

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
            className="fixed inset-0 bg-black bg-opacity-50 z-[147]"
            onClick={() => setShowSideNav(false)}
          ></div>
        )}

        <div className="sticky top-[48px] z-[150] md:top-[64px] lg:top-[80px] xl:top-[112px]">
          <div className="relative md:hidden bg-white py-1 border-b border-grey flex flex-nowrap overflow-x-auto pl-5">
            <button
              className="p-1 capitalize sidebar-toggle"
              onClick={() => setShowSideNav(!showSideNav)}
            >
              <FaBars size={20} />
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
              "min-w-[200px] pt-3 px-5 min-h-[calc(100vh-85px)] max-md:pb-4  bg-white md:bg-white md:h-cover md:sticky overflow-y-auto z-[150] md:border-gray-light md:border-r absolute max-md:top-[37px] max-md:px-16 max-md:-ml-7 duration-500 sidebar md:min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-80px)]" +
              (!showSideNav
                ? " max-md:opacity-0 max-md:pointer-events-none"
                : "")
            }
          >
            <NavLink
              className="flex items-center gap-2 text-gray hover:bg-blue mt-1 hover:text-white p-2 rounded w-full sidebar-link"
              to="/"
              onClick={() => setShowSideNav(false)}
            >
              <FaHome size={24} />
              <span>Home</span>
            </NavLink>
            {/* <NavLink
              className="flex items-center  gap-2 text-gray hover:bg-red hover:text-white p-2 rounded w-full"
              to="/profile"
              onClick={() => setShowSideNav(false)}
            >
              <FaUser size={24} />
              <span>Profile</span>
            </NavLink>
            <NavLink
              className="flex items-center gap-2 text-gray hover:bg-red hover:text-white p-2 rounded w-full"
              to="/settings"
              onClick={() => setShowSideNav(false)}
            >
              <FaCog size={24} />
              <span>Settings</span>
            </NavLink> */}
            <hr className="text-gray w-full mt-1" />
            {/* {user?.role === "admin" && (
              <NavLink
                className="flex items-center gap-2 text-gray hover:bg-red hover:text-white p-2 rounded w-full"
                to="/dashboard/all-ads"
                onClick={() => setShowSideNav(false)}
              >
                <RiAdvertisementLine size={25} />
                <span>Ads</span>
              </NavLink>
            )} */}
            {user?.role === "admin" && (
              <NavLink
                className="flex items-center gap-2 text-gray hover:bg-blue mt-1 hover:text-white p-2 rounded w-full sidebar-link"
                to="/dashboard/all-ads"
                onClick={() => setShowSideNav(false)}
              >
                <RiAdvertisementLine size={25} />
                <span>Ads</span>
              </NavLink>
            )}
            {/* {user?.role === "reporter" && ( */}
            <NavLink
              className="flex items-center gap-2 text-gray hover:bg-blue mt-1 hover:text-white p-2 rounded w-full sidebar-link"
              to="/dashboard/create-news"
              onClick={() => setShowSideNav(false)}
            >
              <IoNewspaper size={25} />
              <span>Create News</span>
            </NavLink>
            {/* )} */}
            {user?.role === "admin" && (
              <NavLink
                className="flex items-center gap-2 text-gray hover:bg-blue mt-1 hover:text-white p-2 rounded w-full sidebar-link"
                to="/dashboard/create-videos"
                onClick={() => setShowSideNav(false)}
              >
                <TbVideoPlus size={25} />
                <span>Create YtVideo</span>
              </NavLink>
            )}
            {user?.role === "admin" && (
              <NavLink
                className="flex items-center gap-2 text-gray hover:bg-blue mt-1 hover:text-white p-2 rounded w-full sidebar-link"
                to="/dashboard/breaking-news"
                onClick={() => setShowSideNav(false)}
              >
                <PiNewspaper size={25} />
                <span>Breaking News</span>
              </NavLink>
            )}
            <hr className="text-gray w-full mt-1" />

            {user?.role === "reporter" && (
              <NavLink
                className="flex items-center gap-2 text-gray hover:bg-blue mt-1 hover:text-white p-2 rounded w-full sidebar-link"
                to="/dashboard/all-news"
                onClick={() => setShowSideNav(false)}
              >
                <MdNewspaper size={25} />
                <span>All News</span>
              </NavLink>
            )}
            {user?.role === "admin" && (
              <NavLink
                className="flex items-center gap-2 text-gray hover:bg-blue mt-1 hover:text-white p-2 rounded w-full sidebar-link"
                to="/dashboard/all-admin-news-data"
                onClick={() => setShowSideNav(false)}
              >
                <GiNewspaper size={25} />
                <span>All News</span>
              </NavLink>
            )}
            <NavLink
              className="flex items-center gap-2 text-gray hover:bg-blue mt-1 hover:text-white p-2 rounded w-full sidebar-link"
              to="/dashboard/draft-news"
              onClick={() => setShowSideNav(false)}
            >
              <RiDraftLine size={25} />
              <span>Draft News</span>
            </NavLink>
            {user?.role === "admin" && (
              <NavLink
                className="flex items-center gap-2 text-gray hover:bg-blue hover:text-white mt-1 p-2 rounded w-full sidebar-link"
                to="/dashboard/all-videos-data"
                onClick={() => setShowSideNav(false)}
              >
                <MdOutlineVideoSettings size={25} />
                <span>All Videos</span>
              </NavLink>
            )}
            {user?.role === "admin" && (
              <NavLink
                className="flex items-center gap-2 text-gray hover:bg-blue hover:text-white mt-1 p-2 rounded w-full sidebar-link"
                to="/dashboard/all-users"
                onClick={() => setShowSideNav(false)}
              >
                <FaUsersCog size={25} />
                <span>All-Users</span>
              </NavLink>
            )}
            <hr className="text-gray w-full mt-1" />

            {user?.role === "admin" && (
              <NavLink
                className="flex items-center gap-2 text-gray hover:bg-blue hover:text-white mt-1 p-2 rounded w-full sidebar-link"
                to="/dashboard/views-analytics"
                onClick={() => setShowSideNav(false)}
              >
                <MdAutoGraph size={25} />
                <span>Read Analysis</span>
              </NavLink>
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
