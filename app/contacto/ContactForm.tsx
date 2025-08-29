"use client";
import { useState } from "react";

export default function ContactForm({ plan }: { plan?: string }) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOk(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      whatsapp: String(fd.get("whatsapp") || ""),
      email: String(fd.get("email") || ""),
      side: String(fd.get("side") || "es"),
      plan: plan || String(fd.get("plan") || "general"),
      message: String(fd.get("message") || ""),
    };
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setOk(r.ok);
      if (r.ok) (e.target as HTMLFormElement).reset();
    } catch {
      setOk(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 mt-4">
      {ok === true && <div className="text-green-700">¡Gracias! Te escribimos por WhatsApp.</div>}
      {ok === false && <div className="text-red-700">Error al enviar. Intenta de nuevo.</div>}
      <div className="grid sm:grid-cols-2 gap-3">
        <input name="name" required placeholder="Nombre" className="border rounded-xl p-3" />
        <input name="whatsapp" required placeholder="WhatsApp (con prefijo)" className="border rounded-xl p-3" />
      </div>
      <input name="email" placeholder="Email (opcional)" className="border rounded-xl p-3 w-full" />
      <div className="grid sm:grid-cols-2 gap-3">
        <select name="side" className="border rounded-xl p-3">
          <option value="es">España</option>
          <option value="ma">Marruecos</option>
          <option value="residentes">Residentes en España</option>
        </select>
        <input name="plan" defaultValue={plan || ""} placeholder="Plan (opcional)" className="border rounded-xl p-3" />
      </div>
      <textarea name="message" placeholder="Cuéntanos lo que necesitas…" className="border rounded-xl p-3 w-full h-28" />
      <button disabled={loading} className="btn btn-brand">
        {loading ? "Enviando…" : "Solicitar contacto"}
      </button>
    </form>
  );
}
