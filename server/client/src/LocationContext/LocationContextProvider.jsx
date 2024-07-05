import React, { useState } from "react";

// Loader Context Hook
import { LocationContext } from "./LocationContext";

const LocationContextProvider = ({ children }) => {
  // Loader Data UseState
  const [openLocation, setOpenLocation] = useState(false);

  // Location Fetched UseState
  const [isLocationFetched, setIsLocationFetched] = useState(false);

  // Postcode UseState
  const [postcode, setPostcode] = useState("");

  return (
    // LocationContext Provider
    <LocationContext.Provider
      value={{
        openLocation,
        setOpenLocation,
        isLocationFetched,
        setIsLocationFetched,
        postcode,
        setPostcode,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContextProvider;
