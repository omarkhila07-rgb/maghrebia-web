import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { Resend } from "resend";
import { appendLeadRow } from "@/app/lib/sheets";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Ajusta estos dos
const ADMIN_EMAIL = "tuemail@example.com";
const FROM_EMAIL = "Puente <notificaciones@tu-dominio.com>"; // o noreply@resend.dev

type Body = {
  name?: string;
  whatsapp?: string;
  email?: string;
  side?: "es" | "ma" | "residentes";
  plan?: string;
  type?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    // 1) Parse / validate
    const data = (await req.json().catch(() => ({}))) as Body;
    const name = (data.name || "").trim();
    const whatsapp = (data.whatsapp || "").trim();
    const email = (data.email || "").trim();
    const side = (data.side || "").trim();
    const plan = (data.plan || "").trim();
    const type = (data.type || "").trim();
    const message = (data.message || "").trim();

    if (!name || !whatsapp) {
      return NextResponse.json({ error: "Faltan campos obligatorios (name, whatsapp)" }, { status: 400 });
    }

    // 2) Extra: ref cookie + UA
    const ref = cookies().get("ref")?.value || "";
    const ua = headers().get("user-agent") || "";

    // 3) Guardar en Google Sheets (no rompe si falla)
    try {
      const ts = new Date().toISOString();
      await appendLeadRow([ts, name, whatsapp, email, side, plan, type, message, ref, ua]);
    } catch (e: any) {
      console.error("[contact] Sheets error:", e?.message || e);
    }

    // 4) Emails (Resend)
    if (resend) {
      const subject = `Nuevo lead — ${side || "general"} ${plan ? `(${plan})` : ""}`;
      const htmlAdmin = `
        <h2>Nuevo contacto</h2>
        <ul>
          <li><b>Nombre:</b> ${escapeHtml(name)}</li>
          <li><b>WhatsApp:</b> ${escapeHtml(whatsapp)}</li>
          ${email ? `<li><b>Email:</b> ${escapeHtml(email)}</li>` : ""}
          ${side ? `<li><b>Segmento:</b> ${escapeHtml(side)}</li>` : ""}
          ${plan ? `<li><b>Plan:</b> ${escapeHtml(plan)}</li>` : ""}
          ${type ? `<li><b>Tipo:</b> ${escapeHtml(type)}</li>` : ""}
          ${ref ? `<li><b>Ref:</b> ${escapeHtml(ref)}</li>` : ""}
          <li><b>User-Agent:</b> ${escapeHtml(ua)}</li>
        </ul>
        ${message ? `<p><b>Mensaje:</b><br/>${escapeHtml(message)}</p>` : ""}
      `;
      await resend.emails.send({ from: FROM_EMAIL, to: ADMIN_EMAIL, subject, html: htmlAdmin });

      if (email) {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: "¡Gracias por contactar con Puente!",
          html: `
            <p>Salam ${escapeHtml(name)},</p>
            <p>Hemos recibido tu solicitud. Te escribimos por WhatsApp al ${escapeHtml(whatsapp)} en breve.</p>
            <p>— Equipo Puente</p>
          `,
        });
      }
    } else {
      console.warn("[contact] RESEND_API_KEY no configurado. Saltando emails.");
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("[contact] Error:", e?.message || e);
    return NextResponse.json({ error: "Error al procesar el contacto" }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return (s || "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
