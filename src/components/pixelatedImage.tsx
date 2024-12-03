"use client";

import React, { useEffect, useState, MouseEvent } from "react";
import Image from "next/image";
import { useMapContext } from "@/hooks/mapProvider";

interface PixelatedImageProps {
  src: string;
  desiredBlocks?: number;
  alt?: string;
}

const MAGNIFIER_SIZE = 100;
const ZOOM_LEVEL = 2.5;

const PixelatedImage: React.FC<PixelatedImageProps> = ({
  src,
  desiredBlocks = 50,
  alt = "Pixelated Image",
}) => {
  const { attempts, isSuccessful } = useMapContext();
  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(
    null
  );
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  // State variables for the magnifier
  const [zoomable, setZoomable] = useState<boolean>(false);
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 }
  );
  const [position, setPosition] = useState<{
    x: number;
    y: number;
    mouseX: number;
    mouseY: number;
  }>({ x: 0, y: 0, mouseX: 0, mouseY: 0 });

  let guessNumber: number;
  if (isSuccessful) {
    guessNumber = 4;
  } else {
    guessNumber = attempts.length + 1;
  }

  useEffect(() => {
    const img1 = new window.Image();
    img1.crossOrigin = "anonymous";
    img1.onload = () => {
      const w = img1.width;
      const h = img1.height;
      setImageWidth(w);
      setImageHeight(h);

      if (guessNumber >= 4) {
        setProcessedImageSrc(src);
        return;
      }

      const sampleSize = Math.max(Math.floor(w / desiredBlocks), 1);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img1, 0, 0);

      const imageData = ctx.getImageData(0, 0, w, h);
      const pixelArr = imageData.data;

      for (let y = 0; y < h; y += sampleSize) {
        for (let x = 0; x < w; x += sampleSize) {
          if (shouldPixelate(x, y, w, h, guessNumber)) {
            const p = (x + y * w) * 4;
            const r = pixelArr[p];
            const g = pixelArr[p + 1];
            const b = pixelArr[p + 2];
            const a = pixelArr[p + 3];

            ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
            ctx.fillRect(x, y, sampleSize, sampleSize);
          }
        }
      }

      const dataURL = canvas.toDataURL("image/jpeg");
      setProcessedImageSrc(dataURL);
    };
    img1.src = src;
  }, [src, desiredBlocks, guessNumber]);

  function shouldPixelate(
    x: number,
    y: number,
    w: number,
    h: number,
    visibleQuarters: number
  ): boolean {
    const halfW = w / 2;
    const halfH = h / 2;

    let quarter = 0;

    if (x < halfW && y < halfH) {
      quarter = 1;
    } else if (x >= halfW && y < halfH) {
      quarter = 2;
    } else if (x < halfW && y >= halfH) {
      quarter = 3;
    } else {
      quarter = 4;
    }

    return quarter > visibleQuarters;
  }

  // Event handlers for the magnifier
  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const { width, height } = element.getBoundingClientRect();
    setImageSize({ width, height });
    setZoomable(true);
    updatePosition(e);
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    setZoomable(false);
    updatePosition(e);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    updatePosition(e);
  };

  const updatePosition = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setPosition({
      x: -x * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      y: -y * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      mouseX: x - MAGNIFIER_SIZE / 2,
      mouseY: y - MAGNIFIER_SIZE / 2,
    });
  };

  return (
    <div className="flex items-center justify-center">
      {processedImageSrc && imageWidth && imageHeight && (
        <div
          className="object-contain mx-auto overflow-hidden relative cursor-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={processedImageSrc}
            alt={`Processed ${alt}`}
            width={imageWidth}
            height={imageHeight}
            priority={true}
            unoptimized
            className="max-h-[50vh] sm:max-h-[55vh] object-contain w-full rounded-md border-4 border-white"
          />
          {zoomable && (
            <div
              style={{
                backgroundPosition: `${position.x}px ${position.y}px`,
                backgroundImage: `url(${processedImageSrc})`,
                backgroundSize: `${imageSize.width * ZOOM_LEVEL}px ${
                  imageSize.height * ZOOM_LEVEL
                }px`,
                top: `${position.mouseY}px`,
                left: `${position.mouseX}px`,
                width: `${MAGNIFIER_SIZE}px`,
                height: `${MAGNIFIER_SIZE}px`,
              }}
              className="z-50 border-4 object-contain rounded-full pointer-events-none absolute border-gray-500 bg-no-repeat"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PixelatedImage;
