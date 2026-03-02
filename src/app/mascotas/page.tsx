import PetsHeader from "@/components/Pets/Header";
import PetsList from "@/components/Pets/PetsList";
import ReportSection from "@/components/Pets/ReportSection";

export default function MascotasPage() {
  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col">
      <PetsHeader />
      <PetsList />
      <ReportSection />
    </section>
  );
}
