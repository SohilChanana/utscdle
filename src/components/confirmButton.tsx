"use client";

import { useMapContext } from "@/hooks/mapProvider";
import { useTimer } from "@/hooks/timerContext";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import SuccessPopup from "./successPopup";
import FailurePopup from "./failurePopup";

interface CheckDistanceButtonProps {
  coords: string;
}

export default function CheckDistanceButton({
  coords,
}: CheckDistanceButtonProps) {
  const imgCoords = JSON.parse(coords);
  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);
  const { markerPosition, addAttempt, maxAttempts, attempts, isSuccessful } =
    useMapContext();
  const { stopTimer, timeElapsed } = useTimer();
  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number => {
    const R = 6371000; // Radius of the Earth in meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Calculate the score based on the final time and number of guesses
  const calculateScore = (
    finalTime: number,
    numberOfGuesses: number
  ): number => {
    // Ensure finalTime is not negative
    finalTime = Math.max(0, finalTime);

    let guessesScore = 600 - (numberOfGuesses - 1) * 200;
    guessesScore = Math.max(200, guessesScore); 

    let timeScore = 0;
    if (finalTime <= 300) {
      timeScore = 100 + (300 - finalTime);
    } else {
      timeScore = 100;
    }

    const totalScore = guessesScore + timeScore;

    return Math.min(totalScore, 1000);
  };

  // Submit the score to the database
  const submitScore = async (
    date: Date,
    score: number,
    totalTime: number,
    attempts: Array<object>
  ) => {
    try {
      const response = await fetch("/api/scores/updateScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, score, totalTime, attempts }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error submitting score:", data.message);
      } else {
        console.log("Score submitted successfully:", data);
      }
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  const handleCheckDistance = () => {
    if (!markerPosition || attempts.length >= maxAttempts) return;

    const distance = calculateDistance(
      markerPosition.lat,
      markerPosition.lng,
      imgCoords.lat,
      imgCoords.lng
    );

    addAttempt(distance);

    if (distance <= 20) {
      setSuccessOpen(true);
      stopTimer();
      localStorage.setItem("finalTime", timeElapsed.toString());
      const score = calculateScore(timeElapsed, attempts.length + 1);
      localStorage.setItem("finalScore", score.toString());
      const challengeDateString = localStorage.getItem("dataDate");
      const challengeDate = challengeDateString
        ? new Date(challengeDateString)
        : new Date();
      submitScore(challengeDate, score, timeElapsed, attempts);
    } else if (attempts.length === maxAttempts - 1) {
      setTimeout(() => setFailureOpen(true), 500);
      stopTimer();
      localStorage.setItem("finalTime", timeElapsed.toString());
      const score = 0;
      localStorage.setItem("finalScore", score.toString());
      const challengeDateString = localStorage.getItem("dataDate");
      const challengeDate = challengeDateString
        ? new Date(challengeDateString)
        : new Date();
      submitScore(challengeDate, score, timeElapsed, attempts);
    }
  };

  return (
    <div>
      <SuccessPopup open={successOpen} onOpenChange={setSuccessOpen} />
      <FailurePopup open={failureOpen} onOpenChange={setFailureOpen} />
      <Button
        className="transition hover:scale-105"
        onClick={handleCheckDistance}
        disabled={
          attempts.length >= maxAttempts ||
          isSuccessful ||
          localStorage.getItem("finalScore") !== null
        }
      >
        Check Distance
      </Button>
    </div>
  );
}
