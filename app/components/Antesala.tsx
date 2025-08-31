"use client";

import { useRouter } from "next/navigation";
import type { Route } from "next"; // <- para typed routes
import { useCallback } from "react";

// Define las rutas internas como constantes tipadas.
// Si alguna página no existe, TypeScript se quejará aquí (útil).
const routes = {
  es: "/es",
  ma: "/ma",
  tramites: "/tramites",
} as const satisfies Record<string, Route>;

export default function Antesala({ compact = false }: { compact?: boolean }) {
  const router = useRouter();

  const go = useCallback((path: Route) => {
    try {
      // Analytics opcional
      // @ts-ignore
      window?.gtag?.("event", "select_side", { path });
    } catch {}
    router.push(path);
  }, [router]);

  return (
    <section className={`w-full ${compact ? "py-4" : "py-10"}`} aria-labelledby="elige-lado">
      <div className="mx-auto max-w-5xl px-4">
        {!compact && (
          <>
            <h2 id="elige-lado" className="text-2xl font-semibold tracking-tight">
              ¿Desde dónde nos visitas?
            </h2>
            <p className="mt-2 text-slate-600">
              Elige tu lado para adaptar los servicios y el idioma.
            </p>
          </>
        )}

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {/* España */}
          <button
            onClick={() => go(routes.es)}
            className="group relative rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇪🇸</span>
              <div>
                <h3 className="text-lg font-semibold">
                  Soy de <span className="text-emerald-600">España</span>
                </h3>
                <p className="text-sm text-slate-600">
                  Quiero vender en Marruecos o comunicarme en Darija.
                </p>
              </div>
            </div>
            <ul className="mt-4 space-y-1 text-sm text-slate-700">
              <li>• Web y SEO para mercado marroquí</li>
              <li>• Traducción ES ⇄ Darija en tiempo real</li>
              <li>• Catálogo y pagos para Marruecos</li>
            </ul>
          </button>

          {/* Marruecos */}
          <button
            onClick={() => go(routes.ma)}
            className="group relative rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇲🇦</span>
              <div>
                <h3 className="text-lg font-semibold">
                  Soy de <span className="text-emerald-600">Marruecos</span>
                </h3>
                <p className="text-sm text-slate-600">
                  Quiero que mi negocio sea visible y entendible en España.
                </p>
              </div>
            </div>
            <ul className="mt-4 space-y-1 text-sm text-slate-700">
              <li>• Web bilingüe ES / Darija</li>
              <li>• Adaptación cultural y traducción</li>
              <li>• Google Maps & WhatsApp Business</li>
            </ul>
          </button>

          {/* Marroquí en España (Trámites) */}
          <button
            onClick={() => go(routes.tramites)}
            className="group relative rounded-2xl border border-brand-500 bg-white p-6 text-left shadow-sm transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">👨‍👩‍👧</span>
              <div>
                <h3 className="text-lg font-semibold">
                  Soy marroquí en <span className="text-emerald-600">España</span>
                </h3>
                <p className="text-sm text-slate-600">
                  Necesito ayuda con trámites y documentos.
                </p>
              </div>
            </div>
            <ul className="mt-4 space-y-1 text-sm text-slate-700">
              <li>• Traducción de documentos oficiales</li>
              <li>• Guías para trámites y colegios</li>
              <li>• Asesoría exprés en ES / Darija</li>
            </ul>
            <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              Nuevo
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
