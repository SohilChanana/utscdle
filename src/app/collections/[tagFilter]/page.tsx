import { MapPin } from "lucide-react";
import { cards } from "@/components/collections/cardData";
import CollectionsContent from "@/components/collections/collectionsContent";
import { ExitCollectionsButton } from "@/components/collections/exitCollectionsButton";
import CollectionsHowToPlayPopup from "@/components/collections/collectionsHowToPlay";

interface CollectionsProps {
  tagFilter: string;
}

export default async function Collections({
  params,
}: {
  params: Promise<CollectionsProps>;
}) {
  const { tagFilter } = await params;

  const card = cards.find((card) => card.tagFilter === tagFilter);

  return (
    <div className="min-h-screen flex flex-col items-center w-full">
      <ExitCollectionsButton />
      <CollectionsHowToPlayPopup />
      <div className="pt-4 pb-4 text-center items-center justify-start">
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <MapPin className="h-10 w-10 text-white sm:mr-4 mr-0" />
          <h1 className="text-3xl font-bold text-white sm:text-4xl">UTSCdle</h1>
        </div>
        <p className="mt-3 text-xl font-bold text-gray-300">{card?.title}</p>
      </div>
      <CollectionsContent tagFilter={tagFilter} />
    </div>
  );
}
