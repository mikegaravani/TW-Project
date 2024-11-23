import React, { useState, useEffect } from "react";
import PomodoroTimer from "./PomodoroTimer";
import lightbulb from "../../assets/lightbulb.png";
import "./BasicPomodoro.css";

function BasicPomodoro() {
  const [currentMode, setCurrentMode] = useState("focus");

  const handleStateChange = (mode) => {
    setCurrentMode(mode);
  };

  return (
    <>
      <div
        className={`bg-style ${
          currentMode === "focus" ? "bg-focus" : "bg-relax"
        }`}
      >
        <div className="header-container">
          <h1
            className={`header-style ${
              currentMode === "focus" ? "header-focus" : "header-relax"
            }`}
          >
            Your pomodoro, user
          </h1>
        </div>
        <div className="content-wrapper-style">
          <div
            className={`container-style ${
              currentMode === "focus" ? "container-focus" : "container-relax"
            }`}
          >
            {/* SESSION PLANNER */}
            <button
              className={`button-style ${
                currentMode === "focus" ? "button-focus" : "button-relax"
              }`}
              style={{ backgroundImage: `url(${lightbulb})` }}
            ></button>

            <div className="timer-container-style">
              <PomodoroTimer onStateChange={handleStateChange} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasicPomodoro;
