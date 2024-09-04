import BottomPopUp from "@/components/BottomPopUp";
import MoreNews from "@/pages/MoreNews";
import React from "react";
export const metadata = {
  title: "Bollywood",
  description:
    "Stay updated with the latest Bollywood news (बॉलीवुड समाचार), movie reviews (फिल्म समीक्षा), celebrity interviews (सेलिब्रिटी इंटरव्यू), new movie releases (नई फिल्म रिलीज़), photos (फोटो) and videos (वीडियो).",
  keywords:
    "bollywood news, bollywood updates, latest bollywood news, bollywood gossip, movie reviews, bollywood interviews, hindi bollywood news, बॉलीवुड समाचार, बॉलीवुड न्यूज़, फिल्म समीक्षा, बॉलीवुड गॉसिप, सेलिब्रिटी इंटरव्यू, नई फिल्म रिलीज़, फोटो, वीडियो",
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://janpadnewslive.com"),
  openGraph: {
    type: "article",
    url: "https://janpadnewslive.com",
    title: "Sports - Janpad News Live",
    description:
      "bollywood news, bollywood updates, latest bollywood news, bollywood gossip, movie reviews, bollywood interviews, hindi bollywood news, बॉलीवुड समाचार, बॉलीवुड न्यूज़, फिल्म समीक्षा, बॉलीवुड गॉसिप, सेलिब्रिटी इंटरव्यू, नई फिल्म रिलीज़, फोटो, वीडियो",
    images: [
      {
        url: "../../assets/janpad_news_live.png",
        width: 800,
        height: 600,
        alt: "Janpad News Live",
      },
    ],
  },
  alternates: {
    canonical: "https://janpadnewslive.com",
  },
};
const page = () => {
  return (
    <>
      <MoreNews title={"bollywood"} />
      <BottomPopUp />
    </>
  );
};

export default page;
