import Link from "next/link";

export const metadata = {
  title: "Viajes Marruecos ↔ España — Puente",
  description:
    "Hoteles en Tánger/Tetuán, vuelos y ferries. Enlaces fiables con afiliados (Booking, Agoda, Skyscanner, Trip).",
};

export default function Viajes() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <section className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Viaja entre <span className="text-brand-600">España</span> y{" "}
            <span className="text-brand-600">Marruecos</span> sin líos
          </h1>
          <p className="text-slate-600">
            Hoteles y vuelos en el norte, más ferries. Guías rápidas y enlaces fiables.
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            <Link href="/viajes/hoteles-tanger" className="btn btn-ghost">Hoteles Tánger</Link>
            <Link href="/viajes/hoteles-tetuan" className="btn btn-ghost">Hoteles Tetuán</Link>
            <Link href="/viajes/vuelos-madrid-tanger" className="btn btn-ghost">Vuelos MAD → TNG</Link>
            <Link href="/viajes/vuelos-barcelona-tanger" className="btn btn-ghost">Vuelos BCN → TNG</Link>
            <Link href="/viajes/ferries-espana-marruecos" className="btn btn-ghost">Ferries España ↔ Marruecos</Link>
            <Link href="/viajes/ferries-tarifa-tanger" className="btn btn-ghost">Ferries Tarifa ↔ Tánger</Link>
          </div>
        </div>

        <aside className="card p-5">
          <h2 className="font-medium mb-2">Atajos rápidos</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>
              <Link className="text-emerald-700 underline" href="/api/click?partner=booking&to=https%3A%2F%2Fwww.booking.com%2Findex.html&ref=viajes-hero">
                Booking: hoteles en Tánger/Tetuán
              </Link>
            </li>
            <li>
              <Link className="text-emerald-700 underline" href="/api/click?partner=agoda&to=https%3A%2F%2Fwww.agoda.com%2F&ref=viajes-hero">
                Agoda: hoteles en el norte
              </Link>
            </li>
            <li>
              <Link className="text-emerald-700 underline" href="/viajes/vuelos-madrid-tanger">
                Skyscanner: vuelos MAD → TNG
              </Link>
            </li>
            <li>
              <Link className="text-emerald-700 underline" href="/viajes/vuelos-barcelona-tanger">
                Trip/Skyscanner: vuelos BCN → TNG
              </Link>
            </li>
          </ul>
          <p className="text-xs text-slate-500 mt-2">
            * Usamos enlaces de afiliado; a ti no te cuesta más.
          </p>
        </aside>
      </section>

      <section className="grid md:grid-cols-3 gap-5">
        <div className="card p-5">
          <h3 className="font-medium mb-1">Hoteles en Tánger</h3>
          <p className="text-sm text-slate-600">
            Zonas: Medina, Corniche, Marshan. Para playa/restaurantes, Corniche.
          </p>
          <div className="mt-3 flex gap-2">
            <Link href="/viajes/hoteles-tanger" className="btn btn-ghost">Guía</Link>
            <Link href="/api/click?partner=booking&to=https%3A%2F%2Fwww.booking.com%2Findex.html&ref=viajes-card" className="btn btn-brand">
              Ver en Booking
            </Link>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-medium mb-1">Hoteles en Tetuán</h3>
          <p className="text-sm text-slate-600">
            Ideal Ensanche si quieres tranquilidad, Medina si buscas turismo.
          </p>
          <div className="mt-3 flex gap-2">
            <Link href="/viajes/hoteles-tetuan" className="btn btn-ghost">Guía</Link>
            <Link href="/api/click?partner=agoda&to=https%3A%2F%2Fwww.agoda.com%2F&ref=viajes-card" className="btn btn-brand">
              Ver en Agoda
            </Link>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-medium mb-1">Vuelos MAD/BCN → TNG</h3>
          <p className="text-sm text-slate-600">
            Alta demanda en verano/puentes; prueba fechas flexibles.
          </p>
          <div className="mt-3 flex gap-2">
            <Link href="/viajes/vuelos-madrid-tanger" className="btn btn-ghost">MAD → TNG</Link>
            <Link href="/viajes/vuelos-barcelona-tanger" className="btn btn-brand">BCN → TNG</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
