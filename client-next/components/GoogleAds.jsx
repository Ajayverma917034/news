"use client";
import React, { useEffect } from "react";

const GoogleAds = ({ adClient, adSlot, style, format }) => {
  try {
    useEffect(() => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, []);
  } catch (error) {
    console.log(error.message);
  }

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
