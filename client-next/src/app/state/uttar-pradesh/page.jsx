import { findDistrict } from "@/assets/data";
// import CustomeAndGoogleAdd from "@/components/ads/CustomeAndGoogleAdd";
import NewsSection from "@/components/news-section/news.section.component";
// import SideNews from "@/components/side-news/SideNews";
import DistrictNav from "@/components/state-section/DistrictNav";
import StateNav from "@/components/state-section/StateNav";
import { CollectionNewsSkeleton } from "@/skeleton/HomeSkeleton";
import React from "react";

export const metadata = {
  title: "Uttar Pradesh News",
  description:
    "Latest News (लेटेस्ट खबरें), Breaking News (ब्रेकिंग न्यूज़), UP News (यूपी समाचार), Uttar Pradesh (उत्तर प्रदेश), State News (राज्य समाचार)",
  keywords:
    "janpad, janpad news, janpad news live, up, uttar pradesh, state, state news, breaking, top news, UP News",
  author: "Janpad News Team",
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://notemyword.online"),
  openGraph: {
    type: "article",
    url: "https://notemyword.online",
    title: "Uttar Pradesh News - Janpad News Live",
    description:
      "Latest News (लेटेस्ट खबरें), Breaking News (ब्रेकिंग न्यूज़), UP News (यूपी समाचार), Uttar Pradesh (उत्तर प्रदेश), State News (राज्य समाचार)",
    images: [
      {
        url: "../assets/janpad_news_live.png",
        width: 800,
        height: 600,
        alt: "Janpad News Live - UP News",
      },
    ],
  },
  alternates: {
    canonical: "https://notemyword.online",
  },
};

const page = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/fetch-state-news`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify({
        state: "uttar pradesh",
      }),
    }
  );

  const data = await response.json();
  const news = data.data;
  const dataSequence = data.dataSequence;

  const navItems = findDistrict("uttar pradesh");

  return (
    <>
      {/* <MetaDataSection title={"All State News"} /> */}
      <div className="flex spacing mt-8 flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto gap-5 w-full">
          <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden">
            {/* Navbar for the states */}
            <DistrictNav state={"uttar pradesh"} navItems={navItems} />
            <NewsSection
              data={news && news[0]}
              title={dataSequence?.state}
              adInd={0}
            />
            {news &&
              news.length > 1 &&
              news.slice(1).map((news, index) => {
                // console.log(news)
                return (
                  <NewsSection
                    adInd={1 + index}
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
            {/* <SideNews title="read also" /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
