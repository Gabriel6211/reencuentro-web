import type { LucideIcon } from "lucide-react";
import {
  User,
  Cake,
  List,
  VenusAndMars,
  Palette,
  Ruler,
  Clock,
} from "lucide-react";
import type { PostType } from "@/types";

/** Human-readable labels for post type, with gender variants for lost/found */
export const POST_TYPE_LABELS: Record<
  PostType,
  string | { male: string; female: string }
> = {
  lost: { male: "Perdido", female: "Perdida" },
  found: { male: "Encontrado", female: "Encontrada" },
  adoption: "En adopción",
};

/** CTA button text per post type */
export const BUTTON_TEXT: Record<PostType, string> = {
  lost: "He visto a este animal",
  found: "¿Es tu mascota?",
  adoption: "Quiero adoptar",
};

/** Resolved status labels (when post is no longer active) */
export const RESOLVED_LABELS: Record<string, string> = {
  reunited: "Reunido",
  adopted: "Adoptado",
  found: "Encontrado",
};

/** Pet field keys to display labels (for aria-label / accessibility) */
export const PET_FIELD_LABELS: Record<string, string> = {
  time_lost_or_found: "Fecha",
  pet_name: "Nombre",
  pet_age: "Edad",
  pet_breed: "Raza",
  pet_gender: "Género",
  pet_color: "Color",
  pet_size: "Tamaño",
};

/** Pet field keys to icons (for detail view) */
export const PET_FIELD_ICONS: Record<string, LucideIcon> = {
  time_lost_or_found: Clock,
  pet_name: User,
  pet_age: Cake,
  pet_breed: List,
  pet_gender: VenusAndMars,
  pet_color: Palette,
  pet_size: Ruler,
};

/**
 * Returns the display label for a post type, using gender when the label has variants.
 */
export function postTypeLabel(postType: PostType, gender?: string | null): string {
  const label = POST_TYPE_LABELS[postType];
  if (typeof label === "string") return label;
  return gender === "female" ? label.female : label.male;
}
