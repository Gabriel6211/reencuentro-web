"use client";

import Button from "@/components/Basic/Button";
import { MessageCircleWarning, User } from "lucide-react";

export default function LoginSection({ className }: { className?: string }) {
  return (
    <section className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="secondary"
        className="font-semibold flex items-center gap-2 text-sm py-1 px-2"
        onClick={() => {}}
      >
        <User className="w-4 h-4" />
        Iniciar sesión
      </Button>
      <Button
        variant="primary"
        className="font-semibold flex items-center gap-2 text-sm py-1 px-2"
        onClick={() => {}}
      >
        Reportar animal
        <MessageCircleWarning className="w-4 h-4" />
      </Button>
    </section>
  );
}
