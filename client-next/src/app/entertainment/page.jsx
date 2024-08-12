import MoreNews from "@/pages/MoreNews";
import React from "react";
export const metadata = {
  title: "Entertainment",
  description:
    "Latest news and updates (ताज़ा समाचार और अपडेट) from entertainment (मनोरंजन), including entertainment news today (मनोरंजन न्यूज़ आज), and Janpad news in Hindi (जनपद न्यूज़ हिंदी में).",
  keywords:
    "entertainment news, news, entertainment news today, janpad news, मनोरंजन समाचार, समाचार, मनोरंजन न्यूज़ आज, जनपद न्यूज़",
  author: "Janpad News Team",
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://notemyword.online"),
  openGraph: {
    type: "article",
    url: "https://notemyword.online",
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
    canonical: "https://notemyword.online",
  },
};
const page = () => {
  return <MoreNews title={"entertainment"} />;
};

export default page;
