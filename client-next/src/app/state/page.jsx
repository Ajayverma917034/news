import React from "react";
import { findHindi, stateDistricts } from "@/assets/data";
import NewsSection from "@/components/news-section/news.section.component";
import { CollectionNewsSkeleton } from "@/skeleton/HomeSkeleton";
import StateNav from "@/components/state-section/StateNav";
import CustomeAndGoogleAdd from "@/components/ads/CustomeAndGoogleAdd";
export const metadata = {
  title: "State News",
  description:
    "Latest News (लेटेस्ट खबरें), Breaking News (ब्रेकिंग न्यूज़), State News (राज्य समाचार), World (विश्व), Sports (खेल), Business, Entertainment (मनोरंजन), State News (राज्य समाचार)",
  keywords:
    "janpad, janpad news, janpad news live, up, uttar pradesh, bihar, jharkhand, uttarakhand, madhya pradesh, chhattisgarh, delhi, up, state, state news, india, top news",
  author: "Janpad News Team",
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://notemyword.online"),
  openGraph: {
    type: "article",
    url: "https://notemyword.online",
    title: "Janpad News Live",
    description:
      "Latest News (लेटेस्ट खबरें), Breaking News (ब्रेकिंग न्यूज़), State News (राज्य समाचार), World (विश्व), Sports (खेल), Business, Entertainment (मनोरंजन), State News (राज्य समाचार)",
    images: [
      {
        url: "../assets/janpad_news_live.png",
        width: 800,
        height: 600,
        alt: "Janpad News Live",
      },
    ],
  },
  alternates: {
    canonical: "https://notemyword.online",
  },
};
const StateNewsUnknown = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/fetch-all-state-news`
  );

  const { data: news } = await response.json();

  return (
    <>
      <div className="flex spacing mt-4 md:mt-8 flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto gap-5 w-full">
          <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden">
            <StateNav />

            {news ? (
              news
                .slice(0, 2)
                .map((newsItem, index) => (
                  <NewsSection
                    data={newsItem.data}
                    title={newsItem.state}
                    key={index}
                    adInd={0 + index}
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
          <div className="flex flex-col md:gap-y-10 gap-y-2 md:col-span-2 ">
            <CustomeAndGoogleAdd />
            {/* <SideNews title="read also" /> */}
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
                  adInd={2 + index}
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
                  adInd={4 + index}
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
