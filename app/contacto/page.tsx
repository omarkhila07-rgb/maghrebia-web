export const metadata = {
  title: "Contacto — Puente",
  description: "Pide una propuesta o asesoría. Te contactamos por WhatsApp.",
};

import ContactForm from "./ContactForm";

export default function Contacto({
  searchParams,
}: {
  searchParams: { [k: string]: string | string[] | undefined };
}) {
  const plan = (Array.isArray(searchParams?.plan) ? searchParams.plan[0] : searchParams?.plan) || undefined;

  return (
    <main className="max-w-3xl px-4 py-10 mx-auto">
      <h1 className="text-3xl font-semibold">Contacto</h1>
      <p className="mt-2 text-slate-700">
        Dinos qué necesitas y te escribimos al WhatsApp. {plan ? <>Plan sugerido: <b>{plan}</b>.</> : null}
      </p>
      <div className="card p-5 mt-6">
        <ContactForm plan={plan} />
      </div>
    </main>
  );
}
