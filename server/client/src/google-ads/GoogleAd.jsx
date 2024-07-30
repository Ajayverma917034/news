import React, { useEffect } from "react";

const GoogleAd = ({ adClient, adSlot, style, format }) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
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

export default GoogleAd;
