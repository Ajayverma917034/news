// app/[postId]/RandomNewsScroll.js
"use client";

import { useEffect, useState } from "react";
import Heading from "@/lib/Heading";
import PageContent from "@/components/single-page/PageContent";

const RandomNewsScroll = ({ initialNewsId }) => {
  const [randomNews, setRandomNews] = useState([]);
  const [hasMore, setHasMore] = useState(true);
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

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        if (hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, fetchRandomNews]);

  return (
    <div className="w-full">
      {randomNews.length > 0 && (
        <div className="">
          {randomNews.map((item, index) => (
            <div key={index} className="mt-10">
              <Heading title="और भी पढ़े" />
              <PageContent item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RandomNewsScroll;
