import MoreNews from "@/pages/MoreNews";
import React from "react";
export const metadata = {
  title: "Education",
  description:
    "Janpad News Live (जनपद न्यूज़ लाइव): Latest News (लेटेस्ट खबरें), Breaking News  (ब्रेकिंग न्यूज़), World (विश्व), Sports (खेल), Business, Entertainment (मनोरंजन).",
  keywords:
    "janpad, janpad news, janpad news live, sonbhadra news, breaking news, aaj ki khabar, today news, latest news, uttar pradesh news",
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
      "Janpad News Live (जनपद न्यूज़ लाइव): Latest News (लेटेस्ट खबरें), Breaking News  (ब्रेकिंग न्यूज़), World (विश्व), Sports (खेल), Business, Entertainment (मनोरंजन).",
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
  return <MoreNews title={"education"} />;
};

export default page;
