import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Dropdown = ({
  selectedOption,
  setSelectedOption,
  options,
  handleOptionClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-36 md:w-56">
      <button
        className="w-full bg-white border outline-none border-none border-gray-300 rounded-md shadow-sm pl-2 md:pl-3 pr-5 md:pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
        onClick={toggleDropdown}
      >
        <span className="block truncate font-semibold">
          {options[selectedOption]}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <IoMdArrowDropdown
            size={20}
            className={`${isOpen ? "rotate-180" : ""} text-blue`}
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10 max-h-60 overflow-auto">
          <ul
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-item-3"
            className="py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            {options.map((option, index) => (
              <li
                key={index}
                role="option"
                className=" cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue hover:text-white"
                onClick={() => {
                  handleOptionClick(index), setIsOpen(false);
                }}
              >
                <span className="font-medium  block truncate">{option}</span>
                {selectedOption === index && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-red">
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
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
