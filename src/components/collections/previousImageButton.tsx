import React from "react";
import { Button } from "../ui/button";
import { useCollectionsContext } from "@/hooks/collectionsProvider";
import { MoveLeft } from "lucide-react";

const PreviousImageButton: React.FC = () => {
  const { currentImage, setCurrentImage } = useCollectionsContext();

  const handlePreviousImage = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  const isDisabled = currentImage <= 0;

  return (
    <Button
      onClick={handlePreviousImage}
      disabled={isDisabled}
      className="rounded-full transition hover:scale-105 flex items-center space-x-2"
      aria-label="Previous Image"
    >
      <MoveLeft strokeWidth={2} />
      <span className="hidden sm:inline">Previous Image</span>
    </Button>
  );
};

export default PreviousImageButton;
