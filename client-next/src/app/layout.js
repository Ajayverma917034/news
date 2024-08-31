import { Anek_Devanagari, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/header/Navbar";
import { StoreProvider } from "@/redux/StoreProvider";
import BreakingNews from "@/components/breaking-news/BreakingNews";
import SliderAds from "@/components/ads/SliderAds";
import { Toaster } from "react-hot-toast";
import AdSense from "../../components/AdSense";
import Footer from "@/components/Footer";
import { CustomeAdsContextProvider } from "@/lib/CustomeAdsContext";

// const aneka = Anek_Devanagari({ subsets: ["devanagari"] });
const aneka = Anek_Devanagari({ subsets: ['devanagari'] });
export const metadata = {
  title: {
    default: "Home - Janpad News Live",
    template: "%s - Janpad News Live",
  },
  description: "Janpad News Live (जनपद न्यूज़ लाइव): Latest News (लेटेस्ट खबरें), Breaking News  (ब्रेकिंग न्यूज़), World (विश्व), Sports (खेल), Business, Entertainment (मनोरंजन).",
  keywords: "janpad, janpad news, janpad news live, sonbhadra news, breaking news, aaj ki khabar, today news, latest news, uttar pradesh news",
  author: "Janpad News Team",
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL('https://janpadnewslive.com'),
  openGraph: {
    type: "article",
    url: "https://janpadnewslive.com",
    title: "Janpad News Live",
    description: "Janpad News Live (जनपद न्यूज़ लाइव): Latest News (लेटेस्ट खबरें), Breaking News  (ब्रेकिंग न्यूज़), World (विश्व), Sports (खेल), Business, Entertainment (मनोरंजन).",
    images: [
      {
        url: "../assets/janpad_news_live.png",
        width: 800,
        height: 600,
        alt: "Janpad News Live",
      },
    ],
  },
  alternates: {
    canonical: "https://janpadnewslive.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <CustomeAdsContextProvider>
      <html lang="en">
        <head>
          {/* Add the AdSense script here */}
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5839947415375117"
            crossOrigin="anonymous"
          ></script>
        </head>
        <body className={aneka.className}>

          <Navbar />
          <Toaster />
          <SliderAds />
          <BreakingNews />
          {children}
          <Footer />
        </body>
      </html>
    </CustomeAdsContextProvider>
  );
}
