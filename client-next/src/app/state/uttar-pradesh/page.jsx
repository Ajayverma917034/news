import { findDistrict } from "@/assets/data";
import NewsSection from "@/components/news-section/news.section.component";
import SideNews from "@/components/side-news/SideNews";
import DistrictNav from "@/components/state-section/DistrictNav";
import StateNav from "@/components/state-section/StateNav";
import { CollectionNewsSkeleton } from "@/skeleton/HomeSkeleton";
import React from "react";


const page = async() => {
//   const router = useRouter();

//   const handleNavigate = (state) => {
//     if (state === "uttar pradesh") {
//       router.push("/state/uttar-pradesh");
//     } else {
//       router.push(`/state/${state}`);
//     }
//   };
    const response  = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/fetch-state-news`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify({
            state: "uttar pradesh",
        }),
    });

    const data = await response.json();
    const news = data.data
    const dataSequence = data.dataSequence

    const navItems = findDistrict('uttar pradesh');

  return (
    <>
      {/* <MetaDataSection title={"All State News"} /> */}
      <div className="flex spacing mt-8 flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto gap-5 w-full">
          <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden">
            {/* Navbar for the states */}
            <DistrictNav state={'uttar pradesh'} navItems={navItems}   />
            <NewsSection data={news && news[0]} title={dataSequence?.state} />
            {news &&
              news.length > 1 &&
              news.slice(1).map((news, index) => {
                // console.log(news)
                return (
                  <NewsSection
                    data={news}
                    title={dataSequence?.districts[index]}
                    key={index}
                  />
                );
              })}
          </div>

          {/* Right advertisement section */}
          <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2 ">
            {/* <CustomeAndGoogleAdd /> */}
            <SideNews title="read also" />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
