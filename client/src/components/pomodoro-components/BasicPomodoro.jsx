import React, { useState, useEffect } from "react";
import PomodoroTimer from "./PomodoroTimer";
import lightbulb from "../../assets/lightbulb.png";
import "./BasicPomodoro.css";

function BasicPomodoro() {
  return (
    <>
      <div className="bg-style">
        <h1 className="header-style">Your pomodoro, user</h1>
        <div className="content-wrapper-style">
          <div className="container-style">
            {/* SESSION PLANNER */}
            <button
              className="button-style"
              style={{ backgroundImage: `url(${lightbulb})` }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "crimson")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#ff7f7f")}
            ></button>

            <div className="timer-container-style">
              <PomodoroTimer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasicPomodoro;
