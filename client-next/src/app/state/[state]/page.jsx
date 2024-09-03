import React from "react";
import { findHindi } from "@/assets/data";
import StateClient from "./StateClient";
import BottomPopUp from "@/components/BottomPopUp";

export async function generateMetadata({ params }) {
  // read route params
  let { state } = params;
  state = state.split("%20").join(" ");

  let title = state.charAt(0).toUpperCase() + state.slice(1);
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

const page = ({ params }) => {
  return (
    <div>
      <BottomPopUp />

      <StateClient params={params} />
    </div>
  );
};

export default page;
