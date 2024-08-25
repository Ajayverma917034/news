import React from "react";
import GoogleAds from "./GoogleAds";

const HorizontalAds = ({ adClient, adSlot, style, format }) => {
  return (
    <GoogleAds
      adClient={adClient}
      adSlot={adSlot}
      style={style}
      format={format}
    />
  );
};

export default HorizontalAds;
