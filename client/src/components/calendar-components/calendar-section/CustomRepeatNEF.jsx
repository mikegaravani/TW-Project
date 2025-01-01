import React, { useState } from "react";

function CustomRepeatNEF({ onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      {/* Popup Modal */}
      <div className="fixed inset-10 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative overflow-auto max-h-screen">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-xl absolute top-3 right-4 text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>

          {/* Form Content */}
          <h2 className="text-xl text-center font-extrabold mb-4">Custom</h2>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default CustomRepeatNEF;
