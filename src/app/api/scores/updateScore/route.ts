import { NextResponse } from "next/server";
import { updateScore } from "@/lib/actions/scores/updateScore";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, score, totalTime, attempts } = body;

    if (typeof score !== "number") {
      return NextResponse.json(
        { success: false, message: "Invalid score value." },
        { status: 400 }
      );
    }

    if (typeof totalTime !== "number") {
      return NextResponse.json(
        { success: false, message: "Invalid totalTime value." },
        { status: 400 }
      );
    }

    if (!Array.isArray(attempts)) {
      return NextResponse.json(
        { success: false, message: "Invalid attempts value." },
        { status: 400 }
      );
    }

    if (!date) {
      return NextResponse.json(
        { success: false, message: "Invalid date value." },
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

    const result = await updateScore(userId, date, score, totalTime, attempts);

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    console.error("Error adding/updating score:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while saving the score." },
      { status: 500 }
    );
  }
}
