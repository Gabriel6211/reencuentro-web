import Button from "../Basic/Button";
import { Plus } from "lucide-react";

export default function ReportSection() {
  return (
    <section className="container flex flex-col items-center justify-center gap-4 my-20 ">
      <h1 className="text-4xl font-bold text-[var(--foreground)] font-serif">
        ¿No encuentras lo que buscas?
      </h1>
      <p className="text-lg text-[var(--muted-foreground)]">
        Crea un reporte y deja que la comunidad te ayude a solucionar tu
        problema.
      </p>
      <div className="flex flex-col w-full sm:w-auto sm:flex-row items-center gap-4">
        <Button
          variant="primary"
          className="flex items-center justify-center gap-2 px-6 py-3 font-semibold w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Crear un reporte
        </Button>
        <Button
          variant="secondary"
          className="flex items-center justify-center gap-2 px-6 py-3 font-semibold w-full sm:w-auto"
        >
          ¿Cómo funciona?
        </Button>
      </div>
    </section>
  );
}
