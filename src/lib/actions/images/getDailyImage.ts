import Image from "@/lib/models/image"; // Replace with the correct path to your Image model
import { connectDB } from "@/utils/mongoosedb";
import { startOfDay, endOfDay } from "date-fns";

export const getDailyImage = async () => {
  try {
    await connectDB();
    const today = new Date();
    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);

    // Check for an image with "usedOnDate" set to today
    let dailyImage = await Image.findOne({
      usedOnDate: { $gte: startOfToday, $lte: endOfToday },
    }).exec();

    if (!dailyImage) {
      // No image has been used today, get the earliest uploaded unused image
      dailyImage = await Image.findOneAndUpdate(
        {
          usedOnDate: null, // Unused images
          dailyEligible: true
        },
        {
          usedOnDate: today, // Update "usedOnDate" to today
        },
        {
          sort: { uploadDate: 1 }, // Sort by earliest upload
          new: true, // Return the updated document
        }
      ).exec();
    }

    if (!dailyImage) {
      // Every image has been used, get the earliest used image to cycle
      dailyImage = await Image.findOneAndUpdate(
        { usedOnDate: { $ne: today },
          dailyEligible: true },
        {
          usedOnDate: today, // Update "usedOnDate" to today
        },
        {
          sort: { uploadDate: 1 }, // Sort by earliest upload
          new: true, // Return the updated document
        }
      ).exec();
    }

    if (!dailyImage) {
      return {
        success: false,
        message: "No available images for today.",
        image: {
          url: "https://placehold.co/600x400",
          coordinates: { lat: 0, lng: 0 },
        },
      };
    }

    return {
      success: true,
      message: "Daily image retrieved successfully.",
      image: dailyImage,
    };
  } catch (error) {
    console.error("Error fetching the daily image:", error);
    return {
      success: false,
      message: "An error occurred while fetching the daily image.",
    };
  }
};
