import Link from "next/link";

export const metadata = {
  title: "Puente — Para España",
  description:
    "Digitaliza tu negocio para vender en Marruecos. Web rápida, SEO y traductor ES ⇄ Darija.",
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
        Hablar ahora →
      </a>
    </div>
  );
}

export default function PageES() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold">
        Para empresas en <span className="text-emerald-600">España</span>
      </h1>
      <p className="mt-2 max-w-2xl text-slate-700">
        Te ayudamos a comunicarte con clientes marroquíes y a validar mercado en Marruecos.
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
          title="Web & SEO"
          desc="Sitios modernos, indexables y listos para Google. Contenidos pensados para público marroquí."
        />
        <Card
          title="Catálogo y pagos"
          desc="Catálogo bilingüe y checkout sencillo. Integraciones Stripe / transferencia / Bizum."
        />
        <Card
          title="Consultoría Marruecos"
          desc="Dominio cultural y lingüístico. Te guiamos con WhatsApp Business, reseñas y canales locales."
        />
      </section>
    </main>
  );
}
