import { Bell, Heart, PawPrint } from "lucide-react";
import Button from "@/components/Basic/Button";

const advantages = [
  {
    icon: "🔔",
    title: "Alertas instantáneas",
    description: "Notificaciones en tiempo real",
  },
  {
    icon: "📍",
    title: "Radio extenso",
    description: "Un radio de 10km",
  },
  {
    icon: "🤝",
    title: "Colaboración comunitaria",
    description: "Reune a mascotas con sus dueños",
  },
];

export default function Alerts() {
  return (
    <section className="full-bleed flex flex-col items-center justify-center py-12 lg:py-20 gap-7 bg-[var(--background-secondary)]/50 w-full overflow-x-hidden">
      <p className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)] rounded-full bg-white shadow-soft px-3 py-1">
        <Bell className="w-4 h-4 text-[var(--primary)]" /> Alertas
        personalizadas
      </p>
      <h1 className="text-5xl font-serif font-bold text-center max-w-xl">
        <span className="text-[var(--foreground)]">
          Recibe alertas de mascotas{" "}
        </span>
        <span className="text-[var(--primary)]">cerca de ti</span>
      </h1>
      <p className="text-center text-lg text-[var(--muted-foreground)] max-w-2xl">
        Regístrate y selecciona tu ubicación en el mapa. Te notificaremos cuando
        una mascota perdida sea reportada cerca de tu zona.
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="primary"
          className="flex items-center gap-2 font-semibold px-6 py-3"
        >
          <PawPrint className="w-4 h-4" /> Regístrate gratis
        </Button>
        <Button
          variant="secondary"
          className="flex items-center gap-2 font-semibold px-6 py-3"
        >
          <Heart className="w-4 h-4" /> Inicia sesión
        </Button>
      </div>
      <section className="flex gap-10">
        {advantages.map((advantage) => (
          <div
            key={advantage.title}
            className="flex flex-col items-center justify-center gap-1"
          >
            <p className="text-xl">{advantage.icon}</p>
            <h3 className="text-[var(--foreground)]">{advantage.title}</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              {advantage.description}
            </p>
          </div>
        ))}
      </section>
    </section>
  );
}
