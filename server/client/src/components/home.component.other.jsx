import React from "react";
import NewsSection from "./common/news-section/news.section.component";
import CustomeAndGoogleAdd from "../pages/advertisement/CustomeAndGoogleAdd";
import SideNews from "../pages/advertisement/related-news/SideNews";

const HomeRightBarOther = ({ data }) => {
  return (
    <>
      {data.length > 0 && (
        <div className="flex spacing mt-2 sm:mt-8 ">
          <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto gap-5">
            {/* <StatesNav /> */}
            <div className="flex flex-col flex-wrap  md:col-span-4 overflow-hidden">
              {data &&
                data.map((news, index) => {
                  return (
                    <NewsSection
                      data={news.data}
                      title={news.title}
                      key={index}
                    />
                  );
                })}
              {/* <NewsSection data={data[1]?.data} title={data[1]?.title} /> */}
            </div>
            <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2 mt-10">
              <CustomeAndGoogleAdd />
              <SideNews title="education" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeRightBarOther;
