import React from "react";
import GoogleAds from "./GoogleAds";

const HorizontalAds = () => {
  return (
    <GoogleAds
      adClient="ca-pub-5839947415375117"
      adSlot="8542991653"
      style={{ display: "block", width: "100%", height: 90 }}
      format="auto"
    />
  );
};

export default HorizontalAds;
