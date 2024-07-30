import React, { useEffect, useState } from "react";
import HomeRightBar from "../../components/home.component";
import httpClient from "../../api/httpClient";
import HomeRightBarOther from "../../components/home.component.other";
import NewsSection from "../../components/common/news-section/news.section.component";
import { MetaDataSection } from "../../seo/Helmet";
import RajyaMain from "./RajyaMain";
import ApnaZila from "./ApnaZila";
import CustomeAndGoogleAdd from "../advertisement/CustomeAndGoogleAdd";

const HomePage = () => {
  const [homeNews, setHomeNews] = useState([[], [], [], []]);
  const [ytNews, setYtNews] = useState(null);
  const [loading, setLoading] = useState(true);

  const data = ["बड़ी ख़बरें", "uttar pradesh", "crime", "education"];
  const fetchHomeNews = async () => {
    httpClient
      .post("/news/home", { data })
      .then(({ data }) => {
        setHomeNews(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchYtNews = async () => {
    httpClient
      .post("/news/youtube")
      .then(({ data }) => {
        setYtNews(data.news);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchYtNews();
    fetchHomeNews();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <MetaDataSection
        title={"Home - Janpad News Live"}
        description={
          "Janpad News Live (जनपद न्यूज़ लाइव): Latest Khabar (लेटेस्ट खबरें), Breaking news  (ब्रेकिंग न्यूज़), World (विश्व), Sports (खेल), Business, Entertainment (मनोरंजन)."
        }
        tags={[
          "janpad",
          "janpad news",
          "janpad news live",
          "sonbhadra news",
          "breaking news",
          "aaj ki khabar",
          "today news",
          "latest news",
          "uttar pradesh news",
        ]}
        url={"https://www.janpadnews.live"}
      />
      <HomeRightBar data={homeNews.slice(0, 2)} ytData={ytNews} />
      <RajyaMain />
      <ApnaZila />
      <HomeRightBarOther data={homeNews.slice(2, 4)} />

      {homeNews.length > 4 && (
        <div className="flex spacing mt-2">
          <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full">
            <div className="flex flex-col flex-wrap  md:col-span-4 overflow-hidden">
              {homeNews.slice(4).map((news, index) => (
                <NewsSection key={index} data={news.data} title={news.title} />
              ))}
            </div>
            <div className="col-span-2 w-full">
              <div className="sticky top-32 max-md:hidden">
                <CustomeAndGoogleAdd />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
