// collectionsContent.tsx

"use client";

import { CollectionsProvider } from "@/hooks/collectionsProvider";
import CollectionsImage from "./collectionsImage";
import { CollectionMapComponent } from "./collectionsMap";
import AttemptTable from "./collectionsAttemptTable";
import CollectionsCheckDistanceButton from "./collectionsConfirm";
import NextImageButton from "./nextImageButton";
import PreviousImageButton from "./previousImageButton";

interface CollectionsContentProps {
  tagFilter: string;
}

export default function CollectionsContent({
  tagFilter,
}: CollectionsContentProps) {
  return (
    <CollectionsProvider tagFilter={tagFilter}>
      <div className="flex flex-col sm:flex-row sm:space-x-6 w-full items-center p-4 bg-[#424242] rounded-xl mb-4 mx-4">
        {/* Pixelated Image */}
        <div className="w-full sm:w-1/2">
          <CollectionsImage desiredBlocks={30} alt="UTSC Image" />
        </div>

        {/* Map Component */}
        <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
          <CollectionMapComponent />
        </div>
      </div>

      <div className="flex flex-col w-full justify-center">
        <div className="flex items-center justify-around w-full mt-4">
          <PreviousImageButton />
          <CollectionsCheckDistanceButton />
          <NextImageButton />
        </div>

        <div className="w-60 h-44 mx-auto mt-4">
          <AttemptTable />
        </div>
      </div>
    </CollectionsProvider>
  );
}
