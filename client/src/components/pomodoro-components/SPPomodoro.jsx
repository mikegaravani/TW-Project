// Session Planner Pomodoro component
import React, { useState, useEffect } from "react";
import lightbulb from "../../assets/lightbulb.png";
import SPTimer from "./SPTimer";
import SPProgress from "./SPProgress";
import arrowBack from "../../assets/arrow-back.png";

function SPPomodoro() {
  const [currentMode, setCurrentMode] = useState("focus");

  const handleStateChange = (mode) => {
    setCurrentMode(mode);
  };

  return (
    <>
      <div
        className={`flex flex-col min-h-screen font-sans p-5 relative ${
          currentMode === "focus"
            ? "bg-gradient-to-b from-[#f7f9fc] to-[#007bff4c]"
            : "bg-gradient-to-b from-[#f7f9fc] to-[#28a7454c]"
        }`}
      >
        <div className="text-center inline-block text-3xl text-gray-800 my-3 font-bold font-sans transition-transform duration-300 whitespace-nowrap">
          <h1 className="text-3xl lg:text-5xl font-bold">
            Your pomodoro, user
          </h1>
        </div>

        {/* Main Content Wrapper */}
        <div className="flex-1 flex flex-col lg:flex-row justify-center items-center relative">
          {/* Timer Section */}
          <div
            className={`w-full lg:w-2/3 max-w-lg bg-gray-100 p-5 rounded-lg shadow-md border-8 mt-4 lg:mx-8 ${
              currentMode === "focus" ? "border-blue-500" : "border-green-500"
            } text-center`}
          >
            <div className="mt-5">
              <SPTimer onStateChange={handleStateChange} />
            </div>
          </div>

          {/* New Tab Section */}
          <div className="bg-gray-100 p-5 rounded-lg shadow-md w-full lg:w-1/4 mt-4 mb-0 lg:mt-0 lg:max-h-[500px] lg:overflow-y-scroll">
            <SPProgress />
          </div>
        </div>
      </div>
    </>
  );
}

export default SPPomodoro;
