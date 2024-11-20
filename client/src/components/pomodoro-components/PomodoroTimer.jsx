import React, { useState, useEffect } from "react";
import Popup from "../reusables/Popup";
import "./PomodoroTimer.css";

import addTimeIcon from "../../assets/addtime.png";
import pauseIcon from "../../assets/pause.png";
import playIcon from "../../assets/play.png";
import settingsIcon from "../../assets/settings.png";
import restartIcon from "../../assets/restart.png";
import jumpIcon from "../../assets/jump.png";

function PomodoroTimer({
  // Props
  initialFocusTime = 30 * 60,
  initialRelaxTime = 5 * 60,
  onStateChange,
}) {
  const [isFocus, setIsFocus] = useState(true);
  const [timeLeft, setTimeLeft] = useState(initialFocusTime);
  const [isRunning, setIsRunning] = useState(false);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [minutesToAdd, setMinutesToAdd] = useState(2);

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isFocus ? initialFocusTime : initialRelaxTime);
  };

  const switchState = () => {
    const nextIsFocus = !isFocus;
    setIsFocus(nextIsFocus);
    setTimeLeft(nextIsFocus ? initialFocusTime : initialRelaxTime);
    if (onStateChange) {
      onStateChange(nextIsFocus ? "focus" : "relax");
    }
  };

  const addMinutes = (minutes) => {
    setTimeLeft((prev) => prev + minutes * 60);
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      switchState();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  return (
    <>
      <div className={`timer-container ${isFocus ? "focus" : "relax"}`}>
        <h4 className={`timer-state ${isFocus ? "focus" : "relax"}`}>
          {isFocus ? "FOCUS" : "RELAX"}
        </h4>

        <h1 className="timer-time">{formatTime(timeLeft)}</h1>

        <div className="timer-buttons">
          <button
            className="timer-button tmr-play-pause"
            style={{
              backgroundImage: `url(${isRunning ? pauseIcon : playIcon})`,
            }}
            onClick={toggleTimer}
          ></button>

          <button
            className="timer-button tmr-settings"
            style={{ backgroundImage: `url(${settingsIcon})` }}
            onClick={toggleSettings}
          ></button>

          <Popup isOpen={isSettingsOpen} onClose={toggleSettings}>
            <h3>Settings</h3>

            <br />

            <div>
              <label>
                <h6>Customize Time Increment Button (in Minutes):</h6>
                <input
                  type="number"
                  value={minutesToAdd === "" ? "" : minutesToAdd}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "") {
                      setMinutesToAdd("");
                    } else {
                      const numericValue = Number(value);

                      if (numericValue > 99) {
                        setMinutesToAdd(99);
                      } else if (numericValue >= 1) {
                        setMinutesToAdd(numericValue);
                      }
                    }
                  }}
                  onBlur={() => {
                    if (minutesToAdd === "") {
                      setMinutesToAdd(1);
                    }
                  }}
                  min="1"
                  max="99"
                />
              </label>
            </div>

            <br />

            <button onClick={toggleSettings}>Close</button>

            <br />
          </Popup>

          <button
            className="timer-button tmr-restart"
            style={{ backgroundImage: `url(${restartIcon})` }}
            onClick={resetTimer}
          ></button>

          <button
            className="timer-button tmr-add-minutes"
            style={{ backgroundImage: `url(${addTimeIcon})` }}
            onClick={() => addMinutes(minutesToAdd)}
          ></button>

          <button
            className="timer-button tmr-jump"
            style={{ backgroundImage: `url(${jumpIcon})` }}
            onClick={switchState}
          ></button>
        </div>

        <div className="timer-next-up">
          <h3>
            Next up: {isFocus ? initialRelaxTime / 60 : initialFocusTime / 60}{" "}
            minutes of {isFocus ? "relax" : "focus"}.
          </h3>
        </div>
      </div>
    </>
  );
}

export default PomodoroTimer;
