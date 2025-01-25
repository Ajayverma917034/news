import EventSinglePage from "@/pages/EventSinglePage";

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

export async function generateMetadata({ params: { news_id } }) {
  const { news } = await fetchNews(news_id);

  let keywords =
    "event news, special event news, independence day, independence news, independence day news, independence day news by janpad news live";

  return {
    title: news?.title,
    description: news?.description
      ? news?.description
      : "Happy Independence Day - Janpad News Live",
    keywords: `${keywords}janpad news, janpad news live, latest news, today news`,
    openGraph: {
      type: "article",
      url: `https://janpadnewslive.com/event-news/${news_id}`,
      title: news?.title,
      description: "Happy Independence Day - Janpad News Live",
      images: [{ url: news?.banner }],
    },
    metadataBase: new URL("https://janpadnewslive.com"),
    alternates: {
      canonical: `https://janpadnewslive.com/event-news/${news_id}`,
    },
  };
}

export default async function BlogPostPage({ params: { news_id } }) {
  return <EventSinglePage news_id={news_id} />;
}
