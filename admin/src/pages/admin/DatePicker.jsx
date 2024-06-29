import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const CustomDatePicker = ({ selectedOptions, setSelectedOptions }) => {
  const [show, setShow] = useState(false);
  const [internalDate, setInternalDate] = useState(selectedOptions.createdAt);

  useEffect(() => {
    setInternalDate(selectedOptions.createdAt);
  }, [selectedOptions.createdAt]);

  const handleDateChange = (date) => {
    setInternalDate(date);
  };

  console.log(internalDate);
  setSelectedOptions({ ...selectedOptions, createdAt: internalDate });
  const handleOkClick = () => {
    setSelectedOptions({ ...selectedOptions, createdAt: internalDate });
    setShow(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div
        className="flex justify-between items-center bg-red text-white p-4 rounded-t-lg cursor-pointer"
        onClick={() => setShow(true)}
      >
        <span className="font-semibold">SELECT DATE</span>
        <FaCalendarAlt />
      </div>
      {show && (
        <div className="p-4 flex items-center justify-center flex-col">
          <DatePicker
            selected={internalDate}
            onChange={handleDateChange}
            inline
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex justify-between items-center mb-2">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  className="focus:outline-none"
                >
                  <FaAngleLeft size={25} />
                </button>
                <div>
                  <select
                    value={date.getFullYear()}
                    onChange={({ target: { value } }) => changeYear(value)}
                    className="bg-gray-200 text-blue p-1 rounded-md mr-1"
                  >
                    {[...Array(100)].map((_, i) => {
                      const year = new Date().getFullYear() - 50 + i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>

                  <select
                    value={date.getMonth()}
                    onChange={({ target: { value } }) => changeMonth(value)}
                    className="bg-gray-200 text-black p-1 rounded-md"
                  >
                    {Array.from({ length: 12 }, (e, i) => (
                      <option key={i} value={i}>
                        {new Date(0, i).toLocaleString("en-US", {
                          month: "long",
                        })}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  className="focus:outline-none"
                >
                  <FaAngleRight size={25} />
                </button>
              </div>
            )}
          />
          <div className="flex justify-between items-center p-4 border-t w-full mt-3">
            <button className="text-gray-500" onClick={() => setShow(false)}>
              CANCEL
            </button>
            <button className="text-blue" onClick={handleOkClick}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
