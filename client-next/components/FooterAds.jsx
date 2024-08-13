import React from "react";
import GoogleAds from "./GoogleAds";

const FooterAds = () => {
  return (
    <GoogleAds
      adClient={"ca-pub-5839947415375117"}
      adSlot={"3540617420"}
      style={{ display: "block" }}
      format={"autorelaxed"}
    />
  );
};

export default FooterAds;
