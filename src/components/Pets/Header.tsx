import { Heart } from "lucide-react";

export default function PetsHeader() {
  return (
    <header className="container flex flex-col gap-4 my-12">
      <div className="flex items-center gap-2 bg-[var(--secondary)]/50 text-[var(--secondary-foreground)] text-sm px-4 py-2 rounded-full w-fit">
        <Heart
          style={{
            width: 18,
            height: 18,
          }}
          fill="var(--primary)"
          stroke="none"
        />
        <p>Encuentra a tu compañero</p>
      </div>
      <h1 className="text-4xl font-bold text-balance text-[var(--foreground)]">
        Todas las <span className="text-[var(--primary)]">mascotas</span>
      </h1>
      <p className="text-xl text-[var(--muted-foreground)]">
        6 mascotas encontradas
      </p>
    </header>
  );
}
