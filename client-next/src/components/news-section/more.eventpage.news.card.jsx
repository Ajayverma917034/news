import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/formatDate";

const MoreEventPageCard = ({ data }) => {
  return (
    <>
      <Link
        href={`/event-news/${data?.news_id}`}
        className="gap-2 md:gap-4  flex flex-col p-1 shadow-card rounded-md"
      >
        <div className="h-full max-h-[800px] w-full">
          <Image
            src={data?.banner}
            alt="Image"
            width={1200}
            height={800}
            sizes={{
              maxWidth: "100%",
              height: "auto",
              maxHeight: "100%",
            }}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
        <div className="md:col-span-5 ml-2 gap-1">
          <h1 className="text-[24px] md:text-[30px] font-medium !line-clamp-2 ">
            {data?.title}
          </h1>
        </div>
      </Link>
    </>
  );
};

export default MoreEventPageCard;
