import React from "react";
import BlogContent from "./BlogContent";
import InArticalAds from "../../../components/InArticalAds";
import CustomeAndGoogleAdd from "../ads/CustomeAndGoogleAdd";

const NewsContent = ({ item }) => {
  const totalLength = item.content[0].blocks.length;
  return item?.title?.length ? (
    <div className="py-2 w-full">
      {item &&
        item.content &&
        item.content.length &&
        item.content[0].blocks &&
        item.content[0].blocks.length &&
        item.content[0].blocks.map((block, i) => {
          // Calculate the midpoint
          const midpoint = Math.floor(item.content[0].blocks.length / 2);

          return (
            <div key={i}>
              {/* Render the content block */}
              <div className="my-4 md:my-4">
                <BlogContent block={block} />
              </div>

              {/* Insert an ad at the midpoint */}
              {i === Math.floor(totalLength / 2) && (
                <div className="flex flex-col w-full min-h-[10rem] bg-[#f0f0f0] bg-opacity-50 mb-1">
                  <p className="text-center">Advertisement</p>
                  <InArticalAds />
                  <CustomeAndGoogleAdd />
                </div>
              )}
            </div>
          );
        })}
    </div>
  ) : (
    <></>
  );
};

export default NewsContent;
