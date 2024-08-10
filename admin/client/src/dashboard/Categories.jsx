// src/CategoryRead.js
import React from "react";
import { IoEye } from "react-icons/io5";

const categories = [
  { name: "उत्तर प्रदेश", views: 25000 },
  { name: "मध्यप्रदेश", views: 25000 },
  { name: "छत्तीसगढ़", views: 25000 },
  { name: "बिहार", views: 25000 },
  { name: "झारखंड", views: 25000 },
  { name: "राशिफल", views: 25000 },
  { name: "देश", views: 25000 },
  { name: "क्राइम", views: 25000 },
  { name: "कैरियर", views: 25000 },
  { name: "हेल्थ", views: 25000 },
  { name: "फ़िल्म", views: 25000 },
  { name: "धर्म", views: 25000 },
  { name: "राशिफल", views: 25000 },
];

const CategoryRead = () => {
  return (
    <div className="max-w-4xl mx-auto py-2">
      <h2 className="text-4xl font-semibold mb-4 border-b-2 ">
        Category wise Total Read
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 rounded shadow gap-2"
          >
            <span>{category.name}</span>
            <div className="flex flex-col justify-center items-center">
              <span>{category.views.toLocaleString()}</span>
              <IoEye />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryRead;
