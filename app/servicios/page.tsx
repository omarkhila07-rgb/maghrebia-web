import Link from "next/link";
import type { Route } from "next";

export const metadata = {
  title: "Servicios — Puente",
  description:
    "Servicios para España y para Marruecos: web, SEO, catálogo, traducción Darija ⇄ Español.",
};

/** Convierte un string href a:
 *  - string (para externos o anclas)
 *  - UrlObject tipado (para rutas internas con o sin query)
 */
function toHref(input: string):
  | string
  | { pathname: Route; query?: Record<string, string> } {
  // anclas o externos -> usar <a>
  if (input.startsWith("#") || /^https?:\/\//i.test(input)) return input;

  const [pathname, qs] = input.split("?");
  if (qs) {
    const params = Object.fromEntries(new URLSearchParams(qs) as any);
    return { pathname: pathname as Route, query: params };
  }
  return { pathname: input as Route };
}

function Pack({
  title,
  price,
  features,
  cta,
  href,
}: {
  title: string;
  price: string;
  features: string[];
  cta: string;
  href: string;
}) {
  const parsed = toHref(href);

  return (
    <div className="card p-5 flex flex-col">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-1 text-2xl font-bold text-emerald-600">{price}</div>
      <ul className="mt-3 text-sm text-slate-700 space-y-1 list-disc pl-5">
        {features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      {typeof parsed === "string" ? (
        // Externo o #ancla
        <a href={parsed} className="btn btn-brand mt-4" target={parsed.startsWith("#") ? undefined : "_blank"} rel={parsed.startsWith("#") ? undefined : "noopener noreferrer"}>
          {cta}
        </a>
      ) : (
        // Interno tipado (con o sin query)
        <Link href={parsed} className="btn btn-brand mt-4">
          {cta}
        </Link>
      )}
    </div>
  );
}

export default function Servicios() {
  return (
    <main className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Servicios</h1>
        <p className="text-slate-600">
          Elige tu lado: paquetes claros, bilingües y listos para vender.
        </p>
        <div className="flex gap-3 text-sm">
          <a href="#espana" className="btn btn-ghost border">
            Para España
          </a>
          <a href="#marruecos" className="btn btn-ghost border">
            Para Marruecos
          </a>
        </div>
      </header>

      {/* ——— España ——— */}
      <section id="espana" className="scroll-mt-24">
        <h2 className="text-2xl font-semibold">🇪🇸 Para España</h2>
        <p className="text-slate-600 mt-1">
          Empresas en España que quieren vender en Marruecos o comunicarse con clientes marroquíes.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <Pack
            title="Starter"
            price="149–299€"
            cta="Pedir propuesta"
            href="/contacto?plan=es-starter"
            features={[
              "Landing 1 página (ES) + bloques Darija",
              "SEO on-page básico",
              "WhatsApp lead + Google Business",
            ]}
          />
          <Pack
            title="Negocio Local"
            price="499–899€"
            cta="Hablar ahora"
            href="/contacto?plan=es-local"
            features={[
              "Web 3–5 secciones ES/Darija",
              "Catálogo simple + WhatsApp pedidos",
              "Textos adaptados a público marroquí",
            ]}
          />
          <Pack
            title="E-Commerce Ligero"
            price="899–1.999€"
            cta="Quiero vender online"
            href="/contacto?plan=es-ecom"
            features={[
              "Checkout Stripe / transferencia",
              "Envíos básicos, emails de pedido",
              "Traductor integrado ES ⇄ Darija",
            ]}
          />
        </div>
      </section>

      {/* ——— Marruecos ——— */}
      <section id="marruecos" className="scroll-mt-24">
        <h2 className="text-2xl font-semibold">🇲🇦 Para Marruecos</h2>
        <p className="text-slate-600 mt-1">
          Negocios en Marruecos que quieren ser entendidos y visibles en España.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <Pack
            title="Web Bilingüe"
            price="199–499€"
            cta="Pedir propuesta"
            href="/contacto?plan=ma-web"
            features={[
              "Web ES/Darija moderna y rápida",
              "Textos traducidos con glosario fijo",
              "WhatsApp Business y mapa Google",
            ]}
          />
          <Pack
            title="Catálogo + Reservas"
            price="499–999€"
            cta="Reservas fáciles"
            href="/contacto?plan=ma-cat-res"
            features={[
              "Catálogo simple + citas/turnos",
              "Mensajería WhatsApp / email",
              "Ficha Google y reseñas",
            ]}
          />
          <Pack
            title="Soporte Continuo"
            price="39–99€/mes"
            cta="Solicitar soporte"
            href="/contacto?plan=ma-soporte"
            features={[
              "Actualizaciones, copias y seguridad",
              "1–2 cambios al mes",
              "Informes simples de visitas",
            ]}
          />
        </div>
      </section>
    </main>
  );
}
