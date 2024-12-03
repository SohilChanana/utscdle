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
import { useCollectionsContext } from "@/hooks/collectionsProvider";

interface CollectionsSuccessPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CollectionsSuccessPopup: React.FC<CollectionsSuccessPopupProps> = ({
  open,
  onOpenChange,
}) => {
  const { attempts } = useCollectionsContext();
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-2 bg-green-700 border-slate-300 border-4 w-3/4 max-w-96">
        <AlertDialogHeader className="justify-center items-center">
          <AlertDialogTitle className="font-bold text-2xl">
            Congratulations
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xl text-white">
            You found the location!
          </AlertDialogDescription>
          <AlertDialogDescription className="text-xl text-white">
            {`It took you ${attempts.length} attempt(s)`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => onOpenChange(false)}>
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CollectionsSuccessPopup;
