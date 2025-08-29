import AffiliateLink from "@/app/components/AffiliateLink";
import Script from "next/script";
import { articleJsonLd } from "@/app/lib/seo";

export const metadata = {
  title: "Hoteles en Tetuán — Puente",
  description: "Barrios, consejos y enlaces fiables para reservar hoteles en Tetuán.",
};

export default function HotelesTetuan() {
  const booking = "https://www.booking.com/index.html";
  const agoda = "https://www.agoda.com/";
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <Script id="ld-article-tetuan" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd({
            title: "Hoteles en Tetuán",
            description: "Guía de zonas y enlaces con afiliado.",
            url: "https://example.com/viajes/hoteles-tetuan"
          }))
        }}
      />
      <h1 className="text-3xl font-semibold">Hoteles en Tetuán</h1>
      <p className="text-slate-700">Zonas: Medina, Ensanche, Centro. Si quieres tranquilidad: Ensanche; para turismo: Medina.</p>

      <div className="card p-5 space-y-3">
        <h2 className="font-medium">Reservar ahora</h2>
        <div className="flex gap-2">
          <AffiliateLink partner="booking" to={booking} className="btn btn-brand">Booking</AffiliateLink>
          <AffiliateLink partner="agoda" to={agoda} className="btn btn-ghost">Agoda</AffiliateLink>
        </div>
        <p className="text-xs text-slate-500">* Enlaces de afiliado; a ti no te cuesta más.</p>
      </div>
    </main>
  );
}
