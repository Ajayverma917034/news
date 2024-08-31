import MoreNews from "@/pages/MoreNews";
import React from "react";
export const metadata = {
  title: "Carrier",
  description:
    "Latest news and updates (ताज़ा समाचार और अपडेट) from carrier (करियर), including carrier news today (करियर न्यूज़ आज), and Janpad news in Hindi (जनपद न्यूज़ हिंदी में).",
  keywords:
    "carrier news, news, carrier news today, janpad news, करियर समाचार, समाचार, करियर न्यूज़ आज, जनपद न्यूज़",
  author: "Janpad News Live",
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://janpadnewslive.com"),
  openGraph: {
    type: "article",
    url: "https://janpadnewslive.com",
    title: "Janpad News Live",
    description:
      "Latest news and updates (ताज़ा समाचार और अपडेट) from carrier (करियर), including carrier news today (करियर न्यूज़ आज), and Janpad news in Hindi (जनपद न्यूज़ हिंदी में).",
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
  return <MoreNews title={"carrier"} />;
};

export default page;
