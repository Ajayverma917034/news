"use client";
import { useEffect } from "react";

const InArticalAds = () => {
  useEffect(() => {
    if (window.adsbygoogle && window.adsbygoogle.loaded) {
      window.adsbygoogle = [];
    }
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center" }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-5839947415375117"
      data-ad-slot="6423162563"
    ></ins>
  );
};

export default InArticalAds;
