"use client";
import Button from "@/components/Basic/Button";
import Filters, { type FilterOption } from "./Filters";
import PetCard from "@/components/Basic/PetCard";
import { PostRow } from "@/types";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const lastReports: PostRow[] = [
  {
    id: "1",
    user_id: "mock-user-1",
    title: "Firulais perdido en San Carlos",
    content: "Perro perdido, responde al nombre Firulais.",
    image_urls: ["/images/pets/Paco_1.jpeg"],
    location: "San Carlos",
    post_type: "lost",
    status: "active",
    date_lost_or_found: new Date().toISOString(),
    pet_name: "Firulais",
    pet_age: 1,
    pet_gender: "male",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "mock-user-2",
    title: "Michi encontrado",
    content: "Gata encontrada en San Carlos.",
    image_urls: ["/images/pets/Lola_1.jpeg"],
    location: "San Carlos",
    post_type: "found",
    status: "active",
    date_lost_or_found: new Date().toISOString(),
    pet_name: "Michi",
    pet_age: 2,
    pet_gender: "female",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    user_id: "mock-user-3",
    title: "Pelusa en adopción",
    content: "Pelusa busca familia.",
    image_urls: ["/images/pets/Romeo_1.jpeg"],
    location: "San Carlos",
    post_type: "adoption",
    status: "active",
    date_lost_or_found: new Date().toISOString(),
    pet_name: "Pelusa",
    pet_age: 3,
    pet_gender: "male",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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
        <Filters selected={selected} changeSelected={setSelected} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {lastReports.map((post, i) => (
          <PetCard
            key={post.id}
            {...post}
            priorityImage={i === 0}
          />
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
