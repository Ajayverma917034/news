import React, { Suspense } from "react";
import GoogleAdUnitClient from "./GoogleAdUnitClient";

const GoogleAdUnit = ({ children }) => {
  return (
    <Suspense>
      <GoogleAdUnitClient
        isProduction={process.env.NEXT_NODE_ENV == "production"}
      >
        {children}
      </GoogleAdUnitClient>
    </Suspense>
  );
};

export default GoogleAdUnit;
