import Card from "./Card";
import Image from "next/image";
import { CardData, Status, AnimalType } from "@/types";
import { MapPin, Clock } from "lucide-react";
import { useRelativeTime } from "@/hooks/use-time";
import Button from "./Button";

const animalTypeText = (animalType: AnimalType) => {
  switch (animalType) {
    case "dog":
      return "🦮";
    case "cat":
      return "🐈";
    default:
      return "🐾";
  }
};

const STATUS_LABELS: Record<Status, string | { male: string; female: string }> =
  {
    lost: { male: "Perdido", female: "Perdida" },
    found: { male: "Encontrado", female: "Encontrada" },
    adoption: "En adopción",
  };

const BUTTON_TEXT: Record<Status, string> = {
  lost: "He visto a este animal",
  found: "¿Es tu mascota?",
  adoption: "Quiero adoptar",
};

const statusText = (status: Status, gender: "male" | "female") => {
  const label = STATUS_LABELS[status];
  return typeof label === "string" ? label : label[gender];
};

export default function PetCard({
  name,
  photo,
  status,
  location,
  date,
  animalType,
  gender,
  age,
}: CardData) {
  return (
    <Card className="flex flex-col p-0 overflow-hidden cursor-pointer [&_*]:cursor-pointer">
      <div className="relative w-full aspect-[4/3] shrink-0 bg-[var(--muted)]">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover overflow-hidden"
        />
        <p
          className="absolute top-3 left-3 rounded-full px-2 py-1 text-sm font-semibold text-white"
          style={{
            background: `color-mix(in oklab, var(--${status}) 70%, transparent)`,
          }}
        >
          {statusText(status, gender)}
        </p>
        <p
          className={`absolute top-3 right-3 rounded-md ${status === "lost" ? "bg-[var(--lost)]/70" : status === "found" ? "bg-[var(--found)]/70" : "bg-[var(--adoption)]/70"} px-2 py-1 text-sm text-white`}
        >
          {animalTypeText(animalType)}
        </p>
      </div>
      <section className="flex flex-col gap-1 p-4">
        <h2 className="text-xl font-serif font-bold text-[var(--foreground)]">
          {name}
        </h2>
        <div className="flex items-center gap-1">
          <p className="text-sm text-[var(--muted-foreground)]">
            {gender === "male" ? "Masculino" : "Femenino"}
          </p>
          <p className="text-sm text-[var(--muted-foreground)]">
            {age} {age === 1 ? "año" : "años"}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-[var(--muted-foreground)]" />
            <p className="text-sm text-[var(--muted-foreground)]">{location}</p>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-[var(--muted-foreground)]" />
            <p className="text-sm text-[var(--muted-foreground)]">
              {useRelativeTime(date)}
            </p>
          </div>
        </div>
        <Button
          variant="custom"
          className={`w-full py-2 mt-4 font-semibold text-sm text-[var(--background)] bg-[var(--${status})] hover:brightness-110 cursor-pointer`}
        >
          {BUTTON_TEXT[status]}
        </Button>
      </section>
    </Card>
  );
}
