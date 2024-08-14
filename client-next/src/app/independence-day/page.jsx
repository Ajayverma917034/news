import EventNews from "@/pages/EventNews";
import MoreNews from "@/pages/MoreNews";
import React from "react";
export const metadata = {
  title: "Independence Day",
  description:
    "Latest news and updates (ताज़ा समाचार और अपडेट) independece (मनोरंजन), including entertainment news today (मनोरंजन न्यूज़ आज), and Janpad news in Hindi (जनपद न्यूज़ हिंदी में).",
  keywords:
    "entertainment news, news, entertainment news today, janpad news, मनोरंजन समाचार, समाचार, मनोरंजन न्यूज़ आज, जनपद न्यूज़",
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
      "Latest news and updates (ताज़ा समाचार और अपडेट) from entertainment (मनोरंजन), including entertainment news today (मनोरंजन न्यूज़ आज), and Janpad news in Hindi (जनपद न्यूज़ हिंदी में).",
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
  return <EventNews />;
};

export default page;
