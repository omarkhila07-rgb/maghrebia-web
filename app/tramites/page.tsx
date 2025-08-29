// app/tramites/page.tsx
import Uploader from "./uploader";

export const metadata = {
  title: "Trámites para marroquíes en España — Puente",
  description:
    "Traducción de documentos, guías de trámites y asesoría exprés en Darija y Español.",
};

export default function Tramites() {
  return (
    <main className="max-w-3xl px-4 py-10 mx-auto">
      <h1 className="text-3xl font-semibold">
        👨‍👩‍👧 Trámites para marroquíes en España
      </h1>
      <p className="mt-2 text-slate-700">
        Traducción de documentos (DNI/NIE, cartas del colegio, bancos),
        guías de trámites y asesoría exprés en Darija y Español.
      </p>

      <div className="card p-5 mt-6">
        <h2 className="text-xl font-semibold">¿Qué necesitas?</h2>
        <ul className="list-disc text-sm text-slate-700 mt-2 pl-5 space-y-1">
          <li>Traducir un documento oficial</li>
          <li>Entender una carta del colegio / banco</li>
          <li>Pedir cita en extranjería</li>
        </ul>

        {/* Uploader para subir documentos */}
        <div className="mt-6">
          <Uploader />
        </div>

        <a
          href="https://wa.me/34600000000?text=Hola,%20necesito%20ayuda%20con%20un%20trámite"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-brand mt-6"
        >
          Hablar por WhatsApp
        </a>
      </div>
    </main>
  );
}
