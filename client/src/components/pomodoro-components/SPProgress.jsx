import React from "react";
import Timeline from "../reusables/Timeline";

const blueColor = "#007bff";
const greenColor = "#28a745";

function SPProgress() {
  const timelineItems = [
    {
      time: "35 min",
      description: "FOCUS",
      color: blueColor,
    },
    {
      time: "5 min",
      description: "RELAX",
      color: greenColor,
    },
    {
      time: "40 min",
      description: "FOCUS",
      color: blueColor,
    },
    {
      time: "5 min",
      description: "RELAX",
      color: greenColor,
    },
    {
      time: "40 min",
      description: "FOCUS",
      color: blueColor,
    },
    {
      time: "5 min",
      description: "RELAX",
      color: greenColor,
    },
    {
      time: "40 min",
      description: "FOCUS",
      color: blueColor,
    },
  ];

  return (
    <>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Next up:</h2>
        <Timeline items={timelineItems} />
      </div>
    </>
  );
}

export default SPProgress;
