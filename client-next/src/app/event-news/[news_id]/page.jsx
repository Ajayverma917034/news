import CustomeAndGoogleAdd from "@/components/ads/CustomeAndGoogleAdd";
import EventPageContent from "@/components/single-page/EventPageContent";
import LazyLoadAd from "../../../../components/LazyLoadAds";

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

export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  if (!resolvedParams?.news_id) {
    return {
      title: "News Not Found",
      description: "The news article you are looking for is not available.",
    };
  }

  const news_id = resolvedParams.news_id;
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

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;

  if (!resolvedParams?.news_id) {
    return {
      title: "News Not Found",
      description: "The news article you are looking for is not available.",
    };
  }

  const news_id = resolvedParams.news_id;
  const { news } = await fetchNews(news_id);

  if (!news) {
    return <div>News not found</div>;
  }

  return (
    <div className="flex spacing mt-2 w-full max-sm:px-1">
      <div className="grid max-sm:flex flex-col sm:grid-cols-6 sm:gap-6 w-full gap-x-2">
        <div className="col-span-6 md:col-span-4 w-full">
          <article className="">
            <EventPageContent item={news} />
          </article>

          <div className="w-full max-md:mt-2 flex items-center justify-center mt-2">
            <LazyLoadAd />
          </div>
          <div className="hidden max-sm:flex mt-3">
            <CustomeAndGoogleAdd />
          </div>
        </div>

        <div className="flex flex-col gap-y-2 md:gap-y-10 md:col-span-2 md:mt-10">
          <div className="sticky top-36 max-md:hidden">
            <CustomeAndGoogleAdd />
          </div>
          {/* <SideNews title={"education"} /> */}
        </div>
      </div>
    </div>
  );
}
