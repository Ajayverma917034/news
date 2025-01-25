import EventNews from "@/pages/EventNews";
import React from "react";
export const metadata = {
  title: "Republic Day",
  description:
    "Latest Republic Day news and updates (ताज़ा समाचार और अपडेट), including Republic Day celebrations (गणतंत्र दिवस समारोह), and Janpad news in Hindi (जनपद न्यूज़ हिंदी में).",
  keywords:
    "Republic Day news, गणतंत्र दिवस समाचार, news, Republic Day celebrations, janpad news, जनपद न्यूज़",
  author: "Janpad News Team",
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://janpadnewslive.com"),
  openGraph: {
    type: "article",
    url: "https://janpadnewslive.com",
    title: "Republic Day - Janpad News Live",
    description:
      "Latest Republic Day news and updates (ताज़ा समाचार और अपडेट), including Republic Day celebrations (गणतंत्र दिवस समारोह), and Janpad news in Hindi (जनपद न्यूज़ हिंदी में).",
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
  return <EventNews event_type="republic-day" />;
};

export default page;
