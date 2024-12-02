"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface GlobalChartProps {
  chartData: { username: string; score: number }[];
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
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function GlobalChart({ chartData }: GlobalChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Players Today</CardTitle>
        <CardDescription>View today&apos;s top scores</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <p>No data available for this date.</p>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart
              data={chartData}
              layout="vertical"
              width={500}
              height={400}
              margin={{
                top: 20,
                right: 40,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="username"
                type="category"
                tickLine={false}
                tickMargin={2}
                axisLine={false}
              />
              <XAxis type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar dataKey="score" fill="#e21d48" radius={5}>
                <LabelList
                  dataKey="score"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={14}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
