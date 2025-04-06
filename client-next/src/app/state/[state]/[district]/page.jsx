import React from "react";
import Client from "./Client";
import { findHindi } from "@/assets/data";
import BottomPopUp from "@/components/BottomPopUp";
// import DistrictNews from "@/pages/DistrictNews";

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  let { state, district } = awaitedParams;

  state = decodeURIComponent(state);
  district = decodeURIComponent(district);

  let title = district.charAt(0).toUpperCase() + district.slice(1);
  return {
    title: title + " News",
    description: `Latest News (लेटेस्ट खबरें), Breaking News (ब्रेकिंग न्यूज़), ${title} News (${findHindi(
      title
    )} समाचार), ${title} (${findHindi(
      title
    )} प्रदेश), District News (राज्य समाचार)`,
    keywords: `${title} news, news, ${title} news today, janpad news, ${findHindi(
      title
    )} समाचार, समाचार, ${findHindi(title)} न्यूज़ आज, जनपद न्यूज़`,
    openGraph: {
      type: "article",
      url: "https://janpadnewslive.com",
      title: "Janpad News Live ",
      description:
        "`Latest News (लेटेस्ट खबरें), Breaking News (ब्रेकिंग न्यूज़), ${title} News (${findHindi(title)} समाचार), ${title} (${findHindi(title)} प्रदेश), District News (राज्य समाचार)`",
      images: [
        {
          url: "../assets/janpad_news_live.png",
          width: 800,
          height: 600,
          alt: "Janpad News Live ",
        },
      ],
    },
    metadataBase: new URL("https://janpadnewslive.com"),
    alternates: {
      canonical: `https://janpadnewslive.com`,
    },
  };
}

const page = async ({ params }) => {
  const awaitedParams = await params;
  let { state, district } = awaitedParams;
  return (
    <div>
      <BottomPopUp />
      <Client state={state} district={district} />
    </div>
  );
};

export default page;
