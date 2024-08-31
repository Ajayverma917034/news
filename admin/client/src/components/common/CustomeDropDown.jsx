import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const CustomDropdown = ({ options, selectedOption, onSelectOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  //   console.log(selectedOption);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (index) => {
    onSelectOption(index);
    // Remove or comment out the line below to keep the dropdown open
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        className="w-full bg-white border border-gray rounded-md pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500"
        onClick={toggleDropdown}
      >
        <span className="block truncate font-semibold">
          {options[selectedOption]}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <IoMdArrowDropdown
            size={20}
            className={`${isOpen ? "rotate-180" : ""} text-gray`}
          />
        </span>
      </button>

      {isOpen && (
        <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className={`cursor-pointer select-none py-2 pl-3 pr-9 ${
                index % 2 === 0
                  ? "bg-[#f5f6fa] border-b border-gray"
                  : "bg-white border-b border-gray"
              } hover:bg-blue hover:text-white ${
                selectedOption === index ? "!bg-red text-white" : ""
              }`}
              onClick={() => handleOptionClick(index)}
            >
              <span className="block truncate">{option}</span>
              {/* {selectedOption === index && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L7 13.586 4.707 11.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )} */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
