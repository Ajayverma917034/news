import BottomPopUp from "@/components/BottomPopUp";
import React from "react";
export const metadata = {
  title: "Terms And Condition",
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
    title: "Terms And Condition",
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
      {" "}
      <BottomPopUp />
      page
    </div>
  );
};

export default page;
