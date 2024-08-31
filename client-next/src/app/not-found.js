import PageNotFound from "@/pages/PageNotFound";


export const metadata = {
    title: "404",
    author: "Janpad News Team",
    twitter: {
        card: "summary_large_image",
    },
    metadataBase: new URL("https://janpadnewslive.com"),
    openGraph: {
        type: "article",
        url: "https://janpadnewslive.com",
        title: "404",
        images: [
            {
                url: "../../assets/janpad_news_live.png",
                width: 800,
                height: 600,
                alt: "404",
            },
        ],
    },
    alternates: {
        canonical: "https://janpadnewslive.com",
    },
};
export default function NotFound() {



    return (
        <PageNotFound />
    );
}
