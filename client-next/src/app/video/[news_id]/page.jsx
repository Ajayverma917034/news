import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image.js";
import { CiLocationOn } from "react-icons/ci";
import { formatDate } from "@/lib/formatDate";
import Heading from "@/lib/Heading";
import CustomeAndGoogleAdd from "@/components/ads/CustomeAndGoogleAdd";
import FooterAds from "../../../../components/FooterAds";
// import CustomeAndGoogleAdd from "@/components/ads/CustomeAndGoogleAdd";

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
      type: "article",
      url: `https://notemyword.online/video/${news_id}`,
      title: news?.title,
      description: news?.description,
      images: [{ url: thumbnail }],
    },
    metadataBase: new URL("https://notemyword.online"),
    alternates: {
      canonical: `https://notemyword.online/video/${news_id}`,
    },
  };
}

export default async function BlogPostPage({ params: { news_id } }) {
  const { news, relatedNews } = await fetchNews(news_id);

  const thumbnail = `https://img.youtube.com/vi/${news?.videoLinkId}/mqdefault.jpg`;

  return (
    <div className="flex spacing mt-2 w-full max-sm:px-1">
      <div className="grid max-sm:flex flex-col sm:grid-cols-6 sm:gap-6 w-full gap-x-2">
        <div className="col-span-6 md:col-span-4 w-full">
          <article className="">
            <div className="center w-full py-2 max-lg:px-[0vw] h-[300px] md:h-[500px]">
              <iframe
                style={{ overflow: "hidden", height: "100%", width: "100%" }}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${news?.videoLinkId}`}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                title="YouTube video player"
              ></iframe>
            </div>

            <div className="center w-full max-lg:px-[0vw]">
              <h2 className="text-4xl leading-normal font-bold max-md:text-3xl font-devNagri">
                {news?.title}
              </h2>
              <div className="flex flex-wrap gap-y-2 sm:flex sm:flex-row items-center py-2 justify-between w-full">
                <div className="flex items-center">
                  <CiLocationOn size={25} className="text-red" />
                  <h3 className="news-title-md mt-2 ml-1 capitalize">
                    {news?.location}
                  </h3>
                </div>
                <div>
                  <h3 className="date-lg">{formatDate(news?.createdAt)}</h3>
                </div>
                {/* <div className="flex gap-2 items-center">
                  <WhatsappShareButton url={shareUrl} title={title}>
                    <RiWhatsappFill
                      className="text-green-600 hover:scale-[1.2]"
                      size={28}
                    />
                  </WhatsappShareButton>
                  <FacebookShareButton
                    hashtag={tags}
                    url={shareUrl}
                    title={title}
                  >
                    <FaFacebook
                      size={24}
                      className="text-blue hover:scale-[1.2]"
                    />
                  </FacebookShareButton>

                  <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    hashtags={tags}
                  >
                    <FaSquareXTwitter
                      size={24}
                      className="text-pink-600 hover:scale-[1.2]"
                    />
                  </TwitterShareButton>
                  <button onClick={copyUrlToClipboard}>
                    <MdOutlineContentCopy
                      size={24}
                      className=" hover:scale-[1.2]"
                    />
                  </button>
                </div> */}
              </div>

              <p className=" text-lg font-devNagri">{news?.description}</p>
            </div>
          </article>

          <div className="w-full mt-5">
            <div className="flex max-lg:flex-col gap-2 w-full">
              {relatedNews &&
                relatedNews.length > 0 &&
                relatedNews.map((item, index) => (
                  <>
                    <Heading title={"सम्बंधित खबर"} />
                    <Link
                      href={`/video/${item?.news_id}`}
                      key={index}
                      className="grid grid-cols-3 max-md:gap-x-1 lg:flex lg:flex-col lg:w-[200px] shadow-card p-1 rounded-md max-lg:gap-x-3"
                    >
                      <div className="max-lg:col-span-1  h-[70px] max-h-[103px] lg:h-[120px] max-lg:max-w-36 rounded-md">
                        <Image
                          src={`https://img.youtube.com/vi/${item?.videoLinkId}/mqdefault.jpg`}
                          //   onError={handleImageError}
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
                  </>
                ))}
            </div>
          </div>
          <div className="w-full h-[5rem] md:h-[9rem] max-md:mt-2 flex items-center justify-center mt-2">
            <FooterAds />
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
