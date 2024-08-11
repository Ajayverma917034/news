import Link from "next/link";
import { notFound } from "next/navigation";
import RandomNewsScroll from "./RandomNewsScroll.jsx";
import Image from "next/image.js";
import PageContent from "@/components/single-page/PageContent.jsx";
// import CustomeAndGoogleAdd from "@/components/ads/CustomeAndGoogleAdd.jsx";
// import { handleImageError } from "@/lib/errorImg.js";
import Heading from "@/lib/Heading.jsx";

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
        draft: true, // or false, depending on your requirement
        mode: "ds",
        incrementVal: 1, // replace with the actual value
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
  let tags = news?.tags;

  let keywords = "";
  for (let i = 0; i < tags.length; i++) {
    keywords += tags[i] + ", ";
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
  const { news, relatedNews } = await fetchNews(news_id);

  return (
    <div className="flex spacing mt-2 w-full max-sm:px-1">
      <div className="grid max-sm:flex flex-col sm:grid-cols-6 sm:gap-6 w-full gap-x-2">
        <div className="col-span-6 md:col-span-4 w-full">
          <article className="">
            <PageContent item={news} />
          </article>

          {relatedNews && relatedNews.length ? (
            <div className="w-full">
              <Heading title={"सम्बंधित खबर"} />
              <div className="flex max-lg:flex-col gap-2 w-full">
                {relatedNews.map((item, index) => (
                  <Link
                    href={`/news/${item?.news_id}`}
                    key={index}
                    className="grid grid-cols-3 gap-x-1 max-md:gap-x-1 lg:flex lg:flex-col lg:w-[200px] shadow-card p-1 rounded-md max-lg:gap-x-3"
                  >
                    <div className="max-lg:col-span-1 h-[80px] max-h-[103px] lg:h-[120px] max-lg:max-w-36 rounded-md">
                      <Image
                        src={item?.banner}
                        // onError={handleImageError}
                        alt="Relative-news-image"
                        width={1200}
                        height={800}
                        sizes={{
                          maxWidth: "100%",
                          height: "auto",
                        }}
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-95 rounded-md"
                      />
                    </div>
                    <h3 className="col-span-2 mt-2 font-semibold line-clamp-2 text-xl md:hover:border-b hover:border-black">
                      {item?.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="w-full max-md:mt-2 flex items-center justify-center mt-2">
            {/* <HorizontalAdsGoogle /> */}
          </div>
          <div className="hidden max-sm:flex mt-3">
            {/* <CustomeAndGoogleAdd /> */}
          </div>

          <div className="flex mt-2 w-full">
            {/* Existing content */}
            <RandomNewsScroll initialNewsId={news_id} />
          </div>
        </div>
      </div>
    </div>
  );
}
