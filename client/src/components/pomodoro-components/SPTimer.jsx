import React, { useState, useEffect } from "react";
import Settings from "../reusables/Settings";

import addTimeIcon from "../../assets/addtime.png";
import pauseIcon from "../../assets/pause.png";
import playIcon from "../../assets/play.png";
import settingsIcon from "../../assets/settings.png";
import restartIcon from "../../assets/restart.png";
import jumpIcon from "../../assets/jump.png";

function PomodoroTimer({
  initialFocusTime = 30 * 60,
  initialRelaxTime = 5 * 60,
  onStateChange,
}) {
  const [isFocus, setIsFocus] = useState(true);
  const [timeLeft, setTimeLeft] = useState(initialFocusTime);
  const [isRunning, setIsRunning] = useState(false);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [minutesToAdd, setMinutesToAdd] = useState(2);

  const [focusTime, setFocusTime] = useState(initialFocusTime);
  const [relaxTime, setRelaxTime] = useState(initialRelaxTime);

  const [settingsSnapshot, setSettingsSnapshot] = useState({
    minutesToAdd,
    focusTime,
    relaxTime,
    applyImmediately: true,
  });

  const maxMinutesToAddInSettings = 99;
  const maxFocusMinutesInSettings = 240;
  const maxRelaxMinutesInSettings = 240;

  const openSettings = () => {
    setSettingsSnapshot({
      minutesToAdd,
      focusTime,
      relaxTime,
      applyImmediately: true,
    });
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  const saveSettings = () => {
    const {
      focusTime: newFocusTime,
      relaxTime: newRelaxTime,
      applyImmediately,
    } = settingsSnapshot;

    setFocusTime(newFocusTime);
    setRelaxTime(newRelaxTime);

    if (applyImmediately) {
      setTimeLeft(isFocus ? newFocusTime : newRelaxTime);
    }

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
    setTimeLeft(isFocus ? focusTime : relaxTime);
  };

  const switchState = () => {
    const nextIsFocus = !isFocus;
    setIsFocus(nextIsFocus);
    setTimeLeft(nextIsFocus ? focusTime : relaxTime);
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
      if (numericValue > maxMinutesToAddInSettings) {
        setMinutesToAdd(maxMinutesToAddInSettings);
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

  const handleTimeBlur = (key, previousValue) => {
    setSettingsSnapshot((prev) => {
      if (prev[key] === "") {
        return { ...prev, [key]: previousValue };
      }
      return prev;
    });
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
      <div className={`text-center p-5 rounded-lg bg-gray-100 font-sans`}>
        <h4
          className={`text-4xl font-bold mb-2.5 ${isFocus ? "text-blue-500" : "text-green-500"}`}
        >
          {isFocus ? "FOCUS" : "RELAX"}
        </h4>

        <h1 className="text-8xl font-bold text-gray-800 my-10">
          {formatTime(timeLeft)}
        </h1>

        <div className="flex flex-wrap justify-center gap-2.5 mb-5">
          {/* PLAY/PAUSE BUTTON */}
          <button
            className="w-[50px] h-[50px] flex items-center justify-center p-2.5 px-5 text-base text-white bg-transparent border-none rounded-md cursor-pointer transition-colors duration-300 bg-no-repeat bg-center bg-63% hover:bg-gray-300 hover:text-white"
            style={{
              backgroundImage: `url(${isRunning ? pauseIcon : playIcon})`,
            }}
            onClick={toggleTimer}
          ></button>

          {/* ADD MINUTES BUTTON */}
          <button
            className="w-[50px] h-[50px] flex items-center justify-center p-2.5 px-5 text-base text-white bg-transparent border-none rounded-md cursor-pointer transition-colors duration-300 bg-no-repeat bg-center bg-65% hover:bg-gray-300 hover:text-white"
            style={{ backgroundImage: `url(${addTimeIcon})` }}
            onClick={() => addMinutes(minutesToAdd)}
          ></button>

          {/* RESTART BUTTON */}
          <button
            className="w-[50px] h-[50px] flex items-center justify-center p-2.5 px-5 text-base text-white bg-transparent border-none rounded-md cursor-pointer transition-colors duration-300 bg-no-repeat bg-center bg-83% hover:bg-gray-300 hover:text-white"
            style={{ backgroundImage: `url(${restartIcon})` }}
            onClick={resetTimer}
          ></button>

          {/* JUMP BUTTON */}
          <button
            className="w-[50px] h-[50px] flex items-center justify-center p-2.5 px-5 text-base text-white bg-transparent border-none rounded-md cursor-pointer transition-colors duration-300 bg-no-repeat bg-center bg-60% hover:bg-gray-300 hover:text-white"
            style={{ backgroundImage: `url(${jumpIcon})` }}
            onClick={switchState}
          ></button>

          {/* SETTINGS BUTTON */}
          <button
            className="w-[50px] h-[50px] flex items-center justify-center p-2.5 px-5 text-base text-white bg-transparent border-none rounded-md cursor-pointer transition-colors duration-300 bg-no-repeat bg-center bg-66% hover:bg-gray-300 hover:text-white"
            style={{ backgroundImage: `url(${settingsIcon})` }}
            onClick={openSettings}
          ></button>
        </div>

        <div className="text-gray-600 text-center">
          <h3 className="text-lg font-semibold mt-5 shadow-sm">
            Next up: {Math.floor(isFocus ? relaxTime / 60 : focusTime / 60)}{" "}
            minutes of {isFocus ? "relax" : "focus"}.
          </h3>
        </div>

        <Settings
          isOpen={isSettingsOpen}
          onClose={closeSettings}
          onSave={saveSettings}
        >
          <h6 className="text-[1.2rem] font-bold text-gray-800 mb-2.5 mt-5 text-left">
            Session settings
          </h6>

          {/* Focus Time Input */}
          <label className="flex flex-col text-base font-medium text-gray-800">
            Focus Time (Minutes):
            <input
              className="border-2 border-gray-300 rounded-md p-1 my-1"
              type="number"
              value={
                settingsSnapshot.focusTime === ""
                  ? ""
                  : Math.floor(settingsSnapshot.focusTime / 60)
              }
              onChange={(e) => {
                const value = e.target.value;
                setSettingsSnapshot((prev) => ({
                  ...prev,
                  focusTime:
                    value === ""
                      ? ""
                      : Math.max(
                          1,
                          Math.min(Number(value), maxFocusMinutesInSettings)
                        ) * 60,
                }));
              }}
              onBlur={() => {
                handleTimeBlur("focusTime", focusTime);
              }}
            />
          </label>

          {/* Relax Time Input */}
          <label className="flex flex-col text-base font-medium text-gray-800">
            Relax Time (Minutes):
            <input
              className="border-2 border-gray-300 rounded-md p-1 my-1"
              type="number"
              value={
                settingsSnapshot.relaxTime === ""
                  ? ""
                  : Math.floor(settingsSnapshot.relaxTime / 60)
              }
              onChange={(e) => {
                const value = e.target.value;
                setSettingsSnapshot((prev) => ({
                  ...prev,
                  relaxTime:
                    value === ""
                      ? ""
                      : Math.max(
                          1,
                          Math.min(Number(value), maxRelaxMinutesInSettings)
                        ) * 60,
                }));
              }}
              onBlur={() => {
                handleTimeBlur("relaxTime", relaxTime);
              }}
            />
          </label>

          {/* Apply Immediately Checkbox */}
          <label>
            <input
              type="checkbox"
              checked={settingsSnapshot.applyImmediately}
              onChange={(e) => {
                setSettingsSnapshot((prev) => ({
                  ...prev,
                  applyImmediately: e.target.checked,
                }));
              }}
            />{" "}
            Apply changes immediately
          </label>

          <br />

          <h6 className="text-[1.2rem] font-bold text-gray-800 mb-2.5 mt-5 text-left">
            More settings
          </h6>

          {/* Time Increment Input */}
          <label className="flex flex-col text-base font-medium text-gray-800">
            Time Increment (Minutes):
            <input
              type="number"
              className="border-2 border-gray-300 rounded-md p-1 my-1"
              value={minutesToAdd === "" ? "" : minutesToAdd}
              onChange={handleMinutesChange}
              onBlur={handleBlur}
              min="1"
              max="maxMinutesToAddInSettings"
            />
          </label>
        </Settings>
      </div>
    </>
  );
}

export default PomodoroTimer;
