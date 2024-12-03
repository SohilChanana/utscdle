"use server";
import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";
import Image from "@/lib/models/image";
import { connectDB } from "@/utils/mongoosedb";
import fs from "node:fs";
import { detectContentType } from "next/dist/server/image-optimizer";

// Configure Google Cloud Storage
const storage = new Storage({
  projectId: "utscdle",
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});
const BUCKET_NAME = "utscdle-images";

interface UploadImageInput {
  file: File;
  mimeType: string;
  coordinates: { lat: number; lng: number };
  dailyEligible?: boolean;
  description?: string;
  tags?: string[];
}

interface UploadImageResponse {
  success: boolean;
  message: string;
  imageId?: string;
}

export async function uploadImage({
  file,
  mimeType,
  coordinates,
  dailyEligible = true,
  description = "",
  tags = [],
}: UploadImageInput): Promise<UploadImageResponse> {
  try {
    // Generate a unique ID for the file
    const uniqueId = uuidv4();
    const bucket = storage.bucket(BUCKET_NAME);
    const image = bucket.file(uniqueId);

    // Write the file buffer to the bucket
    image.save(Buffer.from(await file.arrayBuffer()), { metadata: { contentType: mimeType }});

    // Get the public URL of the uploaded file
    const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${uniqueId}`;

    // Create a new Image record in MongoDB
    await connectDB();
    const newImage = await Image.create({
      url: publicUrl,
      coordinates,
      uploadDate: new Date(),
      dailyEligible,
      description,
      tags,
      usedOnDate: null,
    });

    return {
      success: true,
      message: "Image uploaded and record created successfully.",
      imageId: JSON.stringify(newImage._id),
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      success: false,
      message: "An error occurred while uploading the image.",
    };
  }
}
