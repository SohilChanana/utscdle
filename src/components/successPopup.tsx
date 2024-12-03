"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface SuccessPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ open, onOpenChange }) => {
  const finalScore = localStorage.getItem("finalScore");
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-2 bg-green-700 border-slate-300 border-4 w-3/4 max-w-96">
        <AlertDialogHeader className="justify-center items-center">
          <AlertDialogTitle className="font-bold text-2xl">Congratulations</AlertDialogTitle>
          <AlertDialogDescription className="text-xl text-white">
            You found the location!
          </AlertDialogDescription>
          <AlertDialogDescription className="text-xl text-white">
            Score: {finalScore}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => onOpenChange(false)}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuccessPopup;
