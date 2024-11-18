import React, { useState, useEffect } from "react";

function PomodoroTimer({
  // Props
  initialFocusTime = 30 * 60,
  initialRelaxTime = 5 * 60,
  onStateChange,
  defaultMinutesToAdd = 2,
}) {
  const [isFocus, setIsFocus] = useState(true);
  const [timeLeft, setTimeLeft] = useState(initialFocusTime);
  const [isRunning, setIsRunning] = useState(false);

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
        {/* Settings, change +2 minutes duration, new default */}
        <button>Settings TODO</button>
        <br />
        <button onClick={resetTimer}>Restart section</button>
        <br />
        <button onClick={() => addMinutes(defaultMinutesToAdd)}>
          +{defaultMinutesToAdd} Minutes
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
