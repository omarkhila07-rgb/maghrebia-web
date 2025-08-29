import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Seguro de viaje para Marruecos — Coberturas clave | Puente",
  description: "Sanidad, pérdida de equipaje y cancelaciones: qué mirar en el seguro para viajar a Marruecos.",
  alternates: { canonical: "/viajes/seguros-viaje-marruecos" },
};

export default function SegurosPage(){
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Seguro de viaje para Marruecos</h1>
      <p className="text-slate-700">Qué coberturas revisar y consejos prácticos.</p>
      <ul className="list-disc pl-5 space-y-2 text-slate-700">
        <li>Gastos médicos y repatriación.</li>
        <li>Cancelación y retrasos.</li>
        <li>Robo o pérdida de equipaje.</li>
      </ul>
      <p className="text-sm text-slate-500">* Integraremos comparadores de seguros cuando tengamos los IDs de afiliado.</p>
    </main>
  );
}
