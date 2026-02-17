"use client";

import { PostRow } from "@/types";
import {
  postTypeLabel,
  BUTTON_TEXT,
  RESOLVED_LABELS,
  PET_FIELD_ICONS,
  PET_FIELD_LABELS,
} from "@/lib/pet-labels";
import { useRelativeTime } from "@/hooks/use-time";
import ImageCarousel from "../Basic/ImageCarousel";
import Button from "../Basic/Button";
import ImageLightbox from "../Basic/ImageLightbox";
import { useState } from "react";
import { Search } from "lucide-react";

type PetDetailContentProps = { pet: PostRow };

export default function PetDetailContent({ pet }: PetDetailContentProps) {
  const resolvedLabel =
    pet.status !== "active" ? RESOLVED_LABELS[pet.status] : null;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const petFields = [
    { key: "pet_name", value: pet.pet_name },
    {
      key: "pet_age",
      value:
        pet.pet_age != null
          ? `${pet.pet_age} ${pet.pet_age === 1 ? "año" : "años"}`
          : null,
    },
    {
      key: "time_lost_or_found",
      value: useRelativeTime(pet.date_lost_or_found),
    },
    {
      key: "pet_gender",
      value:
        pet.pet_gender === "male"
          ? "Masculino"
          : pet.pet_gender === "female"
            ? "Femenino"
            : null,
    },
    { key: "pet_color", value: pet.pet_color },
    { key: "pet_size", value: pet.pet_size },
  ].filter((f) => f.value != null && f.value !== "");

  return (
    <article
      className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
      aria-label="Ficha de la mascota"
    >
      <figure
        className="m-0"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        <div className="relative w-full aspect-[4/3] shrink-0 overflow-hidden rounded-2xl bg-[var(--muted)]">
          <ImageCarousel
            images={pet.image_urls ?? []}
            alt={pet.title}
            objectFit="contain"
            isImageHovered={isImageHovered}
          />
          <p
            className="absolute top-4 left-4 rounded-full px-3 py-1.5 text-sm font-semibold text-white z-10"
            style={{
              background: `color-mix(in oklab, var(--${pet.post_type}) 70%, transparent)`,
            }}
          >
            {postTypeLabel(pet.post_type, pet.pet_gender ?? undefined)}
          </p>
          {resolvedLabel && (
            <p className="absolute top-4 right-4 rounded-md bg-[var(--muted-foreground)]/80 px-3 py-1.5 text-sm text-white z-10">
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
            className={`absolute inset-0 z-[5] cursor-pointer flex items-center justify-center transition-opacity duration-200 focus:opacity-100 focus:outline-none ${isImageHovered ? "opacity-100" : "opacity-0"}`}
            aria-label="Ver imágenes a tamaño completo"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white shadow-lg hover:bg-black/60">
              <Search className="w-6 h-6" />
            </span>
          </button>
        </div>
      </figure>
      <div className="flex flex-col gap-4">
        <header>
          <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">
            {pet.title}
          </h1>
          <p className="text-[var(--muted-foreground)] capitalize text-lg leading-relaxed">
            {pet.pet_breed ?? "Sin raza"}
          </p>
        </header>
        <div
          className="flex flex-wrap gap-x-4 gap-y-4"
          aria-label="Datos de la mascota"
        >
          {petFields.map(({ key, value }) => {
            const Icon = PET_FIELD_ICONS[key];
            return (
              <div
                key={key}
                className="flex items-center gap-1.5 rounded-full bg-[var(--muted)] px-3 py-2"
                title={PET_FIELD_LABELS[key]}
              >
                {Icon && (
                  <Icon
                    className="w-4 h-4 shrink-0 text-[var(--primary)] font-medium"
                    aria-label={PET_FIELD_LABELS[key]}
                  />
                )}
                <span className="text-md capitalize text-[var(--foreground)]">
                  {String(value)}
                </span>
              </div>
            );
          })}
        </div>
        <section aria-labelledby="desc-heading">
          <h2
            id="desc-heading"
            className="text-lg font-semibold text-[var(--foreground)] mb-1"
          >
            Descripción
          </h2>
          <p className="text-[var(--muted-foreground)]">{pet.content}</p>
        </section>
        <section aria-labelledby="location-heading">
          <h2
            id="location-heading"
            className="text-lg font-semibold text-[var(--foreground)] mb-1"
          >
            Ubicación aproximada
          </h2>
          <p className="text-[var(--muted-foreground)]">{pet.location}</p>
        </section>
        <section aria-labelledby="contact-heading">
          <h2
            id="contact-heading"
            className="text-lg font-semibold text-[var(--foreground)] mb-1"
          >
            Contacto
          </h2>
          <p className="text-[var(--muted-foreground)]">{pet.user_id}</p>
        </section>

        <p className="text-xs text-[var(--muted-foreground)]">
          Publicado el{" "}
          {new Date(pet.created_at).toLocaleDateString("es-UY", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          {pet.updated_at !== pet.created_at && (
            <>
              {" · "}
              Actualizado el{" "}
              {new Date(pet.updated_at).toLocaleDateString("es-UY", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </>
          )}
        </p>

        <Button
          variant="custom"
          className={`w-full shrink-0 py-3 font-semibold text-[var(--background)] bg-[var(--${pet.post_type})] hover:brightness-110`}
        >
          {BUTTON_TEXT[pet.post_type]}
        </Button>
      </div>
      {lightboxOpen && (
        <ImageLightbox
          images={pet.image_urls ?? []}
          alt={pet.title}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </article>
  );
}
