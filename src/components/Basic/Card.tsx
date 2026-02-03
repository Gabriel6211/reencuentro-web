interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`group bg-[var(--background)] rounded-xl shadow-md transition-all duration-200 hover:-translate-y-1 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
