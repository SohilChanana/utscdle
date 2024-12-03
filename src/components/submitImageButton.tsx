"use client";

import { MapSIProvider, useMapSIContext } from "../hooks/mapSIProvider";
import { Button } from "./ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";
import { MapComponentSI } from "./mapSI";

const encodeImage = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const SubmitImageButton: React.FC = () => {
  const { markerPosition } = useMapSIContext();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: File | null = null;

    // Check if there's an image inputted
    if (e.target.files && e.target.files.length > 0) {
      file = e.target.files[0];
    }

    setImageFile(file);
  };

  const handleSubmitImage = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (markerPosition && imageFile) {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", imageFile); // Add image file
      formData.append("markerPosition", JSON.stringify(markerPosition)); // Add marker position

      try {
        const response = await fetch("/api/email", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (result.success) {
          console.log("Image submitted successfully.");
          setSubmitted(true);
        } else {
          console.error("Error submitting image:", result.message);
        }
      } catch (error) {
        console.error("Error submitting image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const isButtonDisabled = !markerPosition || !imageFile;

  return (
    <div className="flex flex-col w-full items-center p-4 bg-[#424242] rounded-xl mb-4 mr-6 mt-5">
      {!submitted && (
        <MapSIProvider>
          <div className="mb-5">Select the image's location on the map</div>
          <div className="w-full sm:w-[500px] h-[500px] mt-4 sm:mt-0">
            <MapComponentSI />
          </div>
          <div className="flex flex-col items-center">
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
              <Label htmlFor="picture">Select image from device</Label>
              <Input id="picture" type="file" onChange={handleImageChange} />
            </div>

            <Button onClick={handleSubmitImage} disabled={isButtonDisabled}>
              {loading ? "Uploading..." : "Submit image"}
            </Button>
          </div>
        </MapSIProvider>
      )}

      {/* Show this instead when image successfully submits */}
      {submitted && (
        <div className="mt-4">
          <p>
            Thank you for submitting your image! We'll be reviewing it shortly.
          </p>
        </div>
      )}
    </div>
  );
};

export { SubmitImageButton };
