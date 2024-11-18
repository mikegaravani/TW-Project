import React, { useState, useEffect } from "react";
import PomodoroTimer from "./PomodoroTimer";

function BasicPomodoro() {
  return (
    <>
      <div>
        <h1>Your pomodoro, user</h1>
      </div>
      <br />
      <div>
        <button>SESSION PLANNER</button>
      </div>
      <br />
      <div>
        <PomodoroTimer />
      </div>
    </>
  );
}

export default BasicPomodoro;
