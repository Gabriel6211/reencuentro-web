import CardsSection from "./CardsSection";

export default function HowToHelp() {
  return (
    <section className="full-bleed flex flex-col items-center justify-center py-12 lg:py-20 gap-4 bg-[var(--background-secondary)]/50 w-full overflow-x-hidden">
      <h2 className="text-4xl text-[var(--foreground)] font-serif font-bold">
        Tres formas de ayudar
      </h2>
      <p className="text-lg text-[var(--muted-foreground)] max-w-2xl text-center">
        Ya sea adoptando, reportando o encontrando, cada acción cuenta en la
        misión de reunir familias con sus mascotas.
      </p>
      <CardsSection />
    </section>
  );
}
