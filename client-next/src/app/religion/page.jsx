import MoreNews from "@/pages/MoreNews";
import React from "react";
export const metadata = {
  title: "Religion",
  description:
    "Latest news and updates (ताज़ा समाचार और अपडेट) from religion (धर्म), including religion news today (धर्म न्यूज़ आज), and Janpad news in Hindi (जनपद न्यूज़ हिंदी में).",
  keywords:
    "religion news, news, religion news today, janpad news, धर्म समाचार, समाचार, धर्म न्यूज़ आज, जनपद न्यूज़'",
  author: "Janpad News Team",
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://janpadnewslive.com"),
  openGraph: {
    type: "article",
    url: "https://janpadnewslive.com",
    title: "Religion Janpad News Live",
    description:
      "Latest news and updates (ताज़ा समाचार और अपडेट) from religion (धर्म), including religion news today (धर्म न्यूज़ आज), and Janpad news in Hindi (जनपद न्यूज़ हिंदी में).",
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
  return <MoreNews title={"religion"} />;
};

export default page;
