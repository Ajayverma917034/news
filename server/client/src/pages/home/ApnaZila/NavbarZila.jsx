import React, { useState, useEffect, useRef } from "react";
import PaginationZila from "./PaginationZila";
import { findHindi } from "../../../assets/data";

// const NavbarZila = ({
//   districts,
//   currentDistrictIndex,
//   setCurrentDistrictIndex,
// }) => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [hovered, setHovered] = useState(false);
//   const [visibleDistricts, setVisibleDistricts] = useState(6);
//   const dropdownRef = useRef(null);

//   const updateVisibleDistricts = () => {
//     const width = window.innerWidth;
//     if (width < 400) {
//       setVisibleDistricts(2);
//     } else if (width < 640) {
//       setVisibleDistricts(3);
//     } else if (width < 768) {
//       setVisibleDistricts(4);
//     } else if (width < 1024) {
//       setVisibleDistricts(5);
//     } else {
//       setVisibleDistricts(9);
//     }
//   };

//   const handleMouseEnter = () => setHovered(true);
//   const handleMouseLeave = (event) => {
//     if (!dropdownRef.current.contains(event.relatedTarget)) {
//       setHovered(false);
//     }
//   };

//   useEffect(() => {
//     updateVisibleDistricts();
//     window.addEventListener("resize", updateVisibleDistricts);
//     return () => window.removeEventListener("resize", updateVisibleDistricts);
//   }, []);

//   return (
//     <nav className="px-0 md:px-3 flex justify-between items-center pt-1 bg-[#1f2024] border-b-2 border-[#36373a]">
//       <div className="flex space-x-2 md:space-x-4 items-center relative">
//         {districts.slice(0, visibleDistricts).map((district, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentDistrictIndex(index)}
//             className={`text-white text-base md:text-xl hover:underline decoration-red ${
//               currentDistrictIndex === index ? " !text-red" : ""
//             }`}
//           >
//             {findHindi(district)}
//           </button>
//         ))}
//         {districts.length > visibleDistricts && (
//           <div
//             className="relative"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             <button className="text-white text-center mb-2 text-[25px]">
//               ...
//             </button>
//             {hovered && (
//               <div
//                 className="absolute bg-[#1f2024] top-[50%] right-[-50px] p-1 w-28 border border-white px-2 rounded shadow-lg mt-2 py-2"
//                 onMouseEnter={handleMouseEnter}
//                 onMouseLeave={handleMouseLeave}
//                 ref={dropdownRef}
//               >
//                 {districts.slice(visibleDistricts).map((district, index) => (
//                   <button
//                     key={index}
//                     onClick={() => {
//                       setCurrentDistrictIndex(visibleDistricts + index);
//                       setHovered(false);
//                     }}
//                     className={`text-white block text-base md:text-xl w-full mt-1 hover:underline decoration-red ${
//                       currentDistrictIndex === index + visibleDistricts
//                         ? "!text-red"
//                         : ""
//                     }`}
//                   >
//                     {findHindi(district)}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//       <div>
//         <PaginationZila
//           {...{
//             currentDistrictIndex,
//             setCurrentDistrictIndex,
//           }}
//         />
//       </div>
//     </nav>
//   );
// };

// export default NavbarZila;

// import React, { useState, useEffect } from "react";
// import PaginationZila from "./PaginationZila";
// import { findHindi } from "../../../assets/data";

const NavbarZila = ({
  districts,
  currentDistrictIndex,
  setCurrentDistrictIndex,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [visibleDistricts, setVisibleDistricts] = useState(6);

  const updateVisibleDistricts = () => {
    const width = window.innerWidth;
    if (width < 331) {
      setVisibleDistricts(3);
    } else if (width < 400) {
      setVisibleDistricts(4);
    } else if (width < 640) {
      setVisibleDistricts(5);
    } else if (width < 768) {
      setVisibleDistricts(6);
    } else if (width < 1024) {
      setVisibleDistricts(7);
    } else {
      setVisibleDistricts(8);
    }
  };

  useEffect(() => {
    updateVisibleDistricts();
    window.addEventListener("resize", updateVisibleDistricts);
    return () => window.removeEventListener("resize", updateVisibleDistricts);
  }, []);

  return (
    <nav className="px-0 md:px-3 flex justify-between items-center pt-1 bg-[#1f2024] border-b-2 border-[#36373a]">
      <div className="flex space-x-2 md:space-x-4 items-center relative">
        {districts.slice(0, visibleDistricts).map((district, index) => (
          <button
            key={index}
            onClick={() => setCurrentDistrictIndex(index)}
            className={`text-white text-xl md:text-xl hover:underline decoration-red ${
              currentDistrictIndex === index ? " !text-red" : ""
            }`}
          >
            {findHindi(district)}
          </button>
        ))}
        {districts.length > visibleDistricts && (
          <div
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <button className="text-white text-center mb-2 text-[25px]">
              ...
            </button>
            {hovered && (
              <div className="absolute bg-[#1f2024] z-10 top-[80%] right-[-50px] p-1 w-28 border border-white px-2 rounded shadow-lg mt-2 py-2">
                {districts.slice(visibleDistricts).map((district, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentDistrictIndex(visibleDistricts + index);
                      setHovered(false);
                    }}
                    className={`text-white block text-xl md:text-xl w-full mt-1 hover:underline decoration-red ${
                      currentDistrictIndex === index + visibleDistricts
                        ? "!text-red"
                        : ""
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
        <PaginationZila
          {...{
            currentDistrictIndex,
            setCurrentDistrictIndex,
          }}
        />
      </div>
    </nav>
  );
};

export default NavbarZila;
