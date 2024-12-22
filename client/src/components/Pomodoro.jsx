import React, { useState, useEffect } from "react";
import BasicPomodoro from "./pomodoro-components/BasicPomodoro";
import SPPomodoro from "./pomodoro-components/SPPomodoro";
import EntryPage from "./pomodoro-components/EntryPage";
import SPBuilder from "./pomodoro-components/SPBuilder";
import { sessionCrafter } from "./pomodoro-components/sessionCrafter";
import { finitePomodoroCreator } from "./pomodoro-components/finitePomodoroCreator";

// CONDITIONAL RENDERING

function Pomodoro() {
  const [currentPage, setCurrentPage] = useState("entryPage");

  const [timelineData, setTimelineData] = useState([
    sessionCrafter(2, 30, 2, true),
  ]);

  const handleStart = (focus, relax, cycles) => {
    if (cycles === "infinity") {
      setCurrentPage("basicPomodoro");
    } else {
      setCurrentPage("sPPomodoro");
      setTimelineData(finitePomodoroCreator(focus, relax, cycles));
    }
  };

  const handleSPClick = () => {
    setCurrentPage("sPBuilder");
  };

  const handleSPStart = () => {
    setCurrentPage("sPPomodoro");
  };

  const handleTimelineData = (data) => {
    setTimelineData(data);
  };

  return (
    <>
      {currentPage === "entryPage" && (
        <EntryPage onStart={handleStart} onSPClick={handleSPClick} />
      )}
      {currentPage === "basicPomodoro" && <BasicPomodoro />}
      {currentPage === "sPBuilder" && (
        <SPBuilder
          onStartSession={handleSPStart}
          onPassData={handleTimelineData}
        />
      )}
      {currentPage === "sPPomodoro" && (
        <SPPomodoro timelineData={timelineData} />
      )}
    </>

    // TODO for testing only
    // <>
    //   <SPBuilder onStartSession={handleSPStart} />
    // </>
  );
}

export default Pomodoro;
