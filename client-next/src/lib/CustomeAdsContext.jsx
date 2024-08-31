"use client";
// context/MyContext.js
import { createContext, useState } from "react";

// Create the context
export const CustomeAdsContext = createContext();

// Create a provider component
export const CustomeAdsContextProvider = ({ children }) => {
  const [ads, setAds] = useState({
    detailAds: [],
    sideAds: [],
    bannerAds: [],
  });

  const updateAds = (response) => {
    // Destructure the response to extract detailAds, sideAds, and bannerAds
    const { detailAds, sideAds, bannerAds } = response;

    // Update the ads state
    setAds((prevAds) => ({
      ...prevAds,
      detailAds: detailAds || prevAds.detailAds, // Use existing state if no new data
      sideAds: sideAds || prevAds.sideAds, // Use existing state if no new data
      bannerAds: bannerAds || prevAds.bannerAds, // Use existing state if no new data
    }));
  };

  return (
    <CustomeAdsContext.Provider value={{ ads, updateAds }}>
      {children}
    </CustomeAdsContext.Provider>
  );
};
