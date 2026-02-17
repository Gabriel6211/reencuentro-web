"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/services/PostsService";
import PetDetailContent from "@/components/Pets/PetDetailContent";
import { ChevronLeft } from "lucide-react";
import PetDetailSkeleton from "@/components/Pets/PetDetailSkeleton";

export default function PetDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const router = useRouter();

  const { data: pet, isPending, isError } = useQuery({
    queryKey: ["pet", id],
    queryFn: () => getPostById(id!),
    enabled: !!id,
  });

  if (!id) {
    router.replace("/mascotas");
    return null;
  }

  if (isPending) {
    return <PetDetailSkeleton />;
  }

  if (isError || (!isPending && !pet)) {
    return (
      <section className="container w-full flex flex-col py-8 pb-16">
        <Link
          href="/mascotas"
          className="self-start flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver a mascotas
        </Link>
        <p className="text-[var(--muted-foreground)]">Mascota no encontrada.</p>
      </section>
    );
  }

  return (
    <section className="container w-full flex flex-col py-8 pb-16">
      <Link
        href="/mascotas"
        className="self-start flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Volver a mascotas
      </Link>
      <PetDetailContent pet={pet} />
    </section>
  );
}
