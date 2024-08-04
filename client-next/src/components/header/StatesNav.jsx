import { findDistrict, findHindi } from "@/assets/data";
import React from "react";

const StatesNav = ({ params: state }) => {
  const navItems = findDistrict(state);
  return (
    <div className="bg-[#262626] flex">
      <p
        className="p-3 flex items-center justify-center text-white bg-blue min-w-fit"
        style={{
          clipPath: "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%, 0% 50%)",
        }}
      >
        <span className="text-2xl mt-2"></span>
        {findHindi(state)}
      </p>
      <div className="flex gap-x-5 overflow-x-auto no-scrollbar">
        {navItems.map((item, index) => (
          <link
            key={index}
            href={`/state/${state}/${item.english}`}
            className="p-3 text-white mt-1 flex items-center justify-center"
          >
            {item.hindi}
          </link>
        ))}
      </div>
    </div>
  );
};

export default StatesNav;
