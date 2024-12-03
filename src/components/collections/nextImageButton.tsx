import React from "react";
import { Button } from "../ui/button";
import { useCollectionsContext } from "@/hooks/collectionsProvider";
import { MoveRight } from "lucide-react";

const NextImageButton: React.FC = () => {
  const { images, currentImage, setCurrentImage } = useCollectionsContext();

  const handleNextImage = () => {
    if (currentImage < images.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };

  const isDisabled = currentImage >= images.length - 1 || images.length === 0;

  return (
    <Button
      onClick={handleNextImage}
      disabled={isDisabled}
      className="rounded-full transition hover:scale-105 flex items-center space-x-2"
      aria-label="Next Image"
    >
      <span className="hidden sm:inline">Next Image</span>
      <MoveRight strokeWidth={2} />
    </Button>
  );
};

export default NextImageButton;
