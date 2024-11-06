"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect } from "react";

const GoogleAdUnitClient = ({ isProduction, children }) => {
  const pathname = useParams();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (isProduction) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      //   if (window.adsbygoogle && window.adsbygoogle.loaded) {
      //     window.adsbygoogle = [];
      //   }
      //   try {
      //     (window.adsbygoogle = window.adsbygoogle || []).push({});
      //   } catch (e) {
      //     console.error("AdSense error", e);
      //   }
    }
  }, [pathname, searchParams]);
  return <Fragment>{children}</Fragment>;
};

export default GoogleAdUnitClient;
