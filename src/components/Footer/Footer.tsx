import Logo from "../Basic/Logo";

const sections = [
  {
    title: "Plataforma",
    links: [
      {
        title: "Reportar perdido",
        href: "/",
      },
      {
        title: "Reportar encontrado",
        href: "/",
      },
      {
        title: "Adoptar",
        href: "/",
      },
    ],
  },
  {
    title: "Recursos",
    links: [
      {
        title: "Cómo funciona",
        href: "/",
      },
      {
        title: "Qué hacer si pierdo mi mascota",
        href: "/",
      },
      {
        title: "Consejos de adopción",
        href: "/",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        title: "Política de privacidad",
        href: "/",
      },
      {
        title: "Términos y condiciones",
        href: "/",
      },
      {
        title: "Política de cookies",
        href: "/",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="full-bleed py-12 bg-[var(--background-secondary)]/50 border-t border-[var(--border)]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <section>
          <Logo />
          <p className="text-sm mt-2 max-w-2xs text-[var(--muted-foreground)]">
            Conectando mascotas perdidas con sus familias y animales sin hogar
            con personas que los amen.
          </p>
        </section>
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-[var(--foreground)] font-semibold mb-3">
              {section.title}
            </h3>
            <ul className="flex flex-col gap-4">
              {section.links.map((link) => (
                <li
                  key={link.title}
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all duration-300"
                >
                  <a href={link.href}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <hr className="border-[var(--border)] w-full mt-16 mb-8" />
      <p className="text-sm text-[var(--muted-foreground)]">
        &copy; {new Date().getFullYear()} Reencuentro. Todos los derechos
        reservados.
      </p>
    </footer>
  );
}
