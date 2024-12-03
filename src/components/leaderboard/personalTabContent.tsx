"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PersonalChart } from "./personalChart";

export function PersonalTabContent() {
  const [selectedRange, setSelectedRange] = useState("week"); // Default to "week"
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/scores/${selectedRange}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data.success) {
          console.log("Fetched chart data:", data.data);
          setChartData(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch chart data");
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedRange]); // Re-fetch when selectedRange changes

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <CardTitle>Personal Scores</CardTitle>
        <Select
          value={selectedRange}
          onValueChange={(value) => setSelectedRange(value)}
        >
          <SelectTrigger className="w-48 ml-4">
            <SelectValue placeholder="Select a Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-2">
        {loading ? (
          <p>Loading chart data...</p>
        ) : error ? (
          <p>Error loading chart data: {error}</p>
        ) : (
          <PersonalChart chartData={chartData} selectedRange={selectedRange} />
        )}
      </CardContent>
    </Card>
  );
}
