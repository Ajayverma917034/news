"use client";
import React from "react";
import { useEffect, useState } from "react";
import Heading from "@/lib/Heading";
import PageContent from "@/components/single-page/PageContent";
import CustomeAndGoogleAdd1 from "@/components/ads/CustomeAndGoogleAdd1";
import CustomeAndGoogleAdd from "@/components/ads/CustomeAndGoogleAdd";
// import {
//   SquareAds1,
//   SquareAds2,
//   SquareAds3,
//   SquareAds4,
//   SquareAds5,
//   SquareAds6,
//   SquareAds7,
//   SquareAds8,
//   SquareAds9,
//   SquareAds10,
// } from "../../../../components/SquareAds";

// import {
//   HorizontalAds1,
//   HorizontalAds2,
//   HorizontalAds3,
//   HorizontalAds4,
//   HorizontalAds5,
//   HorizontalAds6,
//   HorizontalAds7,
//   HorizontalAds8,
//   HorizontalAds9,
//   HorizontalAds10,
// } from "../../../../components/HorizontalAds";

const RandomNewsScroll = ({ initialNewsId }) => {
  const [randomNews, setRandomNews] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isBottom, setIsBottom] = useState(false);
  const [page, setPage] = useState(1);
  const [totalFetchedNews, setTotalFetchedNews] = useState(0);

  const MAX_NEWS_COUNT = 9;

  // const adSequence = [
  //   SquareAds1,
  //   SquareAds2,
  //   SquareAds3,
  //   SquareAds4,
  //   SquareAds5,
  //   SquareAds6,
  //   SquareAds7,
  //   SquareAds8,
  //   SquareAds9,
  //   SquareAds10,
  // ];
  // const horizontalAdSequence = [
  //   HorizontalAds1,
  //   HorizontalAds2,
  //   HorizontalAds3,
  //   HorizontalAds4,
  //   HorizontalAds5,
  //   HorizontalAds6,
  //   HorizontalAds7,
  //   HorizontalAds8,
  //   HorizontalAds9,
  //   HorizontalAds10,
  // ];

  const fetchRandomNews = async () => {
    if (totalFetchedNews >= MAX_NEWS_COUNT) {
      setHasMore(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-random-news`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ news_id: initialNewsId, page }),
        }
      );
      const { news } = await response.json();
      if (news) {
        setRandomNews((prevNews) => [...prevNews, news]);
        setTotalFetchedNews((prevCount) => prevCount + 1);
        setIsBottom(false);
        setHasMore(totalFetchedNews + 1 < MAX_NEWS_COUNT);
      }
    } catch (error) {
      console.error("Failed to fetch random news:", error);
    }
  };

  useEffect(() => {
    if (isBottom) fetchRandomNews();
  }, [page]);

  useEffect(() => {
    let isFetching = false;

    const getScrollOffset = () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        return 3000;
      } else if (
        window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches
      ) {
        return 1500;
      } else {
        return 1500;
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const scrollOffset = getScrollOffset();

      if (
        scrollTop >= documentHeight - windowHeight - scrollOffset &&
        !isBottom &&
        !isFetching &&
        hasMore
      ) {
        setIsBottom(true);
        isFetching = true;
        fetchRandomNews().finally(() => {
          isFetching = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isBottom, hasMore]);

  return (
    <div className="w-full">
      {randomNews.length > 0 && (
        <div className="">
          {randomNews.map((item, index) => (
            <div key={index} className="mt-5">
              <Heading title="और भी पढ़े" />
              <PageContent item={item} />
              <div>
                <div className="flex w-full"></div>
                <div className="flex gap-y-4 gap-x-5 items-center justify-center max-lg:flex-col">
                  <>
                    <div className="flex bg-[#f0f0f0] justify-center flex-col !h-full uppercase">
                      <p className="text-[16px] md:text-[18px] lg:text-[18px] text-center">
                        Advertisement
                      </p>
                      {/* {React.createElement(
                        adSequence[index % adSequence.length]
                      )} */}
                    </div>
                    <CustomeAndGoogleAdd />
                  </>
                </div>

                <div className="flex bg-[#f0f0f0] flex-col h-[180px] md:h-[200px] w-full mt-2">
                  <p className="text-[16px] md:text-[18px] lg:text-[18px] text-center uppercase">
                    Advertisement
                  </p>
                  {/* {React.createElement(
                    horizontalAdSequence[index % horizontalAdSequence.length]
                  )} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RandomNewsScroll;
