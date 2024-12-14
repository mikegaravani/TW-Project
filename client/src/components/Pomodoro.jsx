import React, { useState, useEffect } from "react";
import BasicPomodoro from "./pomodoro-components/BasicPomodoro";
import SPPomodoro from "./pomodoro-components/SPPomodoro";
import EntryPage from "./pomodoro-components/EntryPage";
import SPBuilder from "./pomodoro-components/SPBuilder";

// TODO check if these work from here
const blueColor = "#007bff";
const greenColor = "#28a745";

// CONDITIONAL RENDERING

function Pomodoro() {
  const [currentPage, setCurrentPage] = useState("entryPage");

  const handleStart = (cycles) => {
    if (cycles === "infinity") {
      setCurrentPage("basicPomodoro");
    } else {
      setCurrentPage("sPPomodoro");
    }
  };

  const handleSPClick = () => {
    setCurrentPage("sPBuilder");
  };

  const handleSPStart = () => {
    setCurrentPage("sPPomodoro");
  };

  return (
    <>
      {currentPage === "entryPage" && (
        <EntryPage onStart={handleStart} onSPClick={handleSPClick} />
      )}
      {currentPage === "basicPomodoro" && <BasicPomodoro />}
      {currentPage === "sPBuilder" && (
        <SPBuilder onStartSession={handleSPStart} />
      )}
      {currentPage === "sPPomodoro" && <SPPomodoro />}
    </>

    // TODO for testing only
    // <>
    //   <SPBuilder onStartSession={handleSPStart} />
    // </>
  );
}

export default Pomodoro;
