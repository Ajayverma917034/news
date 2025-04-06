import React, { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

const PopUp = ({
  isOpen,
  onClose,
  children,
  heading = "PopUp",
  classes = "",
}) => {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[1000] flex justify-center items-center bg-black bg-opacity-20 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`bg-white dark:bg-grayLight w-full max-w-lg mx-4 p-2 sm:p-4 md:mx-6 lg:mx-5 rounded-md md:rounded-lg ${classes}`}
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="flex justify-between items-center">
          <h4 className="text_20 text-black dark:text-white font-medium">
            {heading}
          </h4>
          <button
            onClick={() => onClose()}
            className="mb-3 text-red shadow-regular dark:shadow-none rounded-full p-1 dark:border-red dark:border-2"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
        <div className="p-2 sm:p-3 md:p-4 text-black dark:text-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PopUp;
