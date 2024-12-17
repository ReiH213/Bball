"use client";

import React, { useState, useEffect } from "react";

const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState(10 * 60 * 1000); // 10 minutes in milliseconds
  const [running, setRunning] = useState(false);
  const [quarter, setQuarter] = useState(1); // Start from the first quarter
  const [pause, setPause] = useState(false);
  const [milliseconds, setMilliseconds] = useState(0); // Track milliseconds

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (running && !pause && timeRemaining > 0) {
      timer = setTimeout(() => {
        setMilliseconds((prev) => prev + 1); // Track milliseconds
        setTimeRemaining((prev) => prev - 10); // Decrease by 10ms
      }, 10); // Run every 10ms for accurate timer
    } else if (timeRemaining === 0) {
      if (quarter < 4) {
        // Switch to the next quarter
        setQuarter(quarter + 1);
        setTimeRemaining(10 * 60 * 1000); // Reset time to 10 minutes
      } else {
        setRunning(false);
        alert("Game Over!");
      }
    }

    return () => clearTimeout(timer); // Cleanup on component unmount or timer change
  }, [running, timeRemaining, pause, quarter]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const millis = milliseconds % 1000;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}:${Math.floor(millis / 10)
      .toString()
      .padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (!running) {
      setRunning(true);
      setPause(false);
    }
  };

  const stopTimer = () => {
    setPause(true);
  };

  const resetTimer = () => {
    setRunning(false);
    setPause(false);
    setQuarter(1);
    setTimeRemaining(10 * 60 * 1000); // Reset to 10 minutes
    setMilliseconds(0);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#492e21] p-4 rounded-md shadow-lg mt-8 w-72 mx-auto">
      <div className="text-4xl font-bold text-white mb-4">
        {formatTime(timeRemaining)}
      </div>

      <div className="text-lg text-white mb-4">Quarter: {quarter} / 4</div>

      <div className="flex gap-4">
        <button
          onClick={startTimer}
          className="p-2 bg-black text-white rounded-lg hover:bg-white hover:text-black"
        >
          Start
        </button>
        <button
          onClick={stopTimer}
          className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-white hover:text-black"
        >
          Pause
        </button>
        <button
          onClick={resetTimer}
          className="p-2 bg-red-500 text-white rounded-lg hover:bg-white hover:text-black"
        >
          Reset
        </button>
      </div>

      {pause && <div className="text-xl text-white mt-4">Game Paused</div>}
    </div>
  );
};

export default Timer;
