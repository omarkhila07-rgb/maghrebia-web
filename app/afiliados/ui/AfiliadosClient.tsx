// app/afiliados/ui/AfiliadosClient.tsx
"use client";

import { useState } from "react";

export default function AfiliadosClient({ defaultRef }: { defaultRef: string }) {
  const [ref, setRef] = useState(defaultRef);

  return (
    <section className="space-y-6">
      <div className="card p-5">
        <h2 className="text-lg font-semibold">Tu código de campaña</h2>
        <p className="text-sm text-slate-600">
          Se añade a los enlaces como <code>ref</code> para atribución.
        </p>
        <input
          className="input mt-3 w-full"
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          placeholder="mi-campaña-ig"
        />
      </div>

      {/* Hoteles */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-medium mb-2">Hoteles (Booking)</h3>
          <HotelForm partner="booking" refCode={ref} />
        </div>
        <div className="card p-5">
          <h3 className="font-medium mb-2">Hoteles (Agoda)</h3>
          <HotelForm partner="agoda" refCode={ref} />
        </div>
      </div>

      {/* Vuelos */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-medium mb-2">Vuelos (Skyscanner)</h3>
          <FlightForm partner="skyscanner" refCode={ref} />
        </div>
        <div className="card p-5">
          <h3 className="font-medium mb-2">Vuelos (Trip.com)</h3>
          <FlightForm partner="trip" refCode={ref} />
        </div>
      </div>
    </section>
  );
}

function HotelForm({ partner, refCode }: { partner: "booking" | "agoda"; refCode: string }) {
  return (
    <form action="/api/click" method="GET" target="_blank" className="space-y-2">
      <input type="hidden" name="partner" value={partner} />
      <input type="hidden" name="ref" value={refCode} />
      <label className="text-sm block">
        Ciudad
        <input className="input w-full mt-1" name="q" placeholder="Tánger" />
      </label>
      <div className="grid grid-cols-2 gap-2">
        <label className="text-sm block">
          Check-in
          <input className="input w-full mt-1" type="date" name="checkin" />
        </label>
        <label className="text-sm block">
          Check-out
          <input className="input w-full mt-1" type="date" name="checkout" />
        </label>
      </div>
      <button className="btn btn-brand w-full">Abrir enlace afiliado</button>
    </form>
  );
}

function FlightForm({ partner, refCode }: { partner: "skyscanner" | "trip"; refCode: string }) {
  return (
    <form action="/api/click" method="GET" target="_blank" className="space-y-2">
      <input type="hidden" name="partner" value={partner} />
      <input type="hidden" name="ref" value={refCode} />
      <div className="grid grid-cols-2 gap-2">
        <label className="text-sm block">
          Origen (IATA)
          <input className="input w-full mt-1" name="origin" placeholder="MAD" />
        </label>
        <label className="text-sm block">
          Destino (IATA)
          <input className="input w-full mt-1" name="destination" placeholder="TNG" />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <label className="text-sm block">
          Ida
          <input className="input w-full mt-1" type="date" name="checkin" />
        </label>
        <label className="text-sm block">
          Vuelta
          <input className="input w-full mt-1" type="date" name="checkout" />
        </label>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className="text-sm block">
          Adultos
          <input className="input w-full mt-1" type="number" min={1} name="adults" defaultValue={1} />
        </label>
        <label className="text-sm block">
          Niños
          <input className="input w-full mt-1" type="number" min={0} name="children" defaultValue={0} />
        </label>
        <label className="text-sm block">
          Clase
          <select className="input w-full mt-1" name="class" defaultValue="economy">
            <option value="economy">Turista</option>
            <option value="premium">Premium</option>
            <option value="business">Business</option>
          </select>
        </label>
      </div>
      <button className="btn btn-brand w-full">Buscar con afiliado</button>
    </form>
  );
}
