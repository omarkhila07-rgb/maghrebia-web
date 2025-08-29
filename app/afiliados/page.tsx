import Link from "next/link";
import { buildAffiliateUrl, getRefFromCookie } from "@/app/lib/affiliates";
import Script from "next/script";
import { articleJsonLd } from "@/app/lib/seo";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  title: "Programa de Afiliados — Puente",
  description:
    "Gana comisiones recomendando vuelos, hoteles y servicios con enlaces de afiliado.",
  openGraph: {
    url: `${SITE}/afiliados`,
    title: "Programa de Afiliados — Puente",
    description:
      "Gana comisiones recomendando vuelos, hoteles y servicios con enlaces de afiliado.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Puente — Afiliados" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Programa de Afiliados — Puente",
    description:
      "Gana comisiones recomendando vuelos, hoteles y servicios con enlaces de afiliado.",
    images: ["/og.png"],
  },
};

export default function AfiliadosPage() {
  const ref = getRefFromCookie();

  const common = {
    origin: "MAD",
    destination: "TNG",
    city: "Tánger",
    checkin: "2025-09-15",
    checkout: "2025-09-20",
    adults: 2,
    children: 0,
    subId: ref || "homepage",
  };

  const bookingUrl = buildAffiliateUrl({
    partner: "booking",
    q: `${common.city} hoteles`,
    checkin: common.checkin,
    checkout: common.checkout,
    destination: common.city,
    subId: common.subId,
  });

  const agodaUrl = buildAffiliateUrl({
    partner: "agoda",
    q: `${common.city} hotels`,
    checkin: common.checkin,
    checkout: common.checkout,
    destination: common.city,
    subId: common.subId,
  });

  const skyUrl = buildAffiliateUrl({
    partner: "skyscanner",
    origin: common.origin,
    destination: common.destination,
    checkin: common.checkin,
    checkout: common.checkout,
    adults: common.adults,
    children: common.children,
    class: "economy",
    subId: common.subId,
  });

  const tripUrl = buildAffiliateUrl({
    partner: "trip",
    origin: common.origin,
    destination: common.destination,
    checkin: common.checkin,
    checkout: common.checkout,
    adults: common.adults,
    children: common.children,
    class: "economy",
    subId: common.subId,
  });

  const wrap = (finalUrl: string, partner: string) =>
    `/api/click?partner=${encodeURIComponent(partner)}&to=${encodeURIComponent(finalUrl)}&ref=${encodeURIComponent(common.subId)}`;

  const articleLd = articleJsonLd({
    title: "Programa de Afiliados — Puente",
    description: "Gana comisiones recomendando vuelos, hoteles y servicios con enlaces de afiliado.",
    url: `${SITE}/afiliados`,
  });

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      {/* Article JSON-LD */}
      <Script id="afiliados-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <h1 className="text-3xl font-semibold">🤝 Programa de Afiliados</h1>
      <p className="text-slate-700">
        Comparte estos enlaces (o añade <code>?ref=tu-id</code>) y gana comisiones por reservas confirmadas.
      </p>

      <section className="grid sm:grid-cols-2 gap-4">
        <div className="card p-5">
          <h2 className="font-medium mb-1">Hoteles en {common.city}</h2>
          <ul className="text-sm space-y-2">
            <li><Link className="text-emerald-600 underline" href={wrap(bookingUrl, "booking")} target="_blank">Booking (afiliado)</Link></li>
            <li><Link className="text-emerald-600 underline" href={wrap(agodaUrl, "agoda")} target="_blank">Agoda (afiliado)</Link></li>
          </ul>
        </div>
        <div className="card p-5">
          <h2 className="font-medium mb-1">Vuelos {common.origin} → {common.destination}</h2>
          <ul className="text-sm space-y-2">
            <li><Link className="text-emerald-600 underline" href={wrap(skyUrl, "skyscanner")} target="_blank">Skyscanner (afiliado)</Link></li>
            <li><Link className="text-emerald-600 underline" href={wrap(tripUrl, "trip")} target="_blank">Trip.com (afiliado)</Link></li>
          </ul>
        </div>
      </section>

      <p className="text-xs text-slate-500">* Aplica la política de cada programa.</p>
    </main>
  );
}

