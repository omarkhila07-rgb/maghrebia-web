import Link from "next/link";

export const metadata = {
  title: "Puente — Para Marruecos",
  description:
    "Haz tu negocio visible en España. Web bilingüe, traducción Darija ⇄ Español y soporte continuo.",
};

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-700">{desc}</p>
      <a
        href="/contacto"
        className="mt-4 inline-block text-sm font-medium text-emerald-700 hover:underline"
      >
        Pide presupuesto →
      </a>
    </div>
  );
}

export default function PageMA() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold">
        Para negocios en <span className="text-emerald-600">Marruecos</span>
      </h1>
      <p className="mt-2 max-w-2xl text-slate-700">
        Web clara y bilingüe para que españoles te entiendan y contacten fácil.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-3 text-sm font-medium text-slate-700">Traductor rápido</div>
        <Link
          href="/traductor"
          className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          Abrir traductor completo
        </Link>
      </div>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <Card
          title="Web bilingüe"
          desc="Una página en Darija/Español para que españoles te entiendan y contacten fácil."
        />
        <Card
          title="Adaptación cultural"
          desc="Traducciones reales (no literales) y glosario fijo para evitar malentendidos."
        />
        <Card
          title="Google & WhatsApp"
          desc="Instalamos Google Maps, perfil de negocio y WhatsApp Business para captar clientes."
        />
      </section>
    </main>
  );
}
