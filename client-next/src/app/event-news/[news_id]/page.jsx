import EventSinglePage from "@/pages/EventSinglePage";
import SinglePage from "@/pages/SinglePage.jsx";

const fetchNews = async (news_id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-event-news`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify({
        news_id,
        draft: false, // or false, depending on your requirement
        mode: "read",
        incrementVal: 0, // replace with the actual value
      }),
    }
  );

  if (!response.ok) {
    // notFound(); // Handle if the news is not found
  }

  return await response.json();
};

export async function fetchAds() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-advertisement`
  );
  if (response.ok) {
    return await response.json();
  }
  return [];
}

export async function generateMetadata({ params: { news_id } }) {
  const { news } = await fetchNews(news_id);

  let keywords =
    "event news, special event news, event news by janpad news live, ";

  return {
    title: news?.title,
    description: news?.description
      ? news?.description
      : "event news by janpad news live",
    keywords: `${keywords}janpad news, janpad news live, latest news, today news`,
    openGraph: {
      type: "article",
      url: `https://janpadnewslive.com/event-news/${news_id}`,
      title: news?.title,
      description: news?.description,
      images: [{ url: news?.banner }],
    },
    metadataBase: new URL("https://janpadnewslive.com"),
    alternates: {
      canonical: `https://janpadnewslive.com/event-news/${news_id}`,
    },
  };
}

export default async function BlogPostPage({ params: { news_id } }) {
  const ads = await fetchAds();
  return <EventSinglePage news_id={news_id} ads={ads} />;
}
