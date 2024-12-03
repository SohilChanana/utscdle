import { Button } from "../ui/button";
import { GalleryHorizontalEnd } from "lucide-react";
import Link from "next/link";

export function ExitCollectionsButton() {
  return (
    <Button asChild className="fixed top-4 right-4 z-50">
      <Link href="/collections" className="flex items-center gap-2">
        <GalleryHorizontalEnd className="w-4 h-4" />
        <span className="hidden sm:inline">Back to Collections</span>
      </Link>
    </Button>
  );
}
