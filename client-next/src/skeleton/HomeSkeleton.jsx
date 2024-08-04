import React from "react";

// const HomeSkeleton = () => {
//   return (
//     <div className="hidden md:block">
//       {/* slider  */}
//       <div className="spacing">
//         <div className="h-[300px] w-full bg-[#dddbdd] py-8 animate-pulse"></div>
//       </div>
//       <div className="h-[30px] w-full bg-[#dddbdd] animate-pulse my-8"></div>
//       {/* home page  */}
//       <div className="grid grid-cols-7">
//         {/* left part  */}
//         <div className="spacing  col-span-5">
//           <div className="flex gap-5">
//             <div className="w-[300px] h-[300px] bg-[#dddbdd]"></div>
//             <div className=" w-[400px] h-[300px] gap-4">
//               <div className="h-[25px] bg-[#dddbdd] animate-pulse mb-8 mt-2"></div>
//               <div className="h-[25px] bg-[#dddbdd] animate-pulse my-8"></div>
//               <div className="h-[25px] bg-[#dddbdd] animate-pulse my-8"></div>
//               <div className="h-[25px] bg-[#dddbdd] animate-pulse my-8"></div>
//               <div className="h-[25px] bg-[#dddbdd] animate-pulse my-8"></div>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4 mt-8">
//             <div className="h-[90px] w-full bg-[#dddbdd] animate-pulse col-span-1 rounded-lg"></div>
//             <div className="h-[90px] bg-[#dddbdd] animate-pulse col-span-1 rounded-lg"></div>
//           </div>
//           <div className="grid grid-cols-2 gap-4 mt-8">
//             <div className="h-[90px] w-full bg-[#dddbdd] animate-pulse col-span-1 rounded-lg"></div>
//             <div className="h-[90px] bg-[#dddbdd] animate-pulse col-span-1 rounded-lg"></div>
//           </div>
//           <div className="mt-8">
//             <div className="h-[110px] w-full bg-[#dddbdd] animate-pulse col-span-1 rounded-lg"></div>
//           </div>
//         </div>
//         {/* right part  */}
//         <div className=" col-span-2 flex flex-col gap-8">
//           <div className="h-[250px] w-[250px] bg-[#dddbdd] animate-pulse "></div>
//           <div className="h-[250px] w-[250px] bg-[#dddbdd] animate-pulse "></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeSkeleton;

export const AdvertisementSkelton1 = () => {
  <div className="h-[300px] w-full bg-[#dddbdd] py-8 animate-pulse"></div>;
};

export const TrendingNewsSkeleton = () => {
  return <div className="h-[30px] w-full bg-[#dddbdd] animate-pulse"></div>;
};

export const CollectionNewsSkeleton = () => {
  return (
    <div className="w-full">
      <div className="h-[25px] bg-[#dddbdd] animate-pulse my-5"></div>
      <div className="flex md:flex-row flex-col justify-between w-full ">
        <div className="md:w-[50%] w-full h-[15rem] bg-[#dddbdd] animate-pulse"></div>
        <div className="md:w-[45%] w-full ">
          <div className="h-[25px] bg-[#dddbdd] animate-pulse my-3"></div>
          <div className="h-[25px] bg-[#dddbdd] animate-pulse my-3"></div>
          <div className="h-[25px] bg-[#dddbdd] animate-pulse my-3"></div>
          <div className="flex items-center"></div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-2">
        {[1, 1, 1, 1].map((card, index) => (
          <div
            key={index}
            className=" grid grid-cols-3 max-md:gap-x-4 rounded-lg shadow-md p-2 "
          >
            <div className="col-span-1 h-[90px]">
              <div className="h-[90px] w-full bg-[#dddbdd] animate-pulse col-span-1 rounded-lg"></div>
            </div>
            <div className="md:ml-4 col-span-2 ">
              <div className="h-[25px] bg-[#dddbdd] animate-pulse my-2"></div>
              <div className="h-[25px] bg-[#dddbdd] animate-pulse my-3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const VideoCardSkeleton = () => {
  return (
    <>
      <div className="w-full flex flex-col max-md:flex-row max-md:gap-5 max-md:grid max-md:grid-cols-5">
        <div className="max-w-[17rem] h-24 md:h-[10rem] bg-[#dddbdd] animate-pulse rounded-md col-span-2 relative"></div>
        <div className="h-[25px] bg-[#dddbdd] animate-pulse my-2"></div>
        <div className="h-[25px] bg-[#dddbdd] animate-pulse my-2"></div>
      </div>
    </>
  );
};
export const YtCollectionSkeleton = () => {
  return (
    <>
      <div className="h-[30px] bg-[#dddbdd] animate-pulse mt-10"></div>

      <div className="flex md:flex-row flex-col justify-between w-full mt-5">
        <div className="md:w-[50%] h-[15rem] bg-[#dddbdd] animate-pulse w-fullrelative"></div>
        <div className="md:w-[45%] w-full ">
          <div className="h-[25px] bg-[#dddbdd] animate-pulse my-3"></div>
          <div className="h-[25px] bg-[#dddbdd] animate-pulse my-3"></div>
          <div className="h-[25px] bg-[#dddbdd] animate-pulse my-3"></div>
        </div>
      </div>

      <div className="flex flex-col mt-10">
        {
          <div className="flex gap-5 flex-col md:flex-row justify-between">
            {[1, 1, 1].map((item, index) => (
              <VideoCardSkeleton key={index}/>
            ))}
          </div>
        }
      </div>
    </>
  );
};
