import React from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

function CalendarSection() {
  const eventList = [
    {
      title: "Meeting",
      start: new Date(2024, 11, 29, 10, 0), // Year, Month (0-indexed), Day, Hours, Minutes
      end: new Date(2024, 11, 29, 11, 0),
    },
    {
      title: "Lunch",
      start: new Date(2024, 11, 29, 12, 0),
      end: new Date(2024, 11, 29, 13, 0),
    },
  ];
  return (
    <>
      <div className="">
        <BigCalendar
          localizer={localizer}
          events={eventList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </>
  );
}

export default CalendarSection;
