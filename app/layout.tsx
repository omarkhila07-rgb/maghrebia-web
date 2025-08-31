import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import { organizationJsonLd } from "@/lib/seo";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Puente · Traductor Darija ↔ Español y Digitalización",
  description:
    "Traducción Darija del norte ↔ Español y servicios de digitalización para negocios.",
  metadataBase: new URL(SITE),
  openGraph: {
    type: "website",
    url: SITE,
    title: "Puente · Traductor Darija ↔ Español y Digitalización",
    description:
      "Traducción Darija del norte ↔ Español y servicios de digitalización para negocios.",
    siteName: "Puente",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Puente — Darija ↔ Español",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Puente · Traductor Darija ↔ Español y Digitalización",
    description:
      "Traducción Darija del norte ↔ Español y servicios de digitalización para negocios.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgLd = organizationJsonLd({
    name: "Puente",
    url: SITE,
    logo: `${SITE}/og.png`,
    sameAs: [], // añade redes si quieres
  });

  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-slate-900">
        {/* Turnstile global */}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
        {/* Plausible Analytics (si configuraste dominio) */}
        {(process.env.NEXT_PUBLIC_PLAUSIBLE ?? process.env.PLAUSIBLE_DOMAIN) ? (
          <Script
            defer
            data-domain={
              process.env.NEXT_PUBLIC_PLAUSIBLE || process.env.PLAUSIBLE_DOMAIN
            }
            src="https://plausible.io/js/script.js"
          />
        ) : null}

        {/* Organization JSON-LD */}
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />

        <header className="border-b bg-white/70 backdrop-blur-md sticky top-0 z-40">
          <div className="container-outer flex h-14 items-center justify-between">
            <Link href="/" className="font-semibold">
              🌉 Puente
            </Link>

            {/* NAV con dropdown Viajes */}
            <nav className="flex items-center gap-5 text-sm">
              <Link className="nav-link" href="/traductor">
                Traductor
              </Link>
              <Link className="nav-link" href="/servicios">
                Servicios
              </Link>

              {/* Dropdown Viajes */}
              <div className="relative group">
                <Link
                  href="/viajes"
                  className="nav-link inline-flex items-center gap-1"
                >
                  Viajes <span aria-hidden>▾</span>
                </Link>
                <div
                  className="absolute left-0 mt-2 hidden group-hover:block group-focus-within:block 
                             min-w-[240px] rounded-xl border border-slate-200 bg-white shadow-lg
                             z-50 pointer-events-auto"
                  role="menu"
                  aria-label="Submenú Viajes"
                >
                  <div className="p-2">
                    <Link
                      href="/viajes/hoteles-tanger"
                      className="block px-3 py-2 rounded-lg hover:bg-slate-50"
                      role="menuitem"
                    >
                      Hoteles en Tánger
                    </Link>
                    <Link
                      href="/viajes/vuelos-madrid-tanger"
                      className="block px-3 py-2 rounded-lg hover:bg-slate-50"
                      role="menuitem"
                    >
                      Vuelos Madrid → Tánger
                    </Link>
                    {/* 🔧 quitado el <Link suelto que rompía el JSX */}
                    <Link
                      href="/viajes"
                      className="block px-3 py-2 rounded-lg hover:bg-slate-50 font-medium"
                      role="menuitem"
                    >
                      Ver todas las opciones →
                    </Link>
                  </div>
                </div>
              </div>

              <Link className="nav-link" href="/afiliados">
                Afiliados
              </Link>
              <Link className="nav-link" href="/contacto">
                Contacto
              </Link>
            </nav>
          </div>
        </header>

        <main className="container-outer py-10">{children}</main>

        <footer className="mt-10 border-t py-8 text-sm text-slate-600">
          <div className="container-outer flex items-center justify-between">
            <p>Hecho con ♥ para el puente Marruecos ↔ España</p>
            <nav className="flex gap-4">
              <Link href="/legal/privacidad" className="hover:underline">
                Privacidad
              </Link>
              <Link href="/legal/terminos" className="hover:underline">
                Términos
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
