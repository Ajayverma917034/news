import BottomPopUp from "@/components/BottomPopUp";
import React from "react";
export const metadata = {
  title: "Disclaimer Policy",
  description: "",
  keywords: "",
  author: "Janpad News Team",
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://janpadnewslive.com"),
  openGraph: {
    type: "article",
    url: "https://janpadnewslive.com",
    title: "Janpad News Live",
    description: "",
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
    <div>
      page <BottomPopUp />
    </div>
  );
};

export default page;
