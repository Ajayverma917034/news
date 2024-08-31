import React, { useState, useEffect } from "react";
import CustomDropdown from "./CustomeDropDown";

const SchedulePopUp = ({
  popupOpen,
  setPopUpOpen,
  handleSchedule,
  post_time,
  handleTimeChange,
  handleDateChange,
  selectedTimeIndex,
  timeOptions,
}) => {
  const [dateValue, setDateValue] = useState("");
  const [timeIndex, setTimeIndex] = useState(selectedTimeIndex);

  useEffect(() => {
    if (post_time?.date) {
      // Extract the date in 'YYYY-MM-DD' format
      const date = new Date(post_time.date).toISOString().split("T")[0];
      setDateValue(date);
    }

    if (post_time?.time) {
      // Find the index of the time in timeOptions
      const index = timeOptions.findIndex(
        (option) => option === post_time.time
      );
      setTimeIndex(index !== -1 ? index : 0); // Set to 0 or a fallback if not found
    }
  }, [post_time, timeOptions]);

  if (!popupOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.className.includes("disable")) {
      return;
    }
    e.target.classList.add("disable");
    handleSchedule();
    e.target.classList.remove("disable");
  };

  const handleDateChangeInternal = (e) => {
    setDateValue(e.target.value);
    handleDateChange(e);
  };

  const handleTimeChangeInternal = (index) => {
    setTimeIndex(index);
    handleTimeChange(timeOptions[index]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-white w-full max-w-lg mx-2 md:mx-4 lg:mx-6 rounded-lg relative p-10 min-h-[500px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Schedule post</h2>
          <button
            onClick={() => setPopUpOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            ✖
          </button>
        </div>

        <div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={dateValue}
              onChange={handleDateChangeInternal}
              className="w-full p-2 bg-gray-100 text-black rounded border border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Time</label>
            <CustomDropdown
              options={timeOptions}
              selectedOption={timeIndex}
              onSelectOption={handleTimeChangeInternal}
            />
          </div>

          <div className="flex justify-end mt-10">
            <button
              type="button"
              onClick={() => setPopUpOpen(false)}
              className="bg-gray hover:bg-gray text-white py-2 px-4 rounded mr-2"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue hover:bg-blue text-white py-2 px-4 rounded"
            >
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePopUp;
