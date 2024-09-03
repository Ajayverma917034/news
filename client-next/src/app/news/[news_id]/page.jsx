import BottomPopUp from "@/components/BottomPopUp";
import SinglePage from "@/pages/SinglePage.jsx";

const fetchNews = async (news_id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-news`,
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
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-advertisement`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  if (response.ok) {
    return await response.json();
  }
  return [];
}

export async function generateMetadata({ params: { news_id } }) {
  const { news } = await fetchNews(news_id);
  let tags = news?.tags;

  let keywords = "";
  if (tags && tags.length > 0) {
    for (let i = 0; i < tags.length; i++) {
      keywords += tags[i] + ", ";
    }
  }

  return {
    title: news?.title,
    description: news?.description,
    keywords: `${keywords}janpad news, janpad news live, latest news, today news`,
    openGraph: {
      type: "article",
      url: `https://janpadnewslive.com/news/${news_id}`,
      title: news?.title,
      description: news?.description,
      images: [{ url: news?.banner }],
    },
    metadataBase: new URL("https://janpadnewslive.com"),
    alternates: {
      canonical: `https://janpadnewslive.com/news/${news_id}`,
    },
  };
}

export default async function BlogPostPage({ params: { news_id } }) {
  const ads = await fetchAds();
  return (
    <>
      <SinglePage news_id={news_id} ads={ads} />
      <BottomPopUp />
    </>
  );
}
