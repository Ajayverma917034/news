// LoadingSpinner.jsx
import React from "react";
import "./LoadingSpinner.css";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="spinner ">
        <div className="circle circle-blue"></div>
        <div className="circle circle-red"></div>
        <div className="loading-text">LOADING</div>
      </div>
    </div>
  );
};

export default Loader;
