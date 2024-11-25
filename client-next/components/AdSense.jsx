import Script from "next/script";
import React from "react";

const AdSense = () => {
  return process.env.NODE_ENV === "development" ? null : (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5839947415375117`}
      crossOrigin="anonymous"
    />
  );
};

export default AdSense;
