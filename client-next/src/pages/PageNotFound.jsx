"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import banner from "../assets/page-not-found.png";
import Image from "next/image";

const PageNotFound = () => {
  const router = useRouter();
  useEffect(() => {
    // Redirect to the home page after 10 seconds
    const timer = setTimeout(() => {
      router.push("/"); // Redirect to home page
    }, 10000); // 10000 milliseconds = 10 seconds

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className="flex items-center justify-center p-2">
      <Image
        src={banner}
        alt="Page not found"
        height={1200}
        width={500}
        className="w-full max-w-4xl"
      />
    </div>
  );
};

export default PageNotFound;
