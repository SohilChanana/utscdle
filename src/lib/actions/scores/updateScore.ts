import { connectDB } from "@/utils/mongoosedb";
import Score from "@/lib/models/score";

export const updateScore = async (
  userId: string,
  date: Date,
  scoreValue: number,
  totalTime: number,
  attempts: Array<object>
) => {
  try {
    await connectDB();

    // Check if a score entry exists for this user and date
    let scoreEntry = await Score.findOne({
      userId: userId,
      date: date,
    });

    if (!scoreEntry) {
      // Entry doesn't exist, create a new one
      scoreEntry = new Score({
        userId: userId,
        date: date,
        score: scoreValue,
        totalTime: totalTime,
        attempts: attempts ?? [],
      });
      await scoreEntry.save();
    }

    return {
      success: true,
      message: "Score saved successfully.",
      score: scoreEntry,
    };
  } catch (error) {
    console.error("Error adding/updating score:", error);
    return {
      success: false,
      message: "An error occurred while saving the score.",
    };
  }
};
