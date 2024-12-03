"use client";

import { useState, useEffect } from "react";
import { HowToPlay } from "./howToPlay";
import { Button } from "./ui/button";
import { CircleHelp } from "lucide-react";

const HowToPlayButton = () => {
  const [open, setOpen] = useState(false);
  // Open the dialog when the page loads if the game hasnt started
  useEffect(() => {
    const gameStarted = localStorage.getItem("gameStarted");
    if (!gameStarted) {
      setOpen(true);
    }
  }, []);

  return (
    <>
      <HowToPlay open={open} setOpen={setOpen} />
      <div className="fixed bottom-4 right-4 z-50">
        <Button variant="default" onClick={() => setOpen(true)} className="rounded-full p-3 transition hover:scale-105">
          <CircleHelp strokeWidth={2}/> How To Play
        </Button>
      </div>
    </>
  );
};

export default HowToPlayButton;
