"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GlobalChart } from "./globalChart";

export function GlobalTabContent() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [topTenData, setTopTenData] = useState([]);
  const [userScore, setUserScore] = useState<number | null>(null);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDate) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
          const dateString = format(selectedDate, "yyyy-MM-dd");
          const response = await fetch(`/api/scores/getTopTen/${dateString}`, {
            credentials: "include",
          });
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          if (data.success) {
            console.log("Fetched top ten data:", data.data);
            setTopTenData(data.data.topTen);
            setUserScore(data.data.userScore);
            setUserRank(data.data.userRank);
          } else {
            throw new Error(data.message || "Failed to fetch data");
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
    }
  }, [selectedDate]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <CardTitle>Global Leaderboard</CardTitle>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-48 pl-3 text-left font-normal ml-4",
                !selectedDate && "text-muted-foreground"
              )}
            >
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className="space-y-2">
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>Error loading data: {error}</p>
        ) : selectedDate ? (
          <>
            <div className="flex flex-row">
              <div className="mr-4">
                Your Ranking:{" "}
                <p className="text-xl font-bold">
                  {userRank !== null ? `#${userRank}` : "N/A"}
                </p>
              </div>
              <div>
                Your Score:{" "}
                <p className="text-xl font-bold">
                  {userScore !== null ? userScore : "N/A"}
                </p>
              </div>
            </div>
            <GlobalChart chartData={topTenData} />
          </>
        ) : (
          <p>Please select a date to view the leaderboard.</p>
        )}
      </CardContent>
    </Card>
  );
}
