// Session Planner Pomodoro component
import React, { useState, useEffect } from "react";
import lightbulb from "../../assets/lightbulb.png";
import SPTimer from "./SPTimer";

function SPPomodoro() {
  const [currentMode, setCurrentMode] = useState("focus");

  const handleStateChange = (mode) => {
    setCurrentMode(mode);
  };
  return (
    <>
      <div
        className={`flex flex-col min-h-screen font-sans p-5 ${
          currentMode === "focus"
            ? "bg-gradient-to-b from-[#f7f9fc] to-[#007bff4c]"
            : "bg-gradient-to-b from-[#f7f9fc] to-[#28a7454c]"
        }`}
      >
        <div className="w-full">
          <h1
            className={`text-left inline-block text-4xl sm:text-3xl font-bold`}
          >
            Your pomodoro, user
          </h1>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center">
          <div
            className={`relative w-full max-w-3xl bg-gray-100 p-5 rounded-lg shadow-md border-8 ${
              currentMode === "focus" ? "border-blue-500" : "border-green-500"
            } text-center`}
          >
            <div className="mt-5">
              <SPTimer onStateChange={handleStateChange} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SPPomodoro;
