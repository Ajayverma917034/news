import React from "react";
import GoogleAd from "../../google-ads/GoogleAd";

const HorizontalAdsGoogle = () => {
  return (
    <GoogleAd
      adClient="ca-pub-5839947415375117"
      adSlot="1074914801"
      style={{ display: "block", width: 728, height: 90 }}
      format="auto"
    />
  );
};

export default HorizontalAdsGoogle;
