"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const LazyLoadAd = () => {
  const adRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const loadAd = () => {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          loadAd();
          observer.unobserve(adRef.current); // Stop observing after loading
        }
      },
      { threshold: 0.5 } // Load ad when 50% of it is visible
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => {
      if (adRef.current) observer.unobserve(adRef.current);
    };
  }, [router.pathname]); // Reload ads when the URL changes

  return (
    <div className="flex flex-col w-full h-[10rem] bg-[#f0f0f0] mb-1 mt-2">
      <p className="text-center">Advertisement</p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5839947415375117"
        data-ad-slot="5640963314"
        data-ad-format="auto"
      ></ins>
    </div>
  );
};

export default LazyLoadAd;
