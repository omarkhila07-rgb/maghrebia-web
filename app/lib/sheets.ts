import { google } from "googleapis";

function getJwt() {
  const email = process.env.GOOGLE_SA_EMAIL!;
  let key = process.env.GOOGLE_SA_PRIVATE_KEY!;
  if (!email || !key) throw new Error("Missing Google SA envs");
  // En Vercel, la private key suele venir con \n escapados
  key = key.replace(/\\n/g, "\n");
  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

/**
 * Inserta una fila en Google Sheets.
 * @param values  Columnas en orden (timestamp, name, whatsapp, email, side, plan, type, message, ref, userAgent)
 * @param tabName (opcional) nombre de la pestaña; por defecto "Leads".
 */
export async function appendLeadRow(values: (string | number)[], tabName?: string) {
  const jwt = getJwt();
  const sheets = google.sheets({ version: "v4", auth: jwt });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  const range = `${tabName || "Leads"}!A1`; // <- ahora usa la pestaña que le pases
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    requestBody: { values: [values] },
  });
}

