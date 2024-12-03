import { MapPin } from "lucide-react";
import PixelatedImage from "@/components/pixelatedImage";
import { MapProvider } from "@/hooks/mapProvider";
import { TimerProvider } from "@/hooks/timerContext";
import { MapComponent } from "@/components/map";
import { getDailyImage } from "@/lib/actions/images/getDailyImage";
import AttemptTable from "@/components/attemptTable";
import CheckDistanceButton from "@/components/confirmButton";
import HowToPlayButton from "@/components/howToPlayButton";
import Timer from "@/components/timer";
import GameOverlay from "@/components/gameOverlay";
import { sendScheduledEmail } from "../../lib/actions/email/sendDailyEmails";
import Credits from "../credits/page";
import Link from 'next/link';

export default async function DailyChallenge() {
  const currentDate = () => new Date().toDateString();
  const image = await getDailyImage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start w-full">
      <TimerProvider>
        <HowToPlayButton />
        <div className="pt-4 pb-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center">
            <MapPin className="h-10 w-10 text-white sm:mr-4 mr-0" />
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              UTSCdle
            </h1>
          </div>
          <div className="mt-4">
          
        </div>
          <p className="mt-3 text-lg text-gray-300">
            Inspired by Geoguessr™ and Wordle™
          </p>
          <Link href="/credits">
            <button className="bg-transparent text-white px-4 text-sm rounded">
              View Credits
            </button>
          </Link>
          <p className="mt-3 text-lg text-gray-300 font-bold">{currentDate()}</p>
          <Timer />
        </div>

        {/* Image and Map Section */}
        <GameOverlay>
          <MapProvider>
            <div className="flex flex-col sm:flex-row sm:space-x-6 w-full items-center p-4 bg-[#424242] rounded-xl mb-4 mr-6">
              {/* Pixelated Image */}
              <div className="w-full sm:w-1/2">
                <PixelatedImage
                  src={`${image.image.url}`}
                  desiredBlocks={30}
                  alt="UTSC Image"
                />
              </div>

              {/* Map Component */}
              <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
                <MapComponent
                  coords={JSON.stringify(image.image.coordinates)}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-6 w-1/2 items-center bg-[#424242] rounded-xl shadow-2xl"></div>
            <CheckDistanceButton
              coords={JSON.stringify(image.image.coordinates)}
            />
            <div className="w-60 h-44">
              <AttemptTable />
            </div>
          </MapProvider>
        </GameOverlay>
      </TimerProvider>
    </div>
  );
}
