import BottomPopUp from "@/components/BottomPopUp";
import MoreNews from "@/pages/MoreNews";
import React from "react";
export const metadata = {
  title: "Technology",
  description:
    "Discover the latest technology news (प्रौद्योगिकी समाचार), updates (अपडेट्स), AI (आर्टिफिशियल इंटेलिजेंस), gadgets (गैजेट्स), and cybersecurity (साइबर सुरक्षा).",
  keywords:
    "technology news, tech updates, ai news, gadgets, cybersecurity, software development, tech trends, hindi tech news, प्रौद्योगिकी समाचार, टेक अपडेट्स, आर्टिफिशियल इंटेलिजेंस, गैजेट्स, साइबर सुरक्षा, सॉफ्टवेयर विकास, टेक रुझान",
  author: "Janpad News Team",
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://janpadnewslive.com"),
  openGraph: {
    type: "article",
    url: "https://janpadnewslive.com",
    title: "Sports - Janpad News Live",
    description:
      "technology news, tech updates, ai news, gadgets, cybersecurity, software development, tech trends, hindi tech news, प्रौद्योगिकी समाचार, टेक अपडेट्स, आर्टिफिशियल इंटेलिजेंस, गैजेट्स, साइबर सुरक्षा, सॉफ्टवेयर विकास, टेक रुझान",
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
    <>
      <MoreNews title={"technology"} />
      <BottomPopUp />
    </>
  );
};

export default page;
