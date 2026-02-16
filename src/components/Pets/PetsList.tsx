"use client";
import Filters, { type FilterOption } from "../Home/LastReports/Filters";
import { PostRow } from "@/types";
import { Funnel } from "lucide-react";
import PetCard from "../Basic/PetCard";
import PetCardSkeleton from "../Basic/PetCardSkeleton";
import Input from "../Basic/Input";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/services/PostsService";

const SKELETON_COUNT = 6;

export default function PetsList() {
  const { data: pets } = useQuery<PostRow[]>({
    queryKey: ["pets"],
    queryFn: () => getPosts(),
  });

  const [selected, setSelected] = useState<FilterOption>("all");

  return (
    <section className="full-bleed flex min-h-0 flex-1 flex-col bg-[var(--background-secondary)]/75">
      <div className="flex shrink-0 flex-row items-center gap-4 w-full py-6">
        <Input className="w-1/4" placeholder="Buscar mascota" search />
        <Funnel className="w-5 h-5 text-[var(--muted-foreground)]" />
        <Filters selected={selected} changeSelected={setSelected} />
      </div>
      <div className="min-h-0 flex-1">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full pb-8 ${pets ? "fade-in-cards" : ""}`}
        >
          {!pets
            ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
                <PetCardSkeleton key={i} />
              ))
            : pets.map((pet, i) => (
                <PetCard key={pet.id} {...pet} priorityImage={i === 0} />
              ))}
        </div>
      </div>
    </section>
  );
}
