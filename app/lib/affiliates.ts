import { cookies } from "next/headers";

export type Partner = "booking" | "trip" | "agoda" | "skyscanner";
export type Category = "hoteles" | "vuelos";

export function getRefFromCookie() {
  try {
    return cookies().get("ref")?.value || "";
  } catch {
    return "";
  }
}

export function buildAffiliateUrl(opts: {
  partner: Partner;
  baseUrl?: string;
  q?: string;
  checkin?: string;
  checkout?: string;
  origin?: string;
  destination?: string;
  adults?: number;
  children?: number;
  class?: string;
  subId?: string;
}) {
  const ref = (opts.subId || "").trim();

  switch (opts.partner) {
    case "booking": {
      const aid = process.env.AFF_BOOKING_ID || "";
      const u = new URL(opts.baseUrl || "https://www.booking.com/index.html");
      if (aid) u.searchParams.set("aid", aid);
      u.searchParams.set("label", ref || "puente");
      if (opts.q) u.searchParams.set("ss", opts.q);
      if (opts.checkin) u.searchParams.set("checkin", opts.checkin);
      if (opts.checkout) u.searchParams.set("checkout", opts.checkout);
      return u.toString();
    }
    case "trip": {
      const pid = process.env.AFF_TRIP_PID || "";
      const u = new URL(opts.baseUrl || "https://www.trip.com/flights/");
      if (pid) u.searchParams.set("allianceid", pid);
      if (ref) u.searchParams.set("sid", ref);
      if (opts.origin && opts.destination)
        u.searchParams.set("route", `${opts.origin}-${opts.destination}`);
      return u.toString();
    }
    case "agoda": {
      const aid = process.env.AFF_AGODA_ID || "";
      const u = new URL(opts.baseUrl || "https://www.agoda.com/");
      if (aid) u.searchParams.set("cid", aid);
      if (ref) u.searchParams.set("tag", ref);
      if (opts.q) u.searchParams.set("city", opts.q);
      return u.toString();
    }
    case "skyscanner": {
      const pid = process.env.AFF_SKYSCANNER_PID || "";
      const u = new URL(opts.baseUrl || "https://www.skyscanner.net/transport/flights");
      if (pid) u.searchParams.set("utm_source", pid);
      if (ref) u.searchParams.set("utm_content", ref);
      if (opts.origin && opts.destination)
        u.pathname += `/${opts.origin}/${opts.destination}`;
      return u.toString();
    }
    default:
      return opts.baseUrl || "/";
  }
}
