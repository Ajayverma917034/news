"use client";
import React from "react";
import NewsSection from "./news.section.component";
import NewsVideo from "../news-video/news.video.section.component";
// import CustomeAndGoogleAdd from "../pages/advertisement/CustomeAndGoogleAdd";
import SideNews from "../side-news/SideNews";
import { YtCollectionSkeleton } from "@/skeleton/HomeSkeleton";

const HomeRightBar = ({ data, ytData }) => {
  return (
    <>
      <div className="flex spacing mt-2 ">
        <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full gap-5 ">
          <div className="flex flex-col flex-wrap  md:col-span-4 overflow-hidden">
            <NewsSection data={data[0]?.data} title={data[0]?.title} />
            {ytData ? (
              <NewsVideo data={ytData} title="टॉप वीडियो" />
            ) : (
              <YtCollectionSkeleton />
            )}
          </div>
          <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2">
            {/* <CustomeAndGoogleAdd index={0} /> */}
            {/* <SideNews title={"read also"} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeRightBar;
