"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalTabContent } from "./personalTabContent";
import { GlobalTabContent } from "./globalTabContent";

export function LeaderboardTabs() {
  return (
    <Tabs defaultValue="personal" className="sm:w-2/3 w-full">
      <TabsList className="grid w-full grid-cols-2 bg-[#424242]">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="global">Global</TabsTrigger>
      </TabsList>
      <TabsContent value="personal">
        <PersonalTabContent />
      </TabsContent>
      <TabsContent value="global">
        <GlobalTabContent />
      </TabsContent>
    </Tabs>
  );
}
