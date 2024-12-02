import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

type MarkerPosition = { lat: number; lng: number } | null;
type Attempt = { position: MarkerPosition; distance: number; attempt: number };

type Image = {
  _id: string;
  url: string;
  coordinates: { lat: number; lng: number };
  uploadDate: string;
  dailyEligible: boolean;
  description: string;
  tags: string[];
  usedOnDate?: string;
};

type CollectionsContextType = {
  images: Image[];
  currentImage: number;
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>;
  currentImageData: Image | null;
  loadImages: (tag: string) => Promise<void>;
  resetStateForImage: () => void;
  markerPosition: MarkerPosition;
  setMarkerPosition: React.Dispatch<React.SetStateAction<MarkerPosition>>;
  attempts: Attempt[];
  addAttempt: (distance: number) => void;
  maxAttempts: number;
  isSuccessful: boolean;
};

const CollectionsContext = createContext<CollectionsContextType | undefined>(
  undefined
);

interface CollectionsProviderProps {
  tagFilter: string;
  children: ReactNode;
}

export function CollectionsProvider({
  tagFilter,
  children,
}: CollectionsProviderProps) {
  const [images, setImages] = useState<Image[]>([]);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [currentImageData, setCurrentImageData] = useState<Image | null>(null);

  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>(null);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const maxAttempts = 3;

  // Load images from the API
  const loadImages = useCallback(async (tag: string) => {
    try {
      const response = await fetch(`/api/collections/${tag}`);
      const data = await response.json();

      if (data.success) {
        setImages(data.data);
        setCurrentImage(0); // Reset current image to the first one
      } else {
        console.error("Failed to load images:", data.message);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }, []);

  // Load images when tagFilter changes
  useEffect(() => {
    if (tagFilter) {
      loadImages(tagFilter);
    }
  }, [tagFilter, loadImages]);

  // Reset per-image state when currentImage changes
  const resetStateForImage = useCallback(() => {
    if (currentImage >= 0 && currentImage < images.length) {
      setCurrentImageData(images[currentImage]);
      setMarkerPosition(null); 
      setAttempts([]); 
    }
  }, [currentImage, images]);

  useEffect(() => {
    resetStateForImage();
  }, [currentImage, resetStateForImage]);

  // Add an attempt for the current image
  const addAttempt = (distance: number) => {
    if (markerPosition && attempts.length < maxAttempts) {
      setAttempts((prev) => [
        ...prev,
        { position: markerPosition, distance, attempt: prev.length + 1 },
      ]);
    }
  };

  // Determine success state
  const isSuccessful =
    attempts.length > 0 && attempts[attempts.length - 1].distance <= 20;

  return (
    <CollectionsContext.Provider
      value={{
        images,
        currentImage,
        setCurrentImage,
        currentImageData,
        loadImages,
        resetStateForImage,
        markerPosition,
        setMarkerPosition,
        attempts,
        addAttempt,
        maxAttempts,
        isSuccessful,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
}

export const useCollectionsContext = () => {
  const context = useContext(CollectionsContext);
  if (!context) {
    throw new Error("useImagesContext must be used within an ImagesProvider");
  }
  return context;
};
