"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { CircleHelp } from "lucide-react";

const CollectionsHowToPlayPopup = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="border-slate-300 border-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Welcome to Collections!</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Here you can leisurely play through different galleries of images.
          </AlertDialogDescription>
          <AlertDialogDescription>
            Similar to the main game, click on the map to place a marker, then
            click &quot; <strong>Check Distance</strong>&quot; to submit your
            guess on the picture&apos;s location!
          </AlertDialogDescription>
          <AlertDialogDescription>
            You have a total of <strong>3 guesses</strong> to find the
            picture&apos;s location.
          </AlertDialogDescription>
          <AlertDialogDescription>
            Unlike the main game, there is no time limit and your scores
            aren&apos;t recorded, so take your time and get some practice in!
          </AlertDialogDescription>
          <AlertDialogDescription>
            <strong>Have Fun!</strong>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpen(false)}>
              Let&apos;s Play
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="default"
          onClick={() => setOpen(true)}
          className="rounded-full p-3 transition hover:scale-105"
        >
          <CircleHelp strokeWidth={2} /> How To Play
        </Button>
      </div>
    </>
  );
};

export default CollectionsHowToPlayPopup;
