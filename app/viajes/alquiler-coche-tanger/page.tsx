import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alquiler de coche en Tánger — Consejos y requisitos | Puente",
  description: "Qué necesitas para alquilar coche en Tánger: carnet, fianza, seguros y consejos de conducción.",
  alternates: { canonical: "/viajes/alquiler-coche-tanger" },
};

export default function CochePage(){
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Alquiler de coche en Tánger</h1>
      <p className="text-slate-700">Requisitos habituales y recomendaciones.</p>
      <ul className="list-disc pl-5 space-y-2 text-slate-700">
        <li>Carnet válido y tarjeta para fianza.</li>
        <li>Revisa franquicia del seguro y parte amistoso.</li>
        <li>Evita zonas estrechas de Medina para aparcar.</li>
      </ul>
      <p className="text-sm text-slate-500">* Añadiremos comparadores y enlaces de afiliado cuando estén listos.</p>
    </main>
  );
}
