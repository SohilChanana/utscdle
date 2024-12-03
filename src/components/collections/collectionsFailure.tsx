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
} from "../ui/alert-dialog";

interface CollectionsFailurePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CollectionsFailurePopup: React.FC<CollectionsFailurePopupProps> = ({ open, onOpenChange }) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-2 bg-red-700 border-white border-4 w-3/4 max-w-96">
        <AlertDialogHeader className="justify-center items-center">
          <AlertDialogTitle className="font-bold text-2xl">You Failed</AlertDialogTitle>
          <AlertDialogDescription className="text-xl text-white">
            Better luck next time...
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => onOpenChange(false)}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CollectionsFailurePopup;
