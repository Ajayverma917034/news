"use client";
import React, { useEffect } from "react";

const GoogleAds = ({ adClient, adSlot, style, format }) => {
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
    <div className="adsense-ad" style={style}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={format}
      ></ins>
    </div>
  );
};

export default GoogleAds;
