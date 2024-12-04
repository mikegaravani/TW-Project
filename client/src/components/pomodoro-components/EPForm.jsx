import React, { useState } from "react";

function EPForm() {
  const [focusValue, setFocusValue] = useState("30");
  const [relaxValue, setRelaxValue] = useState("5");
  const [cyclesValue, setCyclesValue] = useState("infinity");
  const [customFocus, setCustomFocus] = useState("");
  const [customRelax, setCustomRelax] = useState("");
  const [customCycles, setCustomCycles] = useState("");

  return (
    <>
      <div className="flex-1">
        <div className="text-left text-xl font-semibold text-gray-800 mb-4">
          Start a new pomodoro...
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-left text-gray-700 font-medium mb-1">
              Focus:
            </label>
            <select
              value={focusValue}
              onChange={(e) => setFocusValue(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="custom">Custom</option>
              <option value="15">15 minutes</option>
              <option value="20">20 minutes</option>
              <option value="25">25 minutes</option>
              <option value="30" selected>
                30 minutes
              </option>
              <option value="35">35 minutes</option>
              <option value="40">40 minutes</option>
              <option value="50">50 minutes</option>
              <option value="60">1 hour</option>
            </select>
            {focusValue === "custom" && (
              <input
                type="number"
                placeholder="Enter focus time in minutes:"
                value={customFocus}
                onChange={(e) => setCustomFocus(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-left text-gray-700 font-medium mb-1">
              Relax:
            </label>
            <select
              value={relaxValue}
              onChange={(e) => setRelaxValue(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="custom">Custom</option>
              <option value="3">3 minutes</option>
              <option value="5" selected>
                5 minutes
              </option>
              <option value="10">10 minutes</option>
              <option value="15">15 minutes</option>
            </select>
            {relaxValue === "custom" && (
              <input
                type="number"
                placeholder="Enter relax time in minutes:"
                value={customRelax}
                onChange={(e) => setCustomRelax(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-left text-gray-700 font-medium mb-1">
              Cycles:
            </label>
            <select
              value={cyclesValue}
              onChange={(e) => setCyclesValue(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="custom">Custom</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="3">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="infinity" selected>
                ∞
              </option>
            </select>
            {cyclesValue === "custom" && (
              <input
                type="number"
                placeholder="Enter number of cycles:"
                value={customCycles}
                onChange={(e) => setCustomCycles(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            )}
          </div>
          <button className="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-300">
            Start
          </button>
        </div>
      </div>
    </>
  );
}

export default EPForm;
