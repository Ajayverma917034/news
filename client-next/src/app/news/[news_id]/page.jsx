import Error from "@/app/error";
import NewsContent from "@/components/single-page/NewsContent";
import PageContent2 from "@/components/single-page/PageContent2";
import { formatDate } from "@/lib/formatDate";
import SinglePage from "@/pages/SinglePage.jsx";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import RelatedNews from "../../../../components/RelatedNews";
import CustomeAndGoogleAdd from "@/components/ads/CustomeAndGoogleAdd";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import DetailAds from "@/components/ads/DetailAds";
import Link from "next/link";
import NextNews from "@/components/single-page/NextNews";
import Head from "next/head";

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

  const keywords =
    tags?.length > 0
      ? tags?.join(", ") +
        ", janpad news, janpad news live, latest news, today news, sonbhadra news, sonbhadra latest news, breaking news, सोनभद्र समाचार, सोनभद्र न्यूज़, जनपद न्यूज़, आज की खबर, ताजा खबरें, उत्तर प्रदेश समाचार, sonebhadra, sonebhadra news "
      : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    image: [news.banner],
    datePublished: convertToIST(news.createdAt),
    dateModified: convertToIST(news.updatedAt),
    author: {
      "@type": "Person",
      name: "Janpad News Live",
    },
    publisher: {
      "@type": "Organization",
      name: "Janpad News Live",
      logo: {
        "@type": "ImageObject",
        url: "https://img.janpadnewslive.com/image/2024-10-18_06-17-48_logoimg.png",
      },
    },
    description: news.description,
    articleBody: news.content?.[0]?.blocks?.[0]?.data?.data?.text || "",
    keywords: keywords,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://janpadnewslive.com/news/${news.news_id}`,
    },
  };

  return {
    title: news?.title,
    description: news?.description,
    keywords: `${keywords}`,
    openGraph: {
      title: news?.title,
      description: news?.description,
      url: `https://janpadnewslive.com/news/${news_id}`,
      type: "article",
      siteName: "Janpad News Live",
      publishedTime: news?.createdAt ? convertToIST(news?.createdAt) : null,
      modifiedTime: news?.updatedAt ? convertToIST(news?.updatedAt) : null,
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
    script: [
      {
        type: "application/ld+json",
        content: JSON.stringify(jsonLd),
      },
    ],
  };
}

export default async function BlogPostPage({ params: { news_id } }) {
  const data = await fetchNews(news_id);
  if (!data || !data.news) {
    return <Error statusCode={404} />;
  }

  const keywords =
    data?.news?.tags?.length > 0
      ? data?.news?.tags?.join(", ") +
        ", janpad news, janpad news live, latest news, today news, sonbhadra news, sonbhadra latest news, breaking news, सोनभद्र समाचार, सोनभद्र न्यूज़, जनपद न्यूज़, आज की खबर, ताजा खबरें, उत्तर प्रदेश समाचार, sonebhadra, sonebhadra news "
      : "";

  return (
    <div className="flex flex-col spacing mt-2 w-full max-sm:px-2 relative">
      <NextNews randomNewsId={data?.randomNewsId[0]?.news_id} />

      <div className="grid max-sm:flex flex-col sm:grid-cols-6 sm:gap-6 w-full gap-x-2">
        <div className="col-span-6 md:col-span-4 w-full">
          <article>
            <div className="py-4 flex flex-col flex-wrap w-full">
              <h1 className="font-semibold text-[20px] md:text-[25px]">
                {data.news.title}
              </h1>
              <p className="date-lg text-wrap">{data.news.description}</p>
              <div className="w-full h-[240px] sm:h-[350px] mt-3 p-1 bg-white">
                <Image
                  src={data.news.banner}
                  width={1200}
                  height={600}
                  sizes={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  alt="news-img"
                  className="w-full max-sm:max-w-screen-sm h-full object-cover"
                  loading="lazy"
                />
              </div>
              {data?.news?.imageRef && (
                <div className="flex gap-3 mt-1">
                  <p className="text-[16px]">{data?.news?.imageRef}</p>
                </div>
              )}
              <div className="flex flex-wrap gap-y-2 sm:flex sm:flex-row items-center py-2 justify-between w-full">
                <div className="flex items-center">
                  <CiLocationOn size={25} className="text-red" />
                  <h3 className="news-title-md mt-2 ml-1 capitalize">
                    {data.news.location}
                  </h3>
                </div>
                <div>
                  <h3 className="date-lg">
                    {formatDate(data.news.news_post_time)}
                  </h3>
                </div>
              </div>
              <a
                href="https://www.whatsapp.com/channel/0029VaCW5oSI1rcoWIaACL1j"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 my-2 border-[3px] border-green-600 rounded-md flex justify-center items-center font-semibold text-green-700 w-full hover:text-white hover:bg-green-700 cursor-pointer transition-all delay-75"
              >
                Whatsapp चैनल फॉलो करे !
              </a>
              {/* google ads */}
              <NewsContent item={data.news} />
            </div>
          </article>
          <div className="bg-gray h-[200px] md:h-[300px] flex justify-center items-center w-full relative">
            <DetailAds />
            <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 z-[100] flex gap-x-1 rounded-md p-1 font-sans items-center">
              <Link
                href={"/advertisement-us"}
                className="text-[#f9f9f9] text-[12px] "
              >
                <HiOutlineExclamationCircle
                  size={18}
                  className="text-[#f9f9f9] font-sans"
                />
              </Link>
              <span className="text-[#f9f9f9] text-[12px]">Sponsored</span>
            </div>
          </div>
          <RelatedNews news_id={news_id} />
        </div>
        <div className="flex flex-col gap-y-2 md:gap-y-10 md:col-span-2 md:mt-10">
          <div className="sticky top-36 max-md:hidden">
            <CustomeAndGoogleAdd />
          </div>
        </div>
      </div>
    </div>
  );
}
