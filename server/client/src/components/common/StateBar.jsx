import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { findHindi } from "../../assets/data";

const StateBar = ({ state, navItems }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleWheel = (event) => {
      if (scrollContainerRef.current) {
        event.preventDefault();
        scrollContainerRef.current.scrollLeft += event.deltaY;
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="bg-[#262626] flex w-full">
      <p
        className="p-3 flex items-center justify-center text-white bg-blue min-w-fit"
        style={{
          clipPath: "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%, 0% 50%)",
        }}
      >
        <span className="text-2xl mt-2"></span>
        {findHindi(state)}
      </p>
      <div
        className="flex gap-x-5 overflow-x-auto no-scrollbar"
        ref={scrollContainerRef}
      >
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={`/state/${state}/${item.english}`}
            className="p-3 text-white mt-1 flex items-center justify-center min-w-fit"
          >
            {item.hindi}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default StateBar;
