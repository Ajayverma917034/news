import React from "react";
import GoogleAds from "./GoogleAds";

const HorizontalAds = ({ adClient, adSlot, style, format }) => {
  return (
    <GoogleAds
      adClient="ca-pub-5839947415375117"
      adSlot="8542991653"
      style={{ display: "block", width: "100%", height: "100%" }}
      format="auto"
    />
  );
};

export default HorizontalAds;
