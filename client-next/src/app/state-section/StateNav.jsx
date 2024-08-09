"use client";
import { stateDistricts, findHindi } from '@/assets/data';
import Link from 'next/link';

const StateNav = () => {
  const filteredStates = Object.keys(stateDistricts);

  return (
    <div className="bg-[#262626] flex h-fit w-full">
      <p
        className="p-3 flex items-center justify-center text-white bg-blue min-w-fit"
        style={{
          clipPath:
            "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%, 0% 50%)",
        }}
      >
        {findHindi("state")}
      </p>
      <div className="flex gap-x-5 overflow-x-auto no-scrollbar">
        {filteredStates.map((item, index) => (
          <Link 
            key={index} 
            href={item === "uttar pradesh" ? "/state/uttar-pradesh" : `/state/${item}`}
          >
            <p className="p-3 text-white mt-1 flex items-center justify-center min-w-fit">
              {findHindi(item)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StateNav;
