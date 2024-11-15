"use client";

import { useMapContext } from "@/hooks/mapProvider";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alertDialog"
import React from "react";



const targetLocation = { lat: 43.7861633, lng: -79.1880963 }; // The coordinate to compare against

const CheckDistanceButton: React.FC = () => {

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const { markerPosition, addAttempt, maxAttempts, attempts, isSuccessful } = useMapContext();
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

  const handleCheckDistance = () => {
    if (!markerPosition || attempts.length >= maxAttempts) return;

    const distance = calculateDistance(
      markerPosition.lat,
      markerPosition.lng,
      targetLocation.lat,
      targetLocation.lng
    );

    addAttempt(distance);

    if (distance <= 20) {
      setTimeout(() => setOpenSuccess(true), 500);
    } else if (attempts.length === maxAttempts - 1) {
      setTimeout(() => setOpenFail(true), 500);
    }
  };


  


  return (
    <div>
      {/* Success pop-up */}
      <AlertDialog open={openSuccess} onOpenChange={setOpenSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You got it!</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpenSuccess(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Fail pop-up */}
      <AlertDialog open={openFail} onOpenChange={setOpenFail}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Better luck next time!</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpenFail(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Check distance */}
      <Button
        onClick={handleCheckDistance}
        disabled={attempts.length >= maxAttempts || isSuccessful}
      >
        Check Distance
      </Button>
    </div>

  );
};

export default CheckDistanceButton;
