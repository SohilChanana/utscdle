"use client";

import { useContext, useState, useEffect } from "react";
import {useTimer} from "@/hooks/timerContext";

export default function Timer() {
  const { timeElapsed } = useTimer();
  const [finalTime, setFinalTime] = useState<string | null>(null);

  useEffect(() => {
    const storedFinalTime = localStorage.getItem("finalTime");
    setFinalTime(storedFinalTime);
  }, []);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const displayTime = finalTime !== null ? formatTime(Number(finalTime)) : formatTime(timeElapsed);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-3xl font-bold text-white">{displayTime}</div>
    </div>
  );
}
