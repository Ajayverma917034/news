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
import BottomPopUp from "@/components/BottomPopUp";
import Script from "next/script";

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
          <AdSense />
        </head>
        <body className={aneka.className}>

          <Navbar />
          <Toaster />
          <SliderAds />
          <BreakingNews />
          {children}
          <Footer />
          <Script
            id="clever-core"
            type="text/javascript"
            data-cfasync="false"
            dangerouslySetInnerHTML={{
              __html: `
            (function(document, window) {
              var a, c = document.createElement("script"), f = window.frameElement;
              c.id = "CleverCoreLoader84781";
              c.src = "https://scripts.cleverwebserver.com/6abe2dc524aa837f52f47e46e9a1e795.js";
              c.async = true;
              c.type = "text/javascript";
              c.setAttribute("data-target", window.name || (f && f.getAttribute("id")));
              c.setAttribute("data-callback", "put-your-callback-function");
              c.setAttribute("data-callback-url-click", "put-your-click-macro-here");
              c.setAttribute("data-callback-url-view", "put-your-view-macro-here");
              try {
                a = parent.document.getElementsByTagName("script")[0] || document.getElementsByTagName("script")[0];
              } catch (e) {
                a = false;
              }
              a || (a = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
              a.parentNode.insertBefore(c, a);
            })(document, window);
          `,
            }}
          />
        </body>
      </html>
    </CustomeAdsContextProvider>
  );
}
