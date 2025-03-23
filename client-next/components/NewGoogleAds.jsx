"use client"; // Ensure this runs on the client side for App Router

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation"; // App Router hook for URL changes

const LazyAdSenseAd = ({
  adClient,
  adSlot,
  adFormat = "auto",
  adStyle = {},
}) => {
  const adRef = useRef(null);
  const pathname = usePathname(); // Tracks route changes in App Router

  // Load the ad when visible
  const loadAd = () => {
    try {
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("AdSense failed to load:", e);
    }
  };

  // Lazy load the ad when it becomes visible
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

  // Reload ads when the route changes (App Router support)
  useEffect(() => {
    loadAd();
  }, [pathname]); // This re-runs when the URL changes in Next.js

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block", ...adStyle }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    ></ins>
  );
};

export default LazyAdSenseAd;
