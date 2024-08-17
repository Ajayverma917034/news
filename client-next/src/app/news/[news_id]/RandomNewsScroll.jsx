"use client";

import { useEffect, useState } from "react";
import Heading from "@/lib/Heading";
import PageContent from "@/components/single-page/PageContent";
import CustomeAndGoogleAdd1 from "@/components/ads/CustomeAndGoogleAdd1";

const RandomNewsScroll = ({ initialNewsId }) => {
  const [randomNews, setRandomNews] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isBottom, setIsBottom] = useState(false);
  const [page, setPage] = useState(1);

  const fetchRandomNews = async () => {
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
      setRandomNews((prevNews) => [...prevNews, news]);
      setIsBottom(false);
      if (news) {
        setHasMore(true);
      }
    } catch (error) {
      console.error("Failed to fetch random news:", error);
    }
  };

  useEffect(() => {
    fetchRandomNews();
  }, [page]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     console.log("scrolling");
  //     if (
  //       window.innerHeight + window.scrollY >=
  //       document.body.offsetHeight - 8000
  //     ) {
  //       if (hasMore) {
  //         setPage((prevPage) => prevPage + 1);
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [hasMore, fetchRandomNews]);

  useEffect(() => {
    let isFetching = false;

    const getScrollOffset = () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        // Mobile screens
        return 3000;
      } else if (
        window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches
      ) {
        // Tablet screens
        return 1500;
      } else {
        // Desktop screens
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
        !isFetching
      ) {
        setIsBottom(true);
        isFetching = true;
        fetchRandomNews().finally(() => {
          isFetching = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isBottom]);

  return (
    <div className="w-full">
      {randomNews.length > 0 && (
        <div className="">
          {randomNews.map((item, index) => (
            <div key={index} className="mt-5">
              <Heading title="और भी पढ़े" />
              <PageContent item={item} />
              <div>
                <CustomeAndGoogleAdd1 />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RandomNewsScroll;
