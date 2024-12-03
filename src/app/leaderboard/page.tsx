import { MapPin } from "lucide-react";
import { LeaderboardTabs } from "@/components/leaderboard/leaderboardTabs";
import { auth } from "@/lib/auth";

export default async function Leaderboard() {
  const session = await auth();
  const isAuthenticated = !!session;
  if (!isAuthenticated) {
    return (
      <div className="mt-10 text-xl">Please sign in to view this page</div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-start w-full">
      <div className="pt-4 pb-4 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <MapPin className="h-10 w-10 text-white sm:mr-4 mr-0" />
          <h1 className="text-3xl font-bold text-white sm:text-4xl">UTSCdle</h1>
        </div>
        <p className="mt-3 text-xl font-bold text-gray-300">Leaderboard</p>
      </div>
      <LeaderboardTabs />
    </div>
  );
}
