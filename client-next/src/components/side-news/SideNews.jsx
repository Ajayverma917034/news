"use client";
import React, { useEffect } from "react";
import SideNewsSkelton from "@/skeleton/SideNewsSkelton";
import Heading from "@/lib/Heading";
import SubNewsCard from "./SubNewsCard";
import { findHindi } from "@/assets/data";

const SideNews = ({ title = "", limit = "5" }) => {
  const [data, setData] = React.useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/fetch-sidebar-news`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            limit: limit,
            news_section_type: [title],
          }),
        }
      );

      const data = await response.json();
      setData(data.news);
    };
  }, [title, limit]);
  return (
    <>
      {data ? (
        data.length > 0 && (
          <div className=" flex-col gap-y-3 py-3 px-5 shadow-light-shadow rounded-md  hidden lg:flex ">
            {data && data.length > 0 && (
              <div className="flex lg:flex-col gap-y-4 gap-5">
                <Heading title={findHindi(title)} />
                {data.map((item, index) => (
                  <SubNewsCard key={index} data={item} />
                ))}
              </div>
            )}
          </div>
        )
      ) : (
        <SideNewsSkelton />
      )}
    </>
  );
};

export default SideNews;
