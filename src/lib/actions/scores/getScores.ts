import { connectDB } from "@/utils/mongoosedb";
import Score from "@/lib/models/score";

export const getScores = async (userId: string, range: string) => {
    try {
      await connectDB();
  
      const now = new Date();
      const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      let startDate: Date;
  
      if (range === "day") {
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      } else if (range === "week") {
        const startOfLast7Days = new Date(now);
        startOfLast7Days.setDate(now.getDate() - 6);
        startOfLast7Days.setHours(0, 0, 0, 0);
        startDate = startOfLast7Days;
      } else if (range === "month") {
        const startOfLast30Days = new Date(now);
        startOfLast30Days.setDate(now.getDate() - 29);
        startOfLast30Days.setHours(0, 0, 0, 0);
        startDate = startOfLast30Days;
      } else {
        throw new Error("Invalid range specified");
      }
  
      const scores = await Score.find({
        userId: userId,
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      });
  
      // Define date formatting options based on the range
      let dateOptions: Intl.DateTimeFormatOptions = {};
  
      if (range === "day") {
        dateOptions = {
          month: "short",
          day: "numeric",
          year: "numeric",
        };
      } else if (range === "week") {
        dateOptions = {
          weekday: "long",
        };
      } else if (range === "month") {
        dateOptions = {
          month: "short",
          day: "numeric",
        };
      }
  
      // Create a map to aggregate scores by date
      const scoresByDate: Record<string, number> = {};
      scores.forEach((score) => {
        const localDateKey = new Date(score.date).toLocaleDateString("en-US", dateOptions);
        scoresByDate[localDateKey] = (scoresByDate[localDateKey] || 0) + score.score;
      });
  
      // Prepare the final chartData
      const chartData: { day: string; score: number }[] = [];
      const daysToInclude = range === "week" ? 7 : range === "month" ? 30 : 1;
  
      for (let i = daysToInclude - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
  
        const dayLabel = date.toLocaleDateString("en-US", dateOptions);
  
        chartData.push({
          day: dayLabel,
          score: scoresByDate[dayLabel] || 0,
        });
      }
  
      return chartData;
    } catch (error) {
      console.error("Error fetching scores by range:", error);
      return null;
    }
  };
  