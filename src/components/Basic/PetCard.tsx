"use client";

import { useState } from "react";
import Card from "./Card";
import { PostRow, PostType } from "@/types";
import { MapPin, Clock } from "lucide-react";
import { useRelativeTime } from "@/hooks/use-time";
import Button from "./Button";
import ImageCarousel from "./ImageCarousel";
import PetDetailModal from "./PetDetailModal";

const POST_TYPE_LABELS: Record<
  PostType,
  string | { male: string; female: string }
> = {
  lost: { male: "Perdido", female: "Perdida" },
  found: { male: "Encontrado", female: "Encontrada" },
  adoption: "En adopción",
};

const BUTTON_TEXT: Record<PostType, string> = {
  lost: "He visto a este animal",
  found: "¿Es tu mascota?",
  adoption: "Quiero adoptar",
};

const postTypeLabel = (postType: PostType, gender?: string | null) => {
  const label = POST_TYPE_LABELS[postType];
  if (typeof label === "string") return label;
  return gender === "female" ? label.female : label.male;
};

const RESOLVED_LABELS: Record<string, string> = {
  reunited: "Reunido",
  adopted: "Adoptado",
  found: "Encontrado",
};

type PetCardProps = PostRow & { priorityImage?: boolean };

export default function PetCard(props: PetCardProps) {
  const { priorityImage, ...post } = props;
  const {
    title,
    image_urls,
    status,
    location,
    date_lost_or_found,
    post_type,
    pet_gender,
    pet_age,
  } = post;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const resolvedLabel = status !== "active" ? RESOLVED_LABELS[status] : null;

  return (
    <div
      className="pt-1 -mt-1"
      onClick={() => setIsModalOpen(true)}
      onKeyDown={(e) => e.key === "Enter" && setIsModalOpen(true)}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${title}`}
    >
      <Card className="flex w-full min-w-0 flex-col p-0 cursor-pointer [&_*]:cursor-pointer">
        <div className="relative w-full aspect-[4/3] shrink-0 overflow-hidden rounded-t-xl bg-[var(--muted)]">
          <ImageCarousel
            images={image_urls ?? []}
            alt={title}
            priority={priorityImage}
          />
          <p
            className="absolute top-3 left-3 rounded-full px-2 py-1 text-sm font-semibold text-white z-10"
            style={{
              background: `color-mix(in oklab, var(--${post_type}) 70%, transparent)`,
            }}
          >
            {postTypeLabel(post_type, pet_gender ?? undefined)}
          </p>
          {resolvedLabel && (
            <p className="absolute top-3 right-3 rounded-md bg-[var(--muted-foreground)]/80 px-2 py-1 text-sm text-white z-10">
              {resolvedLabel}
            </p>
          )}
        </div>
        <section className="flex min-w-0 flex-1 flex-col gap-1 p-4">
          <h2 className="text-xl font-serif font-bold text-[var(--foreground)] break-words">
            {title}
          </h2>
          {(pet_gender != null || pet_age != null) && (
            <div className="flex items-center gap-1">
              {pet_gender != null && (
                <p className="text-sm text-[var(--muted-foreground)]">
                  {pet_gender === "male" ? "Masculino" : "Femenino"}
                </p>
              )}
              {pet_age != null && (
                <p className="text-sm text-[var(--muted-foreground)]">
                  {pet_age} {pet_age === 1 ? "año" : "años"}
                </p>
              )}
            </div>
          )}
          <div className="flex gap-4">
            <div className="flex min-w-0 items-center gap-1">
              <MapPin className="w-4 h-4 shrink-0 text-[var(--muted-foreground)]" />
              <p className="truncate text-sm text-[var(--muted-foreground)]">
                {location}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Clock className="w-4 h-4 text-[var(--muted-foreground)]" />
              <p className="text-sm text-[var(--muted-foreground)]">
                {useRelativeTime(date_lost_or_found)}
              </p>
            </div>
          </div>
          <Button
            variant="custom"
            className={`mt-auto w-full shrink-0 py-2 mt-4 font-semibold text-sm text-[var(--background)] bg-[var(--${post_type})] hover:brightness-110 cursor-pointer block`}
          >
            {BUTTON_TEXT[post_type]}
          </Button>
        </section>
      </Card>
      {isModalOpen && (
        <PetDetailModal pet={post} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
