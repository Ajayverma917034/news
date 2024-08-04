import React from "react";
import { findHindi, stateDistricts } from "@/assets/data";
import NewsSection from "@/components/news-section/news.section.component";
import { CollectionNewsSkeleton } from "@/skeleton/HomeSkeleton";
import SideNews from "@/components/side-news/SideNews";
import StateNav from "@/components/state-section/StateNav";

const StateNewsUnknown = async () => {
  //   const router = useRouter();

  //   const handleNavigate = (state) => {
  //     if (state === "uttar pradesh") {
  //       router.push("/state/uttar-pradesh");
  //     } else {
  //       router.push(`/state/${state}`);
  //     }
  //   };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/fetch-all-state-news`
  );

  const { data: news } = await response.json();

  return (
    <>
      {/* <MetaDataSection title={"All State News"} /> */}
      <div className="flex spacing mt-8 flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto gap-5 w-full">
          <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden">
            {/* Navbar for the states */}
            <StateNav />

            {news ? (
              news
                .slice(0, 2)
                .map((newsItem, index) => (
                  <NewsSection
                    data={newsItem.data}
                    title={newsItem.state}
                    key={index}
                  />
                ))
            ) : (
              <>
                <CollectionNewsSkeleton />
                <CollectionNewsSkeleton />
              </>
            )}
          </div>

          {/* Right advertisement section */}
          <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2 ">
            {/* <CustomeAndGoogleAdd /> */}
            <SideNews title="read also" />
          </div>
        </div>

        {news && news.length > 2 && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-6 mx-auto gap-5 ">
            <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden">
              {news.slice(2, 4).map((newsItem, index) => (
                <NewsSection
                  data={newsItem.data}
                  title={newsItem.state}
                  key={index + 2}
                />
              ))}
            </div>

            <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2 mt-10">
              {/* <CustomeAndGoogleAdd /> */}
            </div>
          </div>
        )}

        {news && news.length > 4 && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-6 mx-auto gap-5">
            <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden">
              {news.slice(4).map((newsItem, index) => (
                <NewsSection
                  data={newsItem.data}
                  title={newsItem.state}
                  key={index + 4}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StateNewsUnknown;
