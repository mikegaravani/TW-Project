import React, { useState } from "react";

function EPForm() {
  return (
    <>
      <div>
        <div className="text-left text-xl font-semibold text-gray-800 mb-4">
          Start a new pomodoro...
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Focus:</label>
            <input
              type="text"
              placeholder="30"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Relax:</label>
            <input
              type="text"
              placeholder="5"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Cycles:</label>
            <input
              type="text"
              placeholder="∞"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default EPForm;
