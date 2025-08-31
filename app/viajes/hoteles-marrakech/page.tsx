import type { Metadata } from "next";
import { buildAffiliateUrl, getRefFromCookie } from "@/app/lib/affiliates";

const city = "Marrakech";

export const metadata: Metadata = {
  title: `Hoteles en ${city} — Mejores zonas y ofertas | Puente`,
  description: `Dónde alojarse en ${city}: Medina, Gueliz, Hivernage y más. Compara hoteles.`,
  alternates: { canonical: "/viajes/hoteles-marrakech" },
};

// Genera la URL de tracking hacia /api/click
function wrap(u: string, p: string, r: string) {
  return `/api/click?partner=${encodeURIComponent(p)}&to=${encodeURIComponent(
    u
  )}&ref=${encodeURIComponent(r)}`;
}

export default function Page() {
  const ref = getRefFromCookie() || "hoteles-marrakech";
  const checkin = "2025-10-10",
    checkout = "2025-10-13";

  const booking = buildAffiliateUrl({
    partner: "booking",
    q: `${city} hoteles`,
    checkin,
    checkout,
    destination: city,
    subId: ref,
  });

  const agoda = buildAffiliateUrl({
    partner: "agoda",
    q: `${city} hotels`,
    checkin,
    checkout,
    destination: city,
    subId: ref,
  });

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Medina o zona moderna?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Medina para riads y ambiente tradicional; Gueliz/Hivernage para hoteles modernos y vida nocturna.",
        },
      },
    ],
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <h1 className="text-3xl font-semibold">Hoteles en {city}</h1>
      <p className="text-slate-700">
        Medina, Gueliz, Hivernage… elige según tu plan.
      </p>

      <div className="flex gap-3">
        <a
          href={wrap(booking, "booking", ref)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-brand"
        >
          Booking
        </a>
        <a
          href={wrap(agoda, "agoda", ref)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          Agoda
        </a>
      </div>
    </main>
  );
}

