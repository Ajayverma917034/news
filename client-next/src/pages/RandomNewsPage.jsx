"use client";
import CustomeAndGoogleAdd2 from "@/components/ads/CustomeAndGoogleAdd2";
import EventPageContent from "@/components/single-page/EventPageContent";
import axios from "axios";
import Heading from "@/lib/Heading";

import React, { useState, useEffect } from "react";
export const newsStructure = {
  title: "",
  des: "",
  banner: "",
  createdAt: "",
};
const RandomNewsPage = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRandomEventNews = async (news_id) => {
      setLoading(true);
      console.log("RandomNewsPage");
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/random-event-news`
        );

        setNews(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching random news:", error);
        setNews(null);
      }
    };
    fetchRandomEventNews();
  }, []);

  return loading ? (
    <div>loading...</div>
  ) : news ? (
    <div className="flex mt-2 w-full max-sm:px-1">
      <div className="w-full">
        <article className="">
          {/* <Heading title={''} /> */}
          <EventPageContent item={news} />
        </article>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default RandomNewsPage;
