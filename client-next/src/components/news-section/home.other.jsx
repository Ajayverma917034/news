"use client";
import React from "react";
import NewsSection from "./news.section.component";
// import CustomeAndGoogleAdd from "../pages/advertisement/CustomeAndGoogleAdd";
import SideNews from "../side-news/SubNewsCard";

const HomeRightBarOther = ({ data }) => {
  return (
    <>
      {data && data.data && data.data.length > 0 && (
        <div className="flex spacing mt-2 sm:mt-8 ">
          <div className="grid grid-cols-1 lg:grid-cols-6 w-full mx-auto gap-5">
            {/* <StatesNav /> */}
            <div className="flex flex-col flex-wrap  md:col-span-4 overflow-hidden">
              {data.data.data &&
                data.map((news, index) => {
                  return (
                    <NewsSection
                      data={news.data}
                      title={news.title}
                      key={index}
                    />
                  );
                })}
            </div>
            <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2 ">
              {/* <CustomeAndGoogleAdd index={2} /> */}
              <SideNews title="education" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeRightBarOther;
