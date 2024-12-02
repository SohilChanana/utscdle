import { MapPin } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { MapSIProvider } from "../../hooks/mapSIProvider";
import { MapComponentSI } from "../../components/mapSI";
import { SubmitImageButton } from "../../components/submitImageButton";
import { auth } from "@/lib/auth";

export default async function SubmitImage() {
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
        <p className="mt-3 text-xl text-gray-300 font-bold">Submit an Image</p>
      </div>
      <div className="flex flex-col w-full items-center p-4 bg-[#424242] rounded-xl m-4">
        <MapSIProvider>
          <div className="mb-5">
            Select the image&apos;s location on the map
          </div>
          <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
            <MapComponentSI />
          </div>
          <div className="flex flex-col items-center mt-4">
            <SubmitImageButton />
          </div>
        </MapSIProvider>
      </div>
    </div>
  );
}
