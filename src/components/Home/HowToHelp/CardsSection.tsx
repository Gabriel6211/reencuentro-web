import { Heart, Search, House, ArrowRight } from "lucide-react";
import Card from "@/components/Basic/Card";
import Button from "@/components/Basic/Button";

const numbers = {
  foundPets: 46,
  lostPets: 12,
  petsToAdopt: 34,
};

const cards = [
  {
    icon: Search,
    title: "Mascotas perdidas",
    description:
      "Sabemos lo difícil que es perder a un compañero. Aquí puedes reportar y buscar a tu mascota perdida.",
    number: `🔍 ${numbers.lostPets} familias buscándolos`,
    button: "Reportar animal perdido",
    buttonVariant: "custom",
    buttonClassName:
      "bg-[var(--lost)] text-[var(--background)]",
  },
  {
    icon: House,
    title: "Animales encontrados",
    description:
      "¿Encontraste un animal perdido? Ayúdanos a reunirlo con su familia. Tu reporte puede hacer la diferencia.",
    number: `🎯 ${numbers.foundPets} esperando el reencuentro`,
    button: "Reportar animal encontrado",
    buttonVariant: "custom",
    buttonClassName:
      "bg-[var(--found)] text-[var(--background)]",
  },
  {
    icon: Heart,
    title: "Adopción gratuita",
    description:
      "Dale una segunda oportunidad a un animal que necesita un hogar lleno de amor. Cada adopción es una vida transformada.",
    number: `🏠 ${numbers.petsToAdopt} animales buscando hogar`,
    button: "Ver mascotas en adopción",
    buttonVariant: "custom",
    buttonClassName:
      "bg-[var(--adoption)] text-[var(--background)]",
  },
];

export default function CardsSection() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="h-full p-4 sm:p-6 lg:p-8 flex flex-col gap-3 sm:gap-4 w-full hover:brightness-102"
        >
          <card.icon className="w-7 h-7 sm:w-8 sm:h-8 my-2 sm:my-4 lg:my-6 text-[var(--foreground)] transition-transform duration-200 group-hover:scale-110 shrink-0" />
          <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] shrink-0">
            {card.title}
          </h3>
          <p className="flex-1 text-sm sm:text-base text-[var(--muted-foreground)] min-h-0">
            {card.description}
          </p>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] bg-[var(--background-tertiary)] rounded-full w-fit px-2 py-1 shrink-0">
            {card.number}
          </p>
          <Button
            variant="custom"
            className={`w-full sm:w-auto gap-2 py-2 flex items-center justify-center font-medium hover:brightness-110 ${card.buttonClassName}`}
          >
            {card.button} <ArrowRight className="w-4 h-4 shrink-0" />
          </Button>
        </Card>
      ))}
    </section>
  );
}
