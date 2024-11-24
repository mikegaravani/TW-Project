import React, { useState, useEffect } from "react";
import BasicPomodoro from "./pomodoro-components/BasicPomodoro";
import SPPomodoro from "./pomodoro-components/SPPomodoro";
import EntryPage from "./pomodoro-components/EntryPage";

// TODO use conditional rendering

function Pomodoro() {
  return (
    <>
      <EntryPage />
    </>
  );
}

export default Pomodoro;
