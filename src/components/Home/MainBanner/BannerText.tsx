import { Heart, Search, House } from "lucide-react";
import Button from "@/components/Basic/Button";

export default function BannerText() {
  return (
    <div className="flex flex-col gap-8 z-10">
      <div className="flex items-center gap-2 bg-[var(--secondary)]/50 text-[var(--secondary-foreground)] text-sm px-4 py-2 rounded-full w-fit">
        <Heart
          style={{
            width: 18,
            height: 18,
          }}
          fill="var(--primary)"
          stroke="none"
        />
        <p>Conectando familias con sus mascotas</p>
      </div>
      <h1 className="text-4xl font-bold text-balance">
        Cada mascota merece{" "}
        <span className="text-[var(--primary)]">volver a casa</span>
      </h1>
      <p className="text-lg text-[var(--muted-foreground)]">
        Reencuentro es la plataforma donde las mascotas perdidas encuentran su
        camino de vuelta, y donde animales que buscan un hogar encuentran
        familias que los adoptan.
      </p>
      <div className="flex items-center gap-4">
        <Button
          variant="primary"
          className="font-semibold px-4 py-2 flex items-center gap-2 border border-[var(--primary)]"
        >
          <Search className="w-4 h-4" /> Buscar mascota
        </Button>
        <Button
          variant="secondary"
          className="font-semibold px-4 py-2 flex items-center gap-2 border border-[var(--primary)]"
        >
          <House className="w-4 h-4" /> Reportar hallazgo
        </Button>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-[var(--primary)] w-2 h-2" />
          <p className="text-sm text-[var(--foreground)] text-balance">
            100% gratuito
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-[var(--found)] w-2 h-2" />
          <p className="text-sm text-[var(--foreground)] text-balance">
            Comunidad solidaria
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-[var(--adoption)] w-2 h-2" />
          <p className="text-sm text-[var(--foreground)] text-balance">
            Fácil de usar
          </p>
        </div>
      </div>
    </div>
  );
}
