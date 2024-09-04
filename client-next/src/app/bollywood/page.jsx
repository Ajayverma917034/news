import BottomPopUp from "@/components/BottomPopUp";
import MoreNews from "@/pages/MoreNews";
import React from "react";
export const metadata = {
    title: "Sports",
    description:
        "Latest news and updates (ताज़ा समाचार और अपडेट) from sports (खेल), including sports news today (खेल न्यूज़ आज), and Janpad news in Hindi (जनपद न्यूज़ हिंदी में).",
    keywords:
        "sports news, news, sports news today, janpad news, खेल समाचार, समाचार, खेल न्यूज़ आज, जनपद न्यूज़",
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
            "Latest news and updates (ताज़ा समाचार और अपडेट) from sports (खेल), including sports news today (खेल न्यूज़ आज), and Janpad news in Hindi (जनपद न्यूज़ हिंदी में).",
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
            <MoreNews title={"bollywood"} />
            <BottomPopUp />
        </>
    );
};

export default page;
