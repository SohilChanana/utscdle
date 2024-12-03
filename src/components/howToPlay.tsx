"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

type HowToPlayProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const HowToPlay = ({ open, setOpen }: HowToPlayProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="border-slate-300 border-4">
        <AlertDialogHeader>
          <AlertDialogTitle>How To Play</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Click on the map to place a marker, then click &quot;
          <strong>Check Distance</strong>&quot; to submit your guess on the
          picture&apos;s location!
        </AlertDialogDescription>
        <AlertDialogDescription>
          The picture will become more visible after each guess.
        </AlertDialogDescription>
        <AlertDialogDescription>
          You have a total of <strong>3 guesses</strong> to find the
          picture&apos;s location.
        </AlertDialogDescription>
        <AlertDialogDescription>
          Your score is based on the number of guesses and the time taken to
          find the location, and the you must guess within <strong>20m</strong>{" "}
          of the location to be correct.
        </AlertDialogDescription>
        <AlertDialogDescription>
          <strong>Note:</strong> If you have already completed today&apos;s challenge, only the first score will be recorded.
        </AlertDialogDescription>
        <AlertDialogDescription>
          <strong>Good Luck!</strong>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setOpen(false)}>
            Let&apos;s Play
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { HowToPlay };
