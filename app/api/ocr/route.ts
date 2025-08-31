// app/api/ocr/route.ts
import { NextResponse } from "next/server";
import Tesseract from "tesseract.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
// Solo imágenes: si quieres volver a admitir PDF, habrá que añadir una lib para parsearlo.
const ALLOWED = ["image/jpeg", "image/png"];
const CF_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Mapea un valor de lang opcional del cliente a el pack de tesseract
function mapLang(input?: string): string {
  const v = (input || "").toLowerCase().trim();
  if (v === "es") return "spa";
  if (v === "es+en") return "spa+eng";
  if (v === "es+en+ar" || v === "multi") return "spa+eng+ara";
  return "spa+eng"; // por defecto
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // --- Turnstile: aceptamos token como `token` o `cf-turnstile-response`
    const token =
      (form.get("token") as string | null) ??
      (form.get("cf-turnstile-response") as string | null) ??
      "";

    if (!token) {
      return NextResponse.json({ error: "Captcha requerido" }, { status: 400 });
    }

    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
      console.warn("[ocr] Falta TURNSTILE_SECRET_KEY en .env.local");
      return NextResponse.json({ error: "Config del captcha incompleta" }, { status: 500 });
    }

    // Puedes enviar la IP del usuario si la tienes en cabecera (CF-Connecting-IP)
    const ip =
      (req.headers.get("cf-connecting-ip") ||
        req.headers.get("x-forwarded-for") ||
        "").split(",")[0].trim();

    const verifyRes = await fetch(CF_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
    });

    const outcome = await verifyRes.json();
    if (!outcome?.success) {
      return NextResponse.json({ error: "Captcha inválido" }, { status: 400 });
    }
    // --- Fin verificación Turnstile ---

    // Archivo + opciones
    const f = form.get("file") as File | null;
    const langOpt = mapLang(form.get("lang") as string | undefined);

    if (!f) {
      return NextResponse.json({ error: "Falta el archivo" }, { status: 400 });
    }
    if (!ALLOWED.includes(f.type)) {
      return NextResponse.json(
        { error: "Formato no soportado. Sube JPG o PNG." },
        { status: 415 }
      );
    }
    if (f.size > MAX_SIZE) {
      return NextResponse.json({ error: "Archivo demasiado grande (máx 10MB)" }, { status: 413 });
    }

    const ab = await f.arrayBuffer();
    const buf = Buffer.from(ab);

    // Solo imágenes → OCR con Tesseract
    const res = await Tesseract.recognize(buf, langOpt as any);
    let text = (res.data.text || "").replace(/\u0000/g, "").trim();

    return NextResponse.json({
      ok: true,
      filename: f.name,
      mime: f.type,
      pages: 1,
      chars: text.length,
      text,
    });
  } catch (e: any) {
    console.error("[ocr] error:", e?.message || e);
    return NextResponse.json({ error: "Fallo al leer el documento" }, { status: 500 });
  }
}
