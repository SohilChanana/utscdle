"use client";
import { cards } from "./cardData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function CardGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full px-4">
      {cards.map((card, index) => (
        <Link href={`/collections/${card.tagFilter}`} key={index}>
          <Card
            className="w-full sm:h-64 md:h-80 lg:h-94 flex flex-col transition duration-300 hover:scale-105 hover:shadow-lg border hover:border-white"
          >
            <CardHeader className={card.image ? "rounded-t-lg py-4" : ""}>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>

            {card.image && (
              <div className="flex-grow overflow-hidden">
                <Image
                  src={card.image}
                  width={1280}
                  height={720}
                  alt={card.title}
                  className="w-full h-full object-cover rounded-b-lg"
                />
              </div>
            )}
          </Card>
        </Link>
      ))}
    </div>
  );
}
