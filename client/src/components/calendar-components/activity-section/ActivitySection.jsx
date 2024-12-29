import React from "react";

function ActivitySection() {
  return (
    <>
      <h2 className="text-xl font-bold mb-2">Activity Selected</h2>
      <ul className="list-disc pl-6 space-y-2">
        {[...Array(10)].map((_, idx) => (
          <li key={idx} className="text-gray-700">
            Activity {idx + 1}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ActivitySection;
