import BottomPopUp from "@/components/BottomPopUp";
import MoreNews from "@/pages/MoreNews";
import React from "react";
export const metadata = {
  title: "Health",
  description:
    "Get the latest health tips, wellness advice, fitness guides, and nutrition news in Hindi and English. Stay updated on medical research, healthy living, diet plans, and mental health.",
  keywords:
    "health tips, wellness advice, fitness guides, nutrition news, medical research, healthy living, diet plans, mental health, Hindi health news, स्वास्थ्य टिप्स, वेलनेस सलाह, फिटनेस गाइड्स, पोषण समाचार, चिकित्सा अनुसंधान, स्वस्थ जीवन, डाइट प्लान, मानसिक स्वास्थ्य",
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
      "health tips, wellness advice, fitness guides, nutrition news, medical research, healthy living, diet plans, mental health, Hindi health news, स्वास्थ्य टिप्स, वेलनेस सलाह, फिटनेस गाइड्स, पोषण समाचार, चिकित्सा अनुसंधान, स्वस्थ जीवन, डाइट प्लान, मानसिक स्वास्थ्य",
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
      <MoreNews title={"health"} />
      <BottomPopUp />
    </>
  );
};

export default page;
