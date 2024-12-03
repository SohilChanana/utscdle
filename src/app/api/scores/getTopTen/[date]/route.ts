import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/utils/mongoosedb";
import Score from "@/lib/models/score";
import { auth } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ date: string }> }
) {
  try {
    await connectDB();

    const date = (await params).date;

    // Validate and parse the date
    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      return NextResponse.json(
        { success: false, message: "Invalid date format. Use YYYY-MM-DD." },
        { status: 400 }
      );
    }

    // Define start and end of the day in UTC
    const startOfDay = new Date(
      Date.UTC(
        selectedDate.getUTCFullYear(),
        selectedDate.getUTCMonth(),
        selectedDate.getUTCDate()
      )
    );
    const endOfDay = new Date(
      Date.UTC(
        selectedDate.getUTCFullYear(),
        selectedDate.getUTCMonth(),
        selectedDate.getUTCDate() + 1
      )
    );

    // Aggregate scores for the day, group by userId, sum the scores
    const aggregatedScores = await Score.aggregate([
      {
        $match: {
          date: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
        },
      },
      {
        $group: {
          _id: { $toObjectId: "$userId" },
          totalScore: { $sum: "$score" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          username: "$user.name",
          totalScore: 1,
        },
      },
      {
        $sort: {
          totalScore: -1,
        },
      },
    ]);

    // Get the top 10 scores
    const topTen = aggregatedScores.slice(0, 10).map((item) => ({
      username: item.username,
      score: item.totalScore,
    }));

    // Authenticate the user
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "User not authenticated." },
        { status: 401 }
      );
    }
    const userId = new mongoose.Types.ObjectId(session.user.id);

    // Find the user's total score and rank
    let userScore = null;
    let userRank = null;

    for (let i = 0; i < aggregatedScores.length; i++) {
      if (aggregatedScores[i].userId.equals(userId)) {
        userScore = aggregatedScores[i].totalScore;
        userRank = i + 1;
        break;
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          topTen: topTen,
          userScore: userScore,
          userRank: userRank,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching top ten scores:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching the top ten scores.",
      },
      { status: 500 }
    );
  }
}
