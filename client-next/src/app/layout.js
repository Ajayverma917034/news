import { Anek_Devanagari } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/Footer/Footer";

const aneka = Anek_Devanagari({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={aneka.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}