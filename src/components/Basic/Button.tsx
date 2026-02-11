interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "custom";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] transition-all duration-300 border-2 border-transparent",
    secondary:
      "text-[var(--foreground)] box-border border-2 border-[var(--primary)]/50 hover:border-[var(--primary)]",
    custom: "border-2 border-transparent",
  };

  const buttonClasses = "rounded-lg cursor-pointer transition-all duration-300";

  return (
    <button
      className={`${buttonClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
