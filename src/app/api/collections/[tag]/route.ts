import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/utils/mongoosedb";
import Image from "@/lib/models/image";
import { auth } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tag: string }> }
) {
  try {
    await connectDB();

    const tag = (await params).tag;

    if (!tag) {
      return NextResponse.json(
        { success: false, message: "Tag parameter is required." },
        { status: 400 }
      );
    }

    // Authenticate the user
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "User not authenticated." },
        { status: 401 }
      );
    }

    let matchCondition: any;
    if (tag === "all") {
      // If tag is "all", get all images where dailyEligible is true
      matchCondition = { dailyEligible: true };
    } else {
      // Otherwise, filter by tag and ensure dailyEligible is true
      matchCondition = { tags: tag, dailyEligible: true };
    }

    const images = await Image.aggregate([
      { $match: matchCondition },
      { $sample: { size: 100 } }, 
    ]);

    // Return the list of images
    return NextResponse.json({ success: true, data: images }, { status: 200 });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching images.",
      },
      { status: 500 }
    );
  }
}
