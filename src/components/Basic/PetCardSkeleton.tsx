import Card from "./Card";

export default function PetCardSkeleton() {
  return (
    <Card className="flex w-full min-w-0 flex-col p-0 overflow-hidden self-start">
      {/* Image area - matches PetCard aspect and badge position */}
      <div className="relative w-full aspect-[4/3] shrink-0 bg-[var(--muted)] animate-pulse overflow-hidden rounded-t-xl">
        <div className="absolute top-3 left-3 h-6 w-20 rounded-full bg-[var(--muted-foreground)]/20" />
      </div>

      {/* Content section - matches PetCard p-4, gap-1; no flex-1 so height is content-based and consistent */}
      <section className="flex min-w-0 flex-col gap-1 p-4 shrink-0">
        {/* Title */}
        <div className="h-6 w-3/4 max-w-[14rem] rounded bg-[var(--muted)] animate-pulse" />

        {/* Gender / age row */}
        <div className="flex items-center gap-1">
          <div className="h-4 w-16 rounded bg-[var(--muted)] animate-pulse" />
          <div className="h-4 w-14 rounded bg-[var(--muted)] animate-pulse" />
        </div>

        {/* Location + time row (icons + text) */}
        <div className="flex gap-4">
          <div className="flex min-w-0 items-center gap-1">
            <div className="h-4 w-4 shrink-0 rounded bg-[var(--muted)] animate-pulse" />
            <div className="h-4 w-24 rounded bg-[var(--muted)] animate-pulse" />
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <div className="h-4 w-4 rounded bg-[var(--muted)] animate-pulse" />
            <div className="h-4 w-20 rounded bg-[var(--muted)] animate-pulse" />
          </div>
        </div>

        {/* Button */}
        <div className="mt-4 h-9 w-full rounded-md bg-[var(--muted)] animate-pulse" />
      </section>
    </Card>
  );
}
