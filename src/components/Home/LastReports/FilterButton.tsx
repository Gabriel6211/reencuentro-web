interface FilterButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const buttonClassNames =
  "rounded-full px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] cursor-pointer";

export default function FilterButton({
  children,
  onClick,
}: FilterButtonProps) {
  return (
    <button onClick={onClick} className={`${buttonClassNames}`}>
      {children}
    </button>
  );
}
