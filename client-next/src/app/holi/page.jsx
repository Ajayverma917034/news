import EventNews from "@/pages/EventNews";
import React from "react";
export const metadata = {
  title: "Holi Festival",
  description:
    "Latest news and updates (ताज़ा समाचार और अपडेट) on Holi (होली), including festival celebrations (त्योहार समारोह), colors, traditions, and Janpad news in Hindi (जनपद न्यूज़ हिंदी में).",
  keywords:
    "holi news, festival news, holi celebrations, janpad news, होली समाचार, त्योहार, जनपद न्यूज़",
  author: "Janpad News Team",
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://janpadnewslive.com"),
  openGraph: {
    type: "article",
    url: "https://janpadnewslive.com",
    title: "Holi Festival - Janpad News Live",
    description:
      "Celebrate Holi (होली) with the latest updates on festival traditions, colors, and Janpad news in Hindi (जनपद न्यूज़ हिंदी में).",
    images: [
      {
        url: "../../assets/janpad_news_live.png",
        width: 800,
        height: 600,
        alt: "Holi Festival News",
      },
    ],
  },
  alternates: {
    canonical: "https://janpadnewslive.com/holi",
  },
};

const page = () => {
  return <EventNews event_type="republic-day" />;
};

export default page;
