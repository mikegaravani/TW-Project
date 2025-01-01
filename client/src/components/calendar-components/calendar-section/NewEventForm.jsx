import React, { useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomRepeatNEF from "./CustomRepeatNEF";

function NewEventForm({ onClose }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isAllDay, setIsAllDay] = useState(false);

  const [repeatOption, setRepeatOption] = useState("Never");
  const [isCustomRepeatWindowOpen, setIsCustomRepeatWindowOpen] =
    useState(false);

  const handleCustomRepeatWindowOpen = () => {
    setIsCustomRepeatWindowOpen(!isCustomRepeatWindowOpen);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      {/* Popup Modal */}
      <div className="fixed inset-6 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative overflow-auto max-h-screen">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-xl absolute top-3 right-4 text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>

          {/* Form Content */}
          <h2 className="text-xl text-center font-extrabold mb-4">
            Create New Event
          </h2>

          <form>
            <div className="mb-4 border border-gray-300 rounded shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type="text"
                className="text-lg font-bold w-full px-4 pt-2 pb-0 border-none rounded-t focus:outline-none"
                placeholder="Name"
                autoFocus
              />
              <input
                type="text"
                className="text-xs w-full px-4 pt-0 pb-2 border-none rounded-b focus:outline-none"
                placeholder="Location"
              />
            </div>

            <div className="mb-4 border border-gray-300 rounded shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              {/* Start Date */}
              <div className="px-4 py-2 border-b border-gray-300 flex items-center">
                <label
                  htmlFor="startDate"
                  className="text-sm font-medium text-gray-700 whitespace-nowrap"
                >
                  Start:
                </label>

                <DatePicker
                  id="startDate"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  showTimeSelect={!isAllDay}
                  dateFormat={
                    isAllDay ? "MMMM do yyyy" : "MMMM do yyyy 'at' h:mm a"
                  }
                  placeholderText=""
                  wrapperClassName="w-full"
                  className="w-full px-2 py-1 border-none focus:outline-none"
                />
              </div>

              {/* End Date */}
              <div className="px-4 py-2 border-b border-gray-300 flex items-center">
                <label
                  htmlFor="endDate"
                  className="text-sm font-medium text-gray-700 whitespace-nowrap"
                >
                  End:
                </label>
                <DatePicker
                  id="endDate"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  showTimeSelect={!isAllDay}
                  dateFormat={
                    isAllDay ? "MMMM do yyyy" : "MMMM do yyyy 'at' h:mm a"
                  }
                  placeholderText=""
                  wrapperClassName="w-full"
                  className="w-full px-2 py-1 border-none focus:outline-none"
                />
              </div>

              {/* All Day Checkbox */}
              <div className="px-4 py-2 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="allDay"
                  checked={isAllDay}
                  onChange={(e) => setIsAllDay(e.target.checked)}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="allDay"
                  className="text-sm font-medium text-gray-700"
                >
                  All Day
                </label>
              </div>
            </div>

            {/* Repeat Section */}
            <div className="mb-4">
              <label
                htmlFor="repeat"
                className="text-sm font-medium text-gray-700 block mb-1"
              >
                Repeat:
              </label>
              <select
                id="repeat"
                value={repeatOption}
                onChange={(e) => {
                  setRepeatOption(e.target.value);
                  if (e.target.value === "Custom") {
                    handleCustomRepeatWindowOpen();
                  }
                }}
                className="w-full text-sm px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="None">Never</option>
                <option value="Daily">Every Day</option>
                <option value="Weekly">Every Week</option>
                <option value="Biweekly">Every 2 Weeks</option>
                <option value="Monthly">Every Month</option>
                <option value="Yearly">Every Year</option>
                <option onSelect={handleCustomRepeatWindowOpen} value="Custom">
                  Custom
                </option>
              </select>

              {isCustomRepeatWindowOpen && (
                <CustomRepeatNEF
                  onClose={() => {
                    handleCustomRepeatWindowOpen();
                    setRepeatOption("Never");
                  }}
                  // onSave TODO
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
            >
              Save Event
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewEventForm;
