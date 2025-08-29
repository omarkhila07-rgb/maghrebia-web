// app/api/click/route.ts
import { NextResponse } from "next/server";
import { appendLeadRow } from "@/app/lib/sheets";
import { buildAffiliateUrl, type Partner } from "@/app/lib/affiliates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CLICKS_TAB = process.env.GOOGLE_SHEET_CLICKS_TAB || "Clicks";

// Dominios permitidos por partner para evitar open-redirects
const ALLOWLIST: Record<Partner, string[]> = {
  booking: ["www.booking.com", "booking.com"],
  trip: ["www.trip.com", "trip.com"],
  agoda: ["www.agoda.com", "agoda.com"],
  skyscanner: ["www.skyscanner.net", "skyscanner.net"],
};

function isAllowedHost(partner: Partner, urlStr: string) {
  try {
    const h = new URL(urlStr).hostname.replace(/^www\./, "");
    return ALLOWLIST[partner].some(d => h.endsWith(d.replace(/^www\./, "")));
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    // parámetros genéricos (de formularios)
    const partner = (url.searchParams.get("partner") || "booking") as Partner;

    // Datos de búsqueda opcionales
    const q = url.searchParams.get("q") || undefined;
    const checkin = url.searchParams.get("checkin") || undefined;
    const checkout = url.searchParams.get("checkout") || undefined;
    const origin = url.searchParams.get("origin") || undefined;
    const destination = url.searchParams.get("destination") || undefined;
    const adults = url.searchParams.get("adults")
      ? Number(url.searchParams.get("adults"))
      : undefined;
    const children = url.searchParams.get("children")
      ? Number(url.searchParams.get("children"))
      : undefined;
    const cls = url.searchParams.get("class") || undefined;

    // ref/campaña
    const ref = url.searchParams.get("ref") || "homepage";

    // Por si nos pasan directamente un "to" ya construido
    const toProvided = url.searchParams.get("to") || undefined;

    // Construimos la URL final si no vino fechada
    const finalUrl =
      toProvided ??
      buildAffiliateUrl({
        partner,
        q,
        checkin,
        checkout,
        origin,
        destination,
        adults,
        children,
        class: cls,
        subId: ref,
      });

    // Validación de seguridad
    if (!isAllowedHost(partner, finalUrl)) {
      return NextResponse.json({ error: "Destino no permitido" }, { status: 400 });
    }

    // Log en Google Sheets
    try {
      const ts = new Date().toISOString();
      const referer = req.headers.get("referer") || "";
      const ua = req.headers.get("user-agent") || "";
      const page = url.searchParams.get("page") || ""; // opcional: pásalo desde el cliente
      await appendLeadRow(
        [
          ts,               // timestamp
          "click",          // name/type
          partner,          // partner
          finalUrl,         // to
          ref,              // ref/subId
          page,             // page origin
          referer,          // referer
          ua,               // userAgent
        ],
        CLICKS_TAB
      );
    } catch (e) {
      console.warn("[click] sheets warn:", (e as any)?.message || e);
    }

    // Redirección
    return NextResponse.redirect(finalUrl, { status: 302 });
  } catch (e: any) {
    console.error("[click] error:", e?.message || e);
    return NextResponse.json({ error: "No se pudo procesar el click" }, { status: 500 });
  }
}
