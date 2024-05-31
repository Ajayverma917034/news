import React from "react";
import { useParams } from "react-router-dom";

const DistrictNews = () => {
  const { district, state } = useParams();

  console.log(district, state);
  return <div>DistrictNews</div>;
};

export default DistrictNews;
