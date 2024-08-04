"use client";
import {
  getAds,
  getAdsFail,
  getAdsSuccess,
} from "@/redux/advertisement/adsSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const AddSore = () => {
  const dispatch = useDispatch();
  const fetchAds = async () => {
    try {
      dispatch(getAds());
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/get-advertisement`
      );
      dispatch(getAdsSuccess(data));
    } catch (err) {
      dispatch(getAdsFail());
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);
  return <></>;
};

export default AddSore;
