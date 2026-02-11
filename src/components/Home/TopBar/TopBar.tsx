import Logo from "@/components/Basic/Logo";
import Link from "next/link";
import LoginSection from "./LoginSection";

const links = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Perdidos",
    href: "/perdidos",
  },
  {
    label: "Encontrados",
    href: "/encontrados",
  },
  {
    label: "Adopciones",
    href: "/adopciones",
  },
  {
    label: "Cómo funciona",
    href: "/about",
  },
];

export default function TopBar() {
  return (
    <header className="top-bar fixed inset-x-0 top-0 backdrop-blur z-50 bg-[var(--background)] border-b border-[var(--border)] p-4 w-full">
      <div className="container flex items-center">
        <Logo className="mr-5" />
        <nav
          aria-label="Main navigation"
          className="flex mt-1 items-center justify-center gap-4"
        >
          <ul className="flex items-center gap-4">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  className="text-sm font-medium hover:text-[var(--primary)] transition-colors"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <LoginSection className="ml-auto" />
      </div>
    </header>
  );
}
