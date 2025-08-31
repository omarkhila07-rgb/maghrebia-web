import type { Metadata } from "next";
import Link from "next/link";
import { buildAffiliateUrl, getRefFromCookie } from "@/lib/affiliates";
const city = "Fez";
export const metadata: Metadata = {
  title: `Hoteles en ${city} — Mejores zonas y ofertas | Puente`,
  description: `Dónde alojarse en ${city}: zonas recomendadas y ofertas de hoteles. Compara y reserva.`,
  alternates: { canonical: "/viajes/hoteles-fez" },
};
function wrap(finalUrl:string, partner:string, ref:string){
  return `/api/click?partner=${encodeURIComponent(partner)}&to=${encodeURIComponent(finalUrl)}&ref=${encodeURIComponent(ref)}`;
}
export default function Page(){
  const ref = getRefFromCookie() || "hoteles-fez";
  const checkin="2025-10-10", checkout="2025-10-13";
  const booking = buildAffiliateUrl({ partner:"booking", q:`${city} hoteles`, checkin, checkout, destination:city, subId:ref });
  const agoda   = buildAffiliateUrl({ partner:"agoda",   q:`${city} hotels`, checkin, checkout, destination:city, subId:ref });
  const faq = {
    "@context":"https://schema.org","@type":"FAQPage",
    "mainEntity":[
      {"@type":"Question","name":`¿Mejor zona para dormir en ${city}?`,"acceptedAnswer":{"@type":"Answer","text":"Medina y alrededores para ambiente tradicional; Ville Nouvelle para más tranquilidad y acceso."}},
      {"@type":"Question","name":"¿Hay cancelación flexible?","acceptedAnswer":{"@type":"Answer","text":"Depende del hotel. Revisa las condiciones en el proceso de reserva."}}
    ]
  };
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faq)}}/>
      <h1 className="text-3xl font-semibold">Hoteles en {city}</h1>
      <p className="text-slate-700">Zonas recomendadas y enlaces para comparar precios.</p>
      <div className="flex gap-3">
        <Link href={wrap(booking,"booking",ref)} target="_blank" className="btn btn-brand">Buscar en Booking</Link>
        <Link href={wrap(agoda,"agoda",ref)} target="_blank" className="btn btn-ghost">Buscar en Agoda</Link>
      </div>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Zonas</h2>
        <ul className="list-disc pl-5 text-slate-700 space-y-1">
          <li><b>Medina:</b> riads con encanto; atención a escaleras/calles estrechas.</li>
          <li><b>Ville Nouvelle:</b> hoteles modernos y más tranquilidad.</li>
        </ul>
      </section>
    </main>
  );
}
