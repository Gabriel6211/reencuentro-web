"use client";
import Button from "@/components/Basic/Button";
import Filters, { type FilterOption } from "./Filters";
import PetCard from "@/components/Basic/PetCard";
import { ReportItem } from "@/types";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const lastReports: ReportItem[] = [
  {
    id: 1,
    name: "Firulais",
    photo: "/images/pets/Paco_1.jpeg",
    status: "lost",
    location: "San Carlos",
    date: new Date(),
    animalType: "dog",
    gender: "male",
    age: 1,
  },
  {
    id: 2,
    name: "Michi",
    photo: "/images/pets/Lola_1.jpeg",
    status: "found",
    location: "San Carlos",
    date: new Date(),
    animalType: "cat",
    gender: "female",
    age: 2,
  },
  {
    id: 3,
    name: "Pelusa",
    photo: "/images/pets/Romeo_1.jpeg",
    status: "adoption",
    location: "San Carlos",
    date: new Date(),
    animalType: "other",
    gender: "male",
    age: 3,
  },
];

export default function LastReports() {
  const [selected, setSelected] = useState<FilterOption>("all");

  return (
    <section className="w-full py-12 lg:py-16 flex flex-col gap-4">
      <h1 className="text-4xl text-[var(--foreground)] font-serif font-bold">
        Últimos reportes
      </h1>
      <div className="flex flex-row items-center justify-between gap-4 w-full">
        <p className="text-[var(--muted-foreground)] text-xl">
          Mascotas que necesitan tu ayuda ahora mismo
        </p>
        <Filters changeSelected={setSelected} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {lastReports.map((report) => (
          <PetCard key={report.id} {...report} />
        ))}
      </div>
      <Button
        variant="secondary"
        className="w-fit mt-10 mx-auto font-semibold px-4 py-2 flex items-center gap-2"
      >
        Ver todas las mascotas <ArrowRight className="w-4 h-4 shrink-0" />
      </Button>
    </section>
  );
}
