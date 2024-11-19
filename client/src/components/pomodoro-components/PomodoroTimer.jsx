import React, { useState, useEffect } from "react";
import Popup from "../reusables/Popup";

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
      <div>
        <h4>{isFocus ? "FOCUS" : "RELAX"}</h4>
      </div>
      <div>
        <h1>{formatTime(timeLeft)}</h1>
      </div>
      <div>
        <button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</button>
        <br />
        <button onClick={toggleSettings}>Settings TODO</button>

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

        <br />
        <button onClick={resetTimer}>Restart section</button>
        <br />
        <button onClick={() => addMinutes(minutesToAdd)}>
          +{minutesToAdd} Minutes
        </button>
        <br />
        <div>
          <h3>
            Next up: {isFocus ? initialRelaxTime / 60 : initialFocusTime / 60}{" "}
            minutes of {isFocus ? "relax" : "focus"}.
          </h3>
          <button onClick={switchState}>JUMP</button>
        </div>
      </div>
    </>
  );
}

export default PomodoroTimer;
