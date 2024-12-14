import React, { useState, useEffect } from "react";
import Settings from "../reusables/Settings";

import addTimeIcon from "../../assets/addtime.png";
import pauseIcon from "../../assets/pause.png";
import playIcon from "../../assets/play.png";
import settingsIcon from "../../assets/settings.png";
import restartIcon from "../../assets/restart.png";
import jumpIcon from "../../assets/jump.png";

// TODO remove these
const blueColor = "#007bff";
const greenColor = "#28a745";

function SPTimer({ onStateChange, timelineData = [] }) {
  // TODO remove this mock data
  timelineData = [
    { time: "1 min", description: "FOCUS", color: blueColor },
    { time: "1 min", description: "RELAX", color: greenColor },
    { time: "1 min", description: "FOCUS", color: blueColor },
    {
      time: "You did it!",
      description: "THE END",
      color: "#7600bc",
    },
  ];

  const getTimeFromStep = (index) => {
    const step = timelineData[index];
    if (!step) return 0;
    const [amount, unit] = step.time.split(" ");
    return unit === "min" ? parseInt(amount) * 60 : 0;
  };

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeFromStep(0));
  const [isRunning, setIsRunning] = useState(false);

  const switchToNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < timelineData.length) {
      setCurrentStepIndex(nextIndex);
      setTimeLeft(getTimeFromStep(nextIndex));
    } else {
      setIsRunning(false);
    }
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

  const addMinutes = () => {
    setTimeLeft((prev) => prev + 2 * 60);
  };

  const restartTimer = () => {
    setTimeLeft(getTimeFromStep(currentStepIndex));
    setIsRunning(false);
  };

  const jumpToNextStep = () => {
    switchToNextStep();
    setIsRunning(false);
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      switchToNextStep();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  return (
    <>
      <div className={`text-center p-5 rounded-lg bg-gray-100 font-sans`}>
        {/* TODO this down here color text is wrong */}
        <h4
          className="text-4xl font-bold mb-2.5"
          style={{ color: timelineData[currentStepIndex]?.color }}
        >
          {timelineData[currentStepIndex]?.description || "FINISHED"}
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
            onClick={addMinutes}
          ></button>

          {/* RESTART BUTTON */}
          <button
            className="w-[50px] h-[50px] flex items-center justify-center p-2.5 px-5 text-base text-white bg-transparent border-none rounded-md cursor-pointer transition-colors duration-300 bg-no-repeat bg-center bg-83% hover:bg-gray-300 hover:text-white"
            style={{ backgroundImage: `url(${restartIcon})` }}
            onClick={restartTimer}
          ></button>

          {/* JUMP BUTTON */}
          <button
            className="w-[50px] h-[50px] flex items-center justify-center p-2.5 px-5 text-base text-white bg-transparent border-none rounded-md cursor-pointer transition-colors duration-300 bg-no-repeat bg-center bg-60% hover:bg-gray-300 hover:text-white"
            style={{ backgroundImage: `url(${jumpIcon})` }}
            onClick={jumpToNextStep}
          ></button>

          {/* SETTINGS BUTTON */}
          <button
            className="w-[50px] h-[50px] flex items-center justify-center p-2.5 px-5 text-base text-white bg-transparent border-none rounded-md cursor-pointer transition-colors duration-300 bg-no-repeat bg-center bg-66% hover:bg-gray-300 hover:text-white"
            style={{ backgroundImage: `url(${settingsIcon})` }}
          ></button>
        </div>
      </div>
    </>
  );
}

export default SPTimer;
