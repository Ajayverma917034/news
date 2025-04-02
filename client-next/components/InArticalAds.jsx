"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const InArticleAds = () => {
  const adRef = useRef(null);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // Function to load Google Ads
  const loadAd = () => {
    try {
      if (
        typeof window !== "undefined" &&
        window.adsbygoogle &&
        adRef.current
      ) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("AdSense failed to load:", e);
    }
  };

  // Detect mobile vs desktop screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Lazy load ads when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadAd();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (adRef.current) observer.observe(adRef.current);
    return () => observer.disconnect();
  }, []);

  // Reload ads on route changes
  useEffect(() => {
    loadAd();
  }, [pathname]);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{
        display: "block",
        textAlign: "center",
        width: isMobile ? "100%" : "728px",
        height: isMobile ? "250px" : "90px",
      }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-full-width-responsive="true"
      data-ad-client="ca-pub-5839947415375117"
      data-ad-slot="6423162563"
    ></ins>
  );
};

export default InArticleAds;
