import Antesala from "@/components/Antesala";
import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Tu puente entre <span className="text-brand-600">Marruecos</span> y <span className="text-brand-600">España</span>
          </h1>
          <p className="text-slate-600">
            Traductor Darija (norte) ↔ Español, y servicios de digitalización
            para negocios: web, catálogo, reservas y más.
          </p>
          <div className="flex gap-3">
            <Link href="/traductor" className="btn btn-brand">Abrir traductor</Link>
            <Link href="/servicios" className="btn btn-ghost">Ver servicios</Link>
          </div>
        </div>
        <div className="card p-5">
          <h2 className="font-medium mb-2">Traductor rápido</h2>
          <iframe
            src="/traductor/mini"
            className="w-full h-[300px] rounded-xl border"
            title="traductor-embed"
          />
          <p className="text-xs text-slate-500 mt-2">Versión embebida. Abre el traductor completo para mejor experiencia.</p>
        </div>
      </div>

      {/* 👇 Antesala de segmentación */}
      <Antesala />

      <div className="grid md:grid-cols-3 gap-4">
        {[
          ["Web rápida y con SEO", "Sitios modernos, indexables y listos para Google."],
          ["Catálogo y pagos", "Vende online sin complicarte. Integraciones sencillas."],
          ["Soporte continuo", "Acompañamiento técnico y mejoras por fases."]
        ].map(([t,d]) => (
          <div key={t} className="card p-5">
            <h3 className="font-medium">{t}</h3>
            <p className="text-sm text-slate-600 mt-1">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

