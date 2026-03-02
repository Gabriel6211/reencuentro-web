"use client";

import { Search } from "lucide-react";
import { useRef, useState } from "react";

interface InputProps {
  placeholder?: string;
  className?: string;
  type?: string;
  search?: boolean;
}

export default function Input({
  placeholder,
  className,
  type = "text",
  search = false,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleDivClick = () => {
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      onClick={handleDivClick}
      className={`relative rounded-md border p-2 cursor-text transition-colors ${
        isFocused ? "border-[var(--foreground)]/65" : "border-[var(--border)]"
      } ${className}`}
    >
      {search && (
        <Search className="w-4 h-4 text-[var(--muted-foreground)] absolute left-2 top-1/2 -translate-y-1/2" />
      )}
      <input
        ref={inputRef}
        placeholder={placeholder}
        className={`w-full bg-transparent ${search ? "pl-6" : ""}`}
        type={type}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}
