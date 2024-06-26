import React from "react";
import img1 from "../../../assets/adsimgright1.png";
import img2 from "../../../assets/adsimgright2.png";
import { CiLocationOn } from "react-icons/ci";
import { formatDate } from "../../../common/date";
import { handleImageError } from "../../../common/errorImg";
import { findHindi } from "../../../assets/data";
import { Link } from "react-router-dom";
import { CollectionNewsSkeleton } from "../../../skeleton/HomeSkeleton";

// const data = [
//   {
//     id: 1,
//     title: "Sonbhadra News: बालू साइट पर ट्रक से दबकर सभासद पति की मौत",
//     description:
//       "घनश्याम पांडेय/रविंद्र पाठक (सवाददाता) घोरावल। घोरावल। जुगैल थाना क्षेत्र के महत्वपूर्ण बालू साइट पर शनिवार की देर रात्रि में ट्रक पर...",
//     time: "23 hours ago",
//     views: 197,
//     image: img1,
//     type: "main",
//     height: "280px",
//     location: "delhi",
//     createdAt: "2021-08-12T12:00:00.000Z",
//   },
//   {
//     id: 2,
//     title:
//       "Sonbhadra Breaking News: सरिया लदी पिकअप अनियंत्रित होकर पलटी,बाल बाल बचा चालक",
//     time: "1 day ago",
//     image: img2,
//     type: "sub",
//     height: "120px",
//     location: "delhi",
//     createdAt: "2021-08-12T12:00:00.000Z",
//   },
//   {
//     id: 3,
//     title: "Sonbhadra News: भाई ने बताया क्यों बुझेसे ने की सुसाइड",
//     time: "2 days ago",
//     image: img1,
//     type: "sub",
//     height: "120px",
//     location: "delhi",
//     createdAt: "2021-08-12T12:00:00.000Z",
//   },
//   {
//     id: 4,
//     title:
//       "Sonbhadra News: हाथ में त्रिशूल लेकर बाबा का बीच हाइवे पर दिखा हाई वोल्टेज ड्रामा",
//     time: "2 days ago",
//     image: img2,
//     type: "sub",
//     height: "120px",
//     location: "delhi",
//     createdAt: "2021-08-12T12:00:00.000Z",
//   },
//   {
//     id: 5,
//     title:
//       "Sonbhadra News: थाना समाधान दिवस पर 8 प्रार्थना पत्र में एक का हुआ निस्तारण",
//     time: "2 days ago",
//     image: img1,
//     type: "sub",
//     height: "120px",
//     location: "delhi",
//     createdAt: "2021-08-12T12:00:00.000Z",
//   },
// ];

const ZilaNews = ({ data, districts, currentDistrictIndex }) => {
  //   console.log(data);
  return data ? (
    !data.length > 0 ? (
      <div>कोई समाचार उपलब्ध नहीं</div>
    ) : (
      <div className="flex w-full flex-col p- md:p-4 flex-wrap sm:gap-4 ">
        {/* Main Section  */}
        <Link
          to={`/news/${data[0]?.news_id}`}
          className="flex md:flex-row flex-col justify-between w-full "
        >
          <div className="md:w-[50%] w-full h-auto max-h-[16rem]">
            <img
              className="max-h-[16rem]"
              src={data[0]?.banner}
              onError={handleImageError}
            />
          </div>
          <div className="md:w-[45%] w-full flex flex-col justify-center">
            <p className="date-lg text-white">
              {formatDate(data[0]?.createdAt)}
            </p>
            <h1 className="news-title-lg text-white">{data[0]?.title}</h1>
            <div className="flex items-center">
              <CiLocationOn className="location-lg" />
              <p className="location-title-lg text-white pt-1 px-2 capitalize">
                {findHindi(
                  currentDistrictIndex === 0
                    ? data[0]?.location
                    : districts[currentDistrictIndex]
                )}
              </p>
            </div>
          </div>
        </Link>
        <div className="grid md:grid-cols-2 gap-4 ">
          {data &&
            data.slice(1).map((card, index) => {
              return (
                <Link
                  to={`/news/${card?.news_id}`}
                  key={index}
                  className=" grid grid-cols-3 max-md:gap-x-4 rounded-lg shadow-md p-2 "
                >
                  <div className="col-span-1 h-[90px]">
                    <img
                      src={card?.banner}
                      alt="News"
                      className="w-full h-full object-cover "
                      onError={handleImageError}
                    />
                  </div>
                  <div className="md:ml-4 col-span-2 ">
                    <h2 className="text-lg text-white line-clamp-2">
                      {card.title}
                    </h2>
                    <p className="text-gray-500 text-white line-clamp-1">
                      {formatDate(card.createdAt)}
                    </p>
                    <div className="flex items-center">
                      <CiLocationOn className="location-sm mb-1 text-red" />
                      <p className="location-title-sm px-1 capitalize text-white">
                        {findHindi(
                          currentDistrictIndex === 0
                            ? data[0]?.location
                            : districts[currentDistrictIndex]
                        )}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    )
  ) : (
    <CollectionNewsSkeleton />
  );
};

export default ZilaNews;

// <div className="container mx-auto bg-[#1f2024] text-white p-4">
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7">
//     <div className=" md:h-52 w-full">
//       <img
//         src={newsItems[0].image}
//         alt={newsItems[0].title}
//         className="w-full object-cover rounded-md"
//       />
//     </div>
//     <div className="flex flex-col justify-center">
//       <h2 className="news-title-lg font-bold text-white">
//         {newsItems[0].title}
//       </h2>

//       <p className="news-title-sm mt-2">{newsItems[0].title}</p>

//       <div className="flex justify-between text-gray-400 text-sm mt-2">
//         <span>{formatDate(newsItems[0]?.time)}</span>
//         <div className="flex items-center mt-[-5px]">
//           <CiLocationOn className="location-lg" />
//           <p className="location-title-md text-white capitalize pt-1 md:pt-2 px-1 md:px-2">
//             {newsItems[0]?.location} Hello
//           </p>
//         </div>
//       </div>

//       <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
//         Read More
//       </button>
//     </div>
//   </div>

//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     {newsItems &&
//       newsItems.splice(1).map((item) => (
//         <div
//           key={item.id}
//           className={`p-4 bg-gray-700 shadow-lg rounded-lg`}
//         >
//           <div className="flex flex-col md:flex-row">
//             <img
//               src={item.image}
//               alt={item.title}
//               className="w-full md:w-1/3 object-cover rounded-md"
//             />
//             <div className="p-4 flex flex-col justify-between">
//               <h2 className="text-xl font-bold text-white">{item.title}</h2>
//               {item.type === "main" && (
//                 <p className="text-gray-300 mt-2">{item.description}</p>
//               )}
//               <div className="flex justify-between text-gray-400 text-sm mt-2">
//                 <span>{item.time}</span>
//                 {item.views && <span>{item.views} views</span>}
//               </div>
//               {item.type === "main" && (
//                 <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
//                   Read More
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//   </div>
// </div>
