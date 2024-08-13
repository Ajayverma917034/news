import React from "react";
import GoogleAds from "./GoogleAds";

const SquareAds = () => {
  return (
    <GoogleAds
      adClient="ca-pub-5839947415375117"
      adSlot="6386272613"
      style={{ display: "block", width: "100%", height: "100%" }}
      format="auto"
    />
  );
};

export default SquareAds;
