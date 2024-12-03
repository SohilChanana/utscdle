"use client";

import React, { createContext, useState, useEffect, useRef } from "react";

interface TimerContextProps {
  isActive: boolean;
  timeElapsed: number;
  startTimer: () => void;
  stopTimer: () => void;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const storedStartTime = localStorage.getItem("startTime");
    const storedIsActive = localStorage.getItem("isActive");
    if (storedStartTime && storedIsActive === "true") {
      setStartTime(Number(storedStartTime));
      setIsActive(true);
    }
  }, []);

  useEffect(() => {
    if (isActive && startTime !== null) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, startTime]);

  const startTimer = () => {
    const now = Date.now();
    setStartTime(now);
    setIsActive(true);
    localStorage.setItem("startTime", now.toString());
    localStorage.setItem("isActive", "true");
  };

  const stopTimer = () => {
    setIsActive(false);
    localStorage.setItem("isActive", "false");
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  return (
    <TimerContext.Provider
      value={{ isActive, timeElapsed, startTimer, stopTimer }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = React.useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}
