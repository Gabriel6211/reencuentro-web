import { Heart } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const Logo = ({ size = "md", showText = true, className = "" }: LogoProps) => {
  const sizes = {
    sm: { icon: 24, text: "text-xl" },
    md: { icon: 32, text: "text-2xl" },
    lg: { icon: 48, text: "text-4xl" },
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        {/* Paw print made with circles */}
        <svg
          width={sizes[size].icon}
          height={sizes[size].icon}
          viewBox="0 0 48 48"
          fill="none"
          className="text-primary"
        >
          {/* Main pad */}
          <ellipse cx="24" cy="30" rx="10" ry="8" fill="var(--primary)" />
          {/* Toe pads */}
          <circle cx="14" cy="18" r="5" fill="var(--primary)" />
          <circle cx="24" cy="14" r="5" fill="var(--primary)" />
          <circle cx="34" cy="18" r="5" fill="var(--primary)" />
          {/* Heart in center */}
          <Heart
            className="absolute"
            style={{
              width: sizes[size].icon * 0.35,
              height: sizes[size].icon * 0.35,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -20%)",
            }}
            fill="var(--primary-foreground)"
            stroke="none"
          />
        </svg>
        <Heart
          className="absolute text-primary-foreground"
          style={{
            width: sizes[size].icon * 0.3,
            height: sizes[size].icon * 0.3,
            top: "52%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          fill="var(--primary-foreground)"
          stroke="none"
        />
      </div>
      {showText && (
        <span
          className={`font-serif font-semibold ${sizes[size].text} text-foreground`}
        >
          Reencuentro
        </span>
      )}
    </div>
  );
};

export default Logo;
