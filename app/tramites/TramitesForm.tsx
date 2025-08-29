"use client";

import { useState } from "react";

export default function TramitesForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOk(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const token = String(fd.get("cf-turnstile-response") || "");

    const payload = {
      name: String(fd.get("nombre") || ""),
      whatsapp: String(fd.get("whatsapp") || ""),
      email: String(fd.get("email") || ""),
      side: "residentes",
      plan: "tramites",
      type: String(fd.get("tipo") || ""),
      message: String(fd.get("mensaje") || ""),
      token, // <- importante
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setOk(res.ok);
      if (res.ok) {
        (e.target as HTMLFormElement).reset();
        onSuccess?.();
      }
    } catch {
      setOk(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-5 mt-6">
      <h2 className="text-xl font-semibold">Envíanos tus datos</h2>
      <p className="text-sm text-slate-600 mt-1">
        Te escribiremos por WhatsApp para continuar. Después puedes adjuntar las fotos del documento.
      </p>

      {ok === true && (
        <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-800">
          ¡Recibido! Te contactamos por WhatsApp en breve.
        </div>
      )}
      {ok === false && (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-red-800">
          Hubo un problema. Inténtalo de nuevo.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 mt-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <input name="nombre" required placeholder="Nombre" className="border rounded-xl p-3 w-full" />
          <input name="whatsapp" required placeholder="WhatsApp (con prefijo)" className="border rounded-xl p-3 w-full" />
        </div>

        <input name="email" placeholder="Email (opcional)" className="border rounded-xl p-3 w-full" />

        <select name="tipo" className="border rounded-xl p-3 w-full">
          <option value="Carta del colegio">Carta del colegio</option>
          <option value="Banco / recibo">Banco / recibo</option>
          <option value="Cita extranjería">Cita extranjería</option>
          <option value="Contrato / trabajo">Contrato / trabajo</option>
          <option value="Otro">Otro</option>
        </select>

        <textarea name="mensaje" placeholder="Cuéntanos qué necesitas…" className="border rounded-xl p-3 w-full h-28" />

        {/* Turnstile */}
        <div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" />

        <button disabled={loading} className="btn btn-brand">
          {loading ? "Enviando…" : "Enviar y adjuntar luego por WhatsApp"}
        </button>

        <p className="text-xs text-slate-500">
          Guardamos tus datos de contacto para atender tu solicitud. Puedes enviarnos las fotos del documento por WhatsApp.
        </p>
      </form>
    </div>
  );
}

