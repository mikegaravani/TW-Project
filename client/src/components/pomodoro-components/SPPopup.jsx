import React from "react";
import xButton from "../../assets/x-button.png";
import Timeline from "../reusables/Timeline";

const blueColor = "#007bff";
const greenColor = "#28a745";

function SPPopup({ onClose }) {
  // TODO REMOVE TEMPORARY DATA
  const timelineItems = [
    {
      time: "35 min",
      description: "FOCUS",
      color: blueColor,
    },
    {
      time: "5 min",
      description: "BREAK",
      color: greenColor,
    },
    {
      time: "40 min",
      description: "FOCUS",
      color: blueColor,
    },
  ];

  return (
    <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="border-solid border-2 border-black relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Here's your session:
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <img src={xButton} alt="Close" className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          {/* INSERT TIMELINE */}
          <div className="p-4 md:p-5 space-y-4">
            <Timeline items={timelineItems} />
          </div>

          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
            <button
              type="button"
              className="text-white hover:text-white bg-blue-500 hover:bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Confirm and Start
            </button>
            <button
              onClick={onClose}
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 hover:text-black bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SPPopup;
