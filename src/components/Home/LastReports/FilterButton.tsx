interface FilterButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  selected: boolean;
}

const buttonClassNames =
  "rounded-full px-3 py-2 bg-[var(--muted)] text-[var(--foreground)] hover:text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] text-sm cursor-pointer";
const selectedClassNames =
  "bg-[var(--primary-hover)] text-[var(--primary-foreground)]";

export default function FilterButton({
  children,
  onClick,
  className,
  selected,
}: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${buttonClassNames} ${selected ? selectedClassNames : ""} ${className}`}
    >
      {children}
    </button>
  );
}
