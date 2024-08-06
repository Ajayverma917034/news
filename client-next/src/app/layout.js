"use client"
import { Anek_Devanagari } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/Footer/Footer";
// import SliderAds from "@/components/ads/SliderAds";
import BreakingNews from "@/components/breaking-news/BreakingNews";

const aneka = Anek_Devanagari({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={aneka.className}>
        <Navbar />
        {/* <SliderAds /> */}
        <BreakingNews />
        {children}
        <Footer />

      </body>
    </html>
  );
}
