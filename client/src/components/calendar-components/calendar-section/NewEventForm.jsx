import React from "react";
import moment from "moment";

function NewEventForm({ onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      {/* Popup Modal */}
      <div className="fixed inset-0 mx-4 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
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
                className="text-lg w-full px-4 pt-2 pb-0 border-none rounded-t focus:outline-none"
                placeholder="Name"
                autoFocus
              />
              <input
                type="text"
                className="text-xs w-full px-4 pt-0 pb-2 border-none rounded-b focus:outline-none"
                placeholder="Location"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Enter event description"
              ></textarea>
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
