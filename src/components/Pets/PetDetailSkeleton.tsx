import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function PetDetailSkeleton() {
  return (
    <section className="container w-full flex flex-col py-8 pb-16">
      <Link
        href="/mascotas"
        className="self-start flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Volver a mascotas
      </Link>
      <article className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
        {/* Image skeleton */}
        <figure className="m-0">
          <div className="relative w-full aspect-[4/3] shrink-0 overflow-hidden rounded-2xl bg-[var(--muted)]">
            {/* Badge skeleton */}
            <div className="absolute top-4 left-4 h-7 w-24 rounded-full bg-[var(--muted-foreground)]/20" />
          </div>
        </figure>
        {/* Content skeleton */}
        <div className="flex flex-col gap-4">
          {/* Title and breed */}
          <header className="space-y-2">
            <div className="h-8 w-3/4 bg-[var(--muted)] rounded" />
            <div className="h-6 w-1/2 bg-[var(--muted)] rounded" />
          </header>
          {/* Pet fields pills */}
          <div className="flex flex-wrap gap-x-4 gap-y-4">
            <div className="h-9 w-24 rounded-full bg-[var(--muted)]" />
            <div className="h-9 w-28 rounded-full bg-[var(--muted)]" />
            <div className="h-9 w-32 rounded-full bg-[var(--muted)]" />
            <div className="h-9 w-20 rounded-full bg-[var(--muted)]" />
          </div>
          {/* Description section */}
          <section className="space-y-2">
            <div className="h-6 w-32 bg-[var(--muted)] rounded" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-[var(--muted)] rounded" />
              <div className="h-4 w-full bg-[var(--muted)] rounded" />
              <div className="h-4 w-3/4 bg-[var(--muted)] rounded" />
            </div>
          </section>
          {/* Location section */}
          <section className="space-y-2">
            <div className="h-6 w-40 bg-[var(--muted)] rounded" />
            <div className="h-4 w-1/2 bg-[var(--muted)] rounded" />
          </section>
          {/* Contact section */}
          <section className="space-y-2">
            <div className="h-6 w-24 bg-[var(--muted)] rounded" />
            <div className="h-4 w-64 bg-[var(--muted)] rounded" />
          </section>
          {/* Date */}
          <div className="h-3 w-48 bg-[var(--muted)] rounded" />
          {/* Button */}
          <div className="h-12 w-full rounded-md bg-[var(--muted)]" />
        </div>
      </article>
    </section>
  );
}
