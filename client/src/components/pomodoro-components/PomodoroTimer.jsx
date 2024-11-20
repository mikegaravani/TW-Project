import React, { useState, useEffect } from "react";
import Popup from "../reusables/Popup";
import Settings from "../reusables/Settings";
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

  const [settingsSnapshot, setSettingsSnapshot] = useState({ minutesToAdd });

  const openSettings = () => {
    setSettingsSnapshot({ minutesToAdd });
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setMinutesToAdd(settingsSnapshot.minutesToAdd);
    setIsSettingsOpen(false);
  };

  const saveSettings = () => {
    setIsSettingsOpen(false);
  };

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

  // Needed for changing the default "Add minutes" value
  const handleMinutesChange = (e) => {
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
  };

  const handleBlur = () => {
    if (minutesToAdd === "") {
      setMinutesToAdd(1);
    }
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
          {/* PLAY/PAUSE BUTTON */}
          <button
            className="timer-button tmr-play-pause"
            style={{
              backgroundImage: `url(${isRunning ? pauseIcon : playIcon})`,
            }}
            onClick={toggleTimer}
          ></button>

          {/* ADD MINUTES BUTTON */}
          <button
            className="timer-button tmr-add-minutes"
            style={{ backgroundImage: `url(${addTimeIcon})` }}
            onClick={() => addMinutes(minutesToAdd)}
          ></button>

          {/* RESTART BUTTON */}
          <button
            className="timer-button tmr-restart"
            style={{ backgroundImage: `url(${restartIcon})` }}
            onClick={resetTimer}
          ></button>

          {/* JUMP BUTTON */}
          <button
            className="timer-button tmr-jump"
            style={{ backgroundImage: `url(${jumpIcon})` }}
            onClick={switchState}
          ></button>

          {/* SETTINGS BUTTON */}
          <button
            className="timer-button tmr-settings"
            style={{ backgroundImage: `url(${settingsIcon})` }}
            onClick={openSettings}
          ></button>
        </div>

        <div className="timer-next-up">
          <h3 className="timer-next-up-text">
            Next up: {isFocus ? initialRelaxTime / 60 : initialFocusTime / 60}{" "}
            minutes of {isFocus ? "relax" : "focus"}.
          </h3>
        </div>

        <Settings
          isOpen={isSettingsOpen}
          onClose={closeSettings}
          onSave={saveSettings}
        >
          <label className="settings-label">
            Time Increment (Minutes):
            <input
              type="number"
              className="settings-input"
              value={minutesToAdd === "" ? "" : minutesToAdd}
              onChange={handleMinutesChange}
              onBlur={handleBlur}
              min="1"
              max="99"
            />
          </label>
        </Settings>
      </div>
    </>
  );
}

export default PomodoroTimer;
