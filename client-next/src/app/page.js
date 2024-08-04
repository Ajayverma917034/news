import ApnaZila from "@/components/ApnaZila";
import HomeRightBar from "@/components/home/HomeRightBar";
import HomeRightBarOther from "@/components/news-section/home.other";
import NewsSection from "@/components/news-section/news.section.component";
import NewsVideo from "@/components/news-video/news.video.section.component";
import RajyaMain from "@/components/RajyaMain";
import SideNews from "@/components/side-news/SideNews";
import { YtCollectionSkeleton } from "@/skeleton/HomeSkeleton";

const fetchHomeNews = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/news/home`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        payload: JSON.stringify({
          data: ["बड़ी ख़बरें", "uttar pradesh", "crime", "education"],
        }),
      }
    );

    // console.log(response);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return [[], [], [], []];
  }
};
const fetchYtNews = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/news/youtube`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        payload: JSON.stringify({
          data: ["बड़ी ख़बरें", "uttar pradesh", "crime", "education"],
        }),
      }
    );

    // console.log(response);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return [[], [], [], []];
  }
};

const Home = async () => {
  const data = ["बड़ी ख़बरें", "uttar pradesh", "crime", "education"];
  const homeNews = await fetchHomeNews(data);
  const ytNews = await fetchYtNews(data);

  return (
    <div>
      {/* <HomeRightBar data={homeNews.data.slice(0, 2)} ytData={ytNews.news} /> */}
      <div className="flex spacing mt-2 ">
        <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full gap-5 ">
          <div className="flex flex-col flex-wrap  md:col-span-4 overflow-hidden">
            {
              homeNews && homeNews.data &&
              <NewsSection data={homeNews?.data[0]?.data} title={homeNews?.data[0]?.title} />
            }
            {ytNews && ytNews.news ? (
              <NewsVideo data={ytNews.news} title="टॉप वीडियो" />
            ) : (
              <YtCollectionSkeleton />
            )}
          </div>
          <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2">
            {/* <CustomeAndGoogleAdd index={0} /> */}
            <SideNews title={"read also"} />
          </div>
        </div>
      </div>


      <RajyaMain />
      <ApnaZila />

      <HomeRightBarOther data={homeNews} />


      {homeNews.data.length > 4 && (
        <div className="flex spacing mt-2">
          <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full">
            <div className="flex flex-col flex-wrap md:col-span-4 overflow-hidden">
              {homeNews.data.slice(4).map((news, index) => (
                <NewsSection key={index} data={news.data} title={news.title} />
              ))}
            </div>
            <div className="col-span-2 w-full">
              <div className="sticky top-32 max-md:hidden">
                {/* <CustomeAndGoogleAdd /> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
