import React, { useState } from "react";

function EPForm() {
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
            <select className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Custom</option>
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
          </div>

          <div className="flex flex-col">
            <label className="text-left text-gray-700 font-medium mb-1">
              Relax:
            </label>
            <select className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Custom</option>
              <option value="3">3 minutes</option>
              <option value="5" selected>
                5 minutes
              </option>
              <option value="10">10 minutes</option>
              <option value="15">15 minutes</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-left text-gray-700 font-medium mb-1">
              Cycles:
            </label>
            <select className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">Custom</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="3">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="∞" selected>
                ∞
              </option>
            </select>
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
