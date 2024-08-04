import {
  getAds,
  getAdsFail,
  getAdsSuccess,
} from "@/redux/advertisement/adsSlice";
import React from "react";
import { useDispatch } from "react-redux";

const AdvertisementAdsCall = () => {
  const dispatch = useDispatch();

  const fetchAds = async () => {
    try {
      dispatch(getAds());
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-advertisement`
      );

      const data = await res.json();
      dispatch(getAdsSuccess(data));
    } catch (err) {
      dispatch(getAdsFail());
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);
  return <div>AdvertisementAdsCall</div>;
};

export default AdvertisementAdsCall;
