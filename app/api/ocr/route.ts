// app/api/ocr/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Endpoint deshabilitado: se ha eliminado el OCR y el parseo de PDF. */
export async function POST() {
  return NextResponse.json(
    { ok: false, error: "OCR deshabilitado temporalmente" },
    { status: 410 } // Gone (o usa 501 si prefieres Not Implemented)
  );
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "OCR deshabilitado temporalmente" },
    { status: 410 }
  );
}
