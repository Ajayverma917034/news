import MoreNews from "@/pages/MoreNews";
import React from "react";
export const metadata = {
  title: "Country",
  description:
    "Latest news and updates (ताज़ा समाचार और अपडेट) from country (देश), including country news today (देश न्यूज़ आज), and Janpad news in Hindi (जनपद न्यूज़ हिंदी में).",
  keywords:
    "country news, news, country news today, janpad news, देश समाचार, समाचार, देश न्यूज़ आज, जनपद न्यूज़'",
  author: "Janpad News Team",
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://janpadnewslive.com"),
  openGraph: {
    type: "article",
    url: "https://janpadnewslive.com",
    title: "Janpad News Live",
    description:
      "Latest news and updates (ताज़ा समाचार और अपडेट) from country (देश), including country news today (देश न्यूज़ आज), and Janpad news in Hindi (जनपद न्यूज़ हिंदी में).",
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
  return <MoreNews title={"country"} />;
};

export default page;
