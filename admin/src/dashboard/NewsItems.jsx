// src/NewsItem.js
import React from 'react';
import sampleImage from './cc.jpg'; // Import the provided image
import { IoEye } from "react-icons/io5";

const NewsItem = ({ title, views }) => {
  return (
    <div className="flex mx-4 items-center px-4 py-3  mt-4 border-b gap-3 border-gray">
      <img className="w-24 h-16 object-cover rounded" src={sampleImage} alt="News" />
      <div className="ml-4 flex-grow">
        <h3 className="text-xl font-medium">{title}</h3>
      </div>
      <div className="flex flex-col items-center text-lg font-semibold text-gray">
        <span className="mr-2">{views}</span>
        <IoEye />
      </div>
    </div>
  );
};

export default NewsItem;
