import { notFound } from "next/navigation";
import VideoPage from "@/components/single-page/VideoPage";
import BottomPopUp from "@/components/BottomPopUp";

const formatToIST = (dateString) => {
  const date = new Date(dateString);
  const offset = "+05:30"; // IST offset
  const localISOTime = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  )
    .toISOString()
    .replace("Z", "");
  return `${localISOTime}${offset}`;
};

const fetchNews = async (news_id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-youtube-news`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_id: news_id,
        incrementVal: 1, // replace with the actual value
      }),
    }
  );

  if (!response.ok) {
    notFound(); // Handle if the news is not found
  }

  const news = await response.json();
  return news;
};
export async function generateMetadata({ params: { news_id } }) {
  const { news } = await fetchNews(news_id);
  let tags = news?.tags;

  let keywords = "";
  for (let i = 0; i < tags.length; i++) {
    keywords += tags[i] + ", ";
  }
  const thumbnail = `https://img.youtube.com/vi/${news?.videoLinkId}/mqdefault.jpg`;

  return {
    title: news?.title,
    description: news?.description,
    keywords: `${keywords}janpad news, janpad news live, latest news, today news`,
    openGraph: {
      title: news?.title,
      description: news?.description,
      url: thumbnail,
      type: "article",
      siteName: "Janpad News Live",
      publishedTime: news?.createdAt ? formatToIST(news.createdAt) : null,
      modifiedTime: news?.updatedAt ? formatToIST(news.updatedAt) : null,
      author: ["Janpad News Live Team"],
      images: [
        {
          url: thumbnail,
          secureUrl: thumbnail,
          width: 1200,
          height: 630,
          alt: `Preview image for news ${news?.title}`,
        },
      ],
    },
    twiter: {
      card: "summary_large_image",
      site: "@janpadnewslive",
      title: news?.title,
      description: news?.description,
      creator: "@janpadNewsLive",
      images: {
        url: thumbnail,
        alt: `Preview image for news ${news?.title}`,
      },
    },
    metadataBase: new URL("https://janpadnewslive.com"),
    alternates: {
      canonical: `https://janpadnewslive.com/video/${news_id}`,
    },
  };
}

export default async function BlogPostPage({ params: { news_id } }) {
  return (
    <>
      <VideoPage news_id={news_id} />
      <BottomPopUp />
    </>
  );
}
