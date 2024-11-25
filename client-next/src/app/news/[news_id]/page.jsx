import BottomPopUp from "@/components/BottomPopUp";
import SinglePage from "@/pages/SinglePage.jsx";

function convertToIST(dateStr) {
  // Parse the date from the given UTC string
  const date = new Date(dateStr);

  // Offset IST time zone by adding 5 hours and 30 minutes
  date.setHours(date.getUTCHours() + 5);
  date.setMinutes(date.getUTCMinutes() + 30);

  return date.toISOString().replace("Z", "+05:30");
}

// Fetch news article based on news_id
const fetchNews = async (news_id) => {
  try {
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
          draft: false,
          mode: "read",
          incrementVal: 0,
        }),
      }
    );

    if (!response.ok) {
      // Handle error if the news is not found
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return null; // Return null in case of any errors
  }
};

// Generate metadata dynamically for each news article
export async function generateMetadata({ params: { news_id } }) {
  const data = await fetchNews(news_id);

  if (!data || !data.news) {
    return {
      title: "News Not Found",
      description: "The news article you are looking for is not available.",
    };
  }

  const { news } = data;
  const tags = news?.tags || [];

  // Join tags into a comma-separated string
  const keywords = tags.length > 0 ? tags.join(", ") + ", " : "";

  return {
    title: news?.title,
    description: news?.description,
    keywords: `${keywords}janpad news, janpad news live, latest news, today news, sonbhadra news, sonbhadra latest news, breaking news, सोनभद्र समाचार, सोनभद्र न्यूज़, जनपद न्यूज़, आज की खबर, ताजा खबरें, उत्तर प्रदेश समाचार, sonebhadra, sonebhadra news`, 
    openGraph: {
      title: news?.title,
      description: news?.description,
      url: `https://janpadnewslive.com/news/${news_id}`,
      type: "article",
      siteName: "Janpad News Live",
      publishedTime: news?.createdAt ? convertToIST(news?.createdAt) : null,
      modifiedTime: news?.updatedAt ? convertToIST(news?.updatedAt) : null,
      // modifiedTime: new Date(news?.modified_at).toISOString(),/
      author: ["Janpad News Live Team"],
      images: [
        {
          url: news?.banner,
          secureUrl: news?.banner,
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
        url: news?.banner,
        alt: `Preview image for news ${news?.title}`,
      },
    },
    metadataBase: new URL("https://janpadnewslive.com"),
    alternates: {
      canonical: `https://janpadnewslive.com/news/${news_id}`,
    },
  };
}

// Blog post page component for displaying the news article
export default async function BlogPostPage({ params: { news_id } }) {
  return (
    <>
      <SinglePage news_id={news_id}/>
      <BottomPopUp />
    </>
  );
}
