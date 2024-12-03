import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getScores } from "@/lib/actions/scores/getScores";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ range: string }> }
) {
  try {
    const range = (await params).range;

    // Ensure the range parameter is valid
    if (!["day", "week", "month"].includes(range)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid range. Must be 'day', 'week', or 'month'.",
        },
        { status: 400 }
      );
    }

    const session = await auth();

    if (!session || !session?.user) {
      return NextResponse.json(
        { success: false, message: "User not authenticated." },
        { status: 401 }
      );
    }

    const userId = session.user.id as string;

    // Get scores based on the range
    const chartData = await getScores(userId, range);

    if (chartData) {
      return NextResponse.json(
        { success: true, data: chartData },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "No scores found for the specified range." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching scores:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching the scores.",
      },
      { status: 500 }
    );
  }
}
