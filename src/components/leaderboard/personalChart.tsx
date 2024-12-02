"use client";

import { LineChart, Line, XAxis, CartesianGrid, Tooltip, LabelList } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PersonalChartProps {
  chartData: { day: string; score: number }[];
  selectedRange: string;
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function PersonalChart({ chartData, selectedRange }: PersonalChartProps) {
  // Determine chart title and description based on selected range
  let chartTitle = "";
  let chartDescription = "";

  if (selectedRange === "day") {
    chartTitle = "Today's Score";
    chartDescription = "Your score for today";
  } else if (selectedRange === "week") {
    chartTitle = "Last Week";
    chartDescription = "Your scores over the past week";
  } else if (selectedRange === "month") {
    chartTitle = "Last Month";
    chartDescription = "Your scores over the past month";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartTitle}</CardTitle>
        <CardDescription>{chartDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <p>No data available for this time period.</p>
        ) : (
          <ChartContainer config={chartConfig}>
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <Tooltip
                cursor={true}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="score"
                type="linear"
                stroke="#e21d48"
                strokeWidth={2}
                dot={{
                  fill: "#e21d48",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
