"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "./Card";
import { PostRow } from "@/types";
import { postTypeLabel, BUTTON_TEXT, RESOLVED_LABELS } from "@/lib/pet-labels";
import { MapPin, Clock, Search } from "lucide-react";
import { useRelativeTime } from "@/hooks/use-time";
import ImageCarousel from "./ImageCarousel";
import ImageLightbox from "./ImageLightbox";

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

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const resolvedLabel = status !== "active" ? RESOLVED_LABELS[status] : null;

  return (
    <div className="pt-1 -mt-1 outline-none focus:outline-none">
      <Card className="flex w-full min-w-0 flex-col p-0 cursor-pointer [&_*]:cursor-pointer">
        <div
          className="relative w-full aspect-[4/3] shrink-0 overflow-hidden rounded-t-xl bg-[var(--muted)]"
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <ImageCarousel
            images={image_urls ?? []}
            alt={title}
            priority={priorityImage}
            isImageHovered={isImageHovered}
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
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLightboxOpen(true);
            }}
            className={`absolute inset-0 z-[5] flex items-center justify-center transition-opacity duration-200 focus:opacity-100 focus:outline-none focus:pointer-events-auto ${isImageHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            aria-label="Ver imágenes a tamaño completo"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white shadow-lg hover:bg-black/60">
              <Search className="w-6 h-6" />
            </span>
          </button>
        </div>
        <section className="p-4">
          <Link
            href={`/mascotas/${post.id}`}
            className="block flex flex-1 flex-col gap-2 focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 rounded-xl outline-none"
            aria-label={`Ver detalles de ${title}`}
          >
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
            <span
              className={`w-full shrink-0 py-2 mt-auto font-semibold text-sm text-[var(--background)] bg-[var(--${post_type})] hover:brightness-110 cursor-pointer block text-center rounded-lg`}
            >
              {BUTTON_TEXT[post_type]}
            </span>
          </Link>
        </section>
      </Card>
      {lightboxOpen && (
        <ImageLightbox
          images={image_urls ?? []}
          alt={title}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
