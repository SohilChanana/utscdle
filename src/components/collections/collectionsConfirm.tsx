"use client";

import { useCollectionsContext } from "@/hooks/collectionsProvider";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import CollectionsSuccessPopup from "./collectionsSuccess";
import CollectionsFailurePopup from "./collectionsFailure";

export default function CollectionsCheckDistanceButton() {
  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);
  const {
    markerPosition,
    addAttempt,
    maxAttempts,
    attempts,
    isSuccessful,
    currentImageData,
  } = useCollectionsContext();
  const imgCoords = currentImageData
    ? currentImageData.coordinates
    : { lat: 0, lng: 0 };
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
      imgCoords.lat,
      imgCoords.lng
    );

    addAttempt(distance);

    if (distance <= 15) {
      setSuccessOpen(true);
    } else if (attempts.length === maxAttempts - 1) {
      setTimeout(() => setFailureOpen(true), 500);
    }
  };

  return (
    <div>
      <CollectionsSuccessPopup open={successOpen} onOpenChange={setSuccessOpen} />
      <CollectionsFailurePopup open={failureOpen} onOpenChange={setFailureOpen} />
      <Button
        className="transition hover:scale-105"
        onClick={handleCheckDistance}
        disabled={
          attempts.length >= maxAttempts ||
          isSuccessful ||
          !markerPosition}
      >
        Check Distance
      </Button>
    </div>
  );
}
