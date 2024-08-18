import React, { useEffect, useRef } from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm = null,
  title = "Are you sure you want to delete this item? This action cannot be undone.",
  bg = "bg-red",
  button = "Delete",
}) => {
  const modalRef = useRef(null);

  if (!onConfirm) {
    onConfirm = onClose;
  }
  // console.log(onConfirm);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close the modal if click is outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener when modal is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1002] bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
      >
        <div className="flex justify-between items-center">
          <h3 className="!text-4xl font-semibold">Are you sure?</h3>
          <button
            className="text-gray hover:text-red text-[30px]"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <p className="mb-4">{title}</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray text-white rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 text-white rounded hover:bg-red-700 ${bg}`}
            onClick={onConfirm}
          >
            {button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
