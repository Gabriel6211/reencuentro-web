"use client";

import { PostRow, PostType } from "@/types";
import { MapPin, Clock, X, Calendar } from "lucide-react";
import { useRelativeTime } from "@/hooks/use-time";
import ImageCarousel from "./ImageCarousel";
import Button from "./Button";
import { useCallback, useEffect } from "react";

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

const PET_FIELD_LABELS: Record<string, string> = {
  pet_name: "Nombre",
  pet_age: "Edad",
  pet_breed: "Raza",
  pet_gender: "Género",
  pet_color: "Color",
  pet_size: "Tamaño",
};

type PetDetailModalProps = {
  pet: PostRow;
  onClose: () => void;
};

export default function PetDetailModal({ pet, onClose }: PetDetailModalProps) {
  const resolvedLabel =
    pet.status !== "active" ? RESOLVED_LABELS[pet.status] : null;

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapQuery = encodeURIComponent(`${pet.location}, Uruguay`);
  const mapsEmbedUrl = googleMapsApiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${mapQuery}`
    : null;
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const petFields = [
    { key: "pet_name", value: pet.pet_name },
    {
      key: "pet_age",
      value: pet.pet_age != null ? `${pet.pet_age} ${pet.pet_age === 1 ? "año" : "años"}` : null,
    },
    { key: "pet_breed", value: pet.pet_breed },
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
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      role="dialog"
      aria-modal
      aria-labelledby="pet-modal-title"
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-[var(--background)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image carousel */}
        <div className="relative w-full aspect-[4/3] shrink-0 overflow-hidden bg-[var(--muted)]">
          <ImageCarousel images={pet.image_urls ?? []} alt={pet.title} />
          <p
            className="absolute top-4 left-4 rounded-full px-3 py-1.5 text-sm font-semibold text-white z-10"
            style={{
              background: `color-mix(in oklab, var(--${pet.post_type}) 70%, transparent)`,
            }}
          >
            {postTypeLabel(pet.post_type, pet.pet_gender ?? undefined)}
          </p>
          {resolvedLabel && (
            <p className="absolute top-4 right-14 rounded-md bg-[var(--muted-foreground)]/80 px-3 py-1.5 text-sm text-white z-10">
              {resolvedLabel}
            </p>
          )}
        </div>

        {/* Scrollable content */}
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6">
          <h2
            id="pet-modal-title"
            className="text-2xl font-serif font-bold text-[var(--foreground)]"
          >
            {pet.title}
          </h2>

          {pet.content && (
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              {pet.content}
            </p>
          )}

          {petFields.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {petFields.map(({ key, value }) => (
                <div key={key} className="flex gap-1.5">
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {PET_FIELD_LABELS[key]}:
                  </span>
                  <span className="text-sm text-[var(--muted-foreground)]">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{pet.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 shrink-0" />
              <span>{useRelativeTime(pet.date_lost_or_found)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Publicado {new Date(pet.created_at).toLocaleDateString("es-UY", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
            {pet.updated_at !== pet.created_at && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs">Actualizado {new Date(pet.updated_at).toLocaleDateString("es-UY", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
            )}
          </div>

          {/* Google Maps */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">
              Ubicación
            </h3>
            {mapsEmbedUrl ? (
              <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-[var(--muted)]">
                <iframe
                  src={mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa de ${pet.location}`}
                  className="absolute inset-0"
                />
              </div>
            ) : (
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-[var(--muted)] bg-[var(--muted)]/30 px-4 py-6 text-[var(--foreground)] hover:bg-[var(--muted)]/50 transition-colors"
              >
                <MapPin className="w-5 h-5 shrink-0" />
                <span className="font-medium">
                  Ver {pet.location} en Google Maps
                </span>
              </a>
            )}
          </div>

          <Button
            variant="custom"
            className={`w-full shrink-0 py-3 font-semibold text-[var(--background)] bg-[var(--${pet.post_type})] hover:brightness-110`}
          >
            {BUTTON_TEXT[pet.post_type]}
          </Button>
        </div>
      </div>
    </div>
  );
}
