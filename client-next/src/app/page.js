import CustomeAndGoogleAdd from "@/components/ads/CustomeAndGoogleAdd";
import ApnaZila from "@/components/ApnaZila";
import NewsSection from "@/components/news-section/news.section.component";
import NewsVideo from "@/components/news-video/news.video.section.component";
import Notification from "@/components/Notification";
import RajyaMain from "@/components/RajyaMain";
import SideNews from "@/components/side-news/SideNews";

export default async function Page() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/news/home`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            revalidate: 10,
        },
        body: JSON.stringify({
            data: ["बड़ी ख़बरें", "uttar pradesh", "crime", "education"],
        }),
    });

    let news = []
    if (response.ok) {
        news = await response.json();
    }

    if (news.success === false) {
        news.data = [{ data: [], title: '' }, { data: [], title: '' }, { data: [], title: '' }, { data: [], title: '' }]
    }



    const response2 = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/news/youtube`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            revalidate: 10,
        },
        body: JSON.stringify({
            data: ["बड़ी ख़बरें", "uttar pradesh", "crime", "education"],
        }),
    });


    if (!response2.ok) {
        throw new Error("Failed to fetch data");
    }

    let YtData = await response2.json();
    let Ytnews = YtData?.news

    // if (news.success === false) {
    //     // news.data = [{ data: [], title: '' }, { data: [], title: '' }, { data: [], title: '' }, { data: [], title: '' }]
    // }


    return (
        <main>
            <div className="flex flex-col spacing mt-2 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full md:gap-5 ">
                    <div className="flex flex-col flex-wrap  md:col-span-4 overflow-hidden bg-white">
                        {
                            news && news.data &&
                            <NewsSection title={news?.data[0]?.title} />

                        }



                        {/* <div className=" flex items-center justify-center">

                            <div className="max-sm:h-[320px] max-sm:w-[320px] w-[420px] h-[420px]">

                                <Image
                                    src={wish_independence_day}
                                    width={320}
                                    height={320}
                                    alt="Independence Day"
                                    sizes={{
                                        maxWidth: "100%",
                                        height: "auto",
                                    }}
                                />
                            </div>
                        </div> */}
                        {
                            Ytnews &&
                            <NewsVideo data={Ytnews} title={'Top Videos'} />
                        }
                    </div>
                    <div className="col-span-2 w-full">
                        <div className="sticky top-44 max-md:hidden">
                            <CustomeAndGoogleAdd />
                            <SideNews title={"education"} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <ApnaZila />
            </div>
            <div className="flex flex-col w-full">
                <RajyaMain />

            </div>

            {news && news.data && news.data.length > 1 && (
                <div className="flex flex-col spacing mt-2 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full md:gap-x-5">
                        <div className="flex flex-col flex-wrap  md:col-span-4 overflow-hidden">
                            {news.data.slice(1, 3).map((news, index) => (
                                <NewsSection key={index} data={news.data} title={news.title}
                                    adInd={2 + index} />
                            ))}
                        </div>
                        <div className="col-span-2 w-full">
                            <div className="sticky top-44 max-md:hidden">
                                <CustomeAndGoogleAdd />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {news && news.data && news.data.length > 3 && (
                <div className="flex flex-col spacing mt-2 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto w-full md:gap-x-5">
                        <div className="flex flex-col flex-wrap  md:col-span-4 overflow-hidden">
                            {news.data.slice(4).map((news, index) => (
                                <NewsSection adInd={4 + index} key={index} data={news.data} title={news.title} />
                            ))}
                        </div>
                        <div className="col-span-2 w-full">
                            <div className="sticky top-44 max-md:hidden">
                                <CustomeAndGoogleAdd />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}