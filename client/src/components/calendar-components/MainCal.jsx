import React, { useState } from "react";
import ActivitySection from "./activity-section/ActivitySection";
import CalendarSection from "./calendar-section/CalendarSection";
import NewEventForm from "./calendar-section/NewEventForm";

function MainCal() {
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);

  const handleEventFormOpen = () => {
    setIsEventFormOpen(!isEventFormOpen);
  };
  return (
    <>
      <div className="p-4 bg-gray-100 min-h-screen">
        {/* Header Section */}
        <h1 className="text-2xl font-bold mb-4">Your Calendar</h1>

        <div className="flex space-x-4 mb-6">
          {/* New Event Button */}
          <button
            onClick={handleEventFormOpen}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            New Event
          </button>

          {/* New Activity Button */}
          <button className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600">
            New Activity
          </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-4">
          {/* Calendar Section */}
          <div className="flex-1 bg-white p-4 rounded shadow mb-4 lg:mb-0">
            <CalendarSection />
          </div>

          {/* Activity Section */}
          <div className="w-full lg:w-1/3 bg-white p-4 rounded shadow">
            <ActivitySection />
          </div>
        </div>
      </div>

      {/* New Event Form */}
      {isEventFormOpen && <NewEventForm onClose={handleEventFormOpen} />}
    </>
  );
}

export default MainCal;
