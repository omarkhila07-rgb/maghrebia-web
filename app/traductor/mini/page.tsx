/**
 * Versión "mini" para embeber en la home con <iframe src="/traductor/mini" />
 * En producción puedes renderizar el mismo componente con props compactas.
 */
export default function TraductorMini() {
  return (
    <div className="h-full flex flex-col">
      <textarea
        className="border rounded-xl p-3 text-sm mb-2"
        placeholder="(Mini) Escribe aquí…"
      />
      <button className="btn btn-brand w-full">Traducir</button>
      <div className="mt-2 border rounded-xl p-3 text-sm bg-slate-50">
        La traducción aparecerá aquí…
      </div>
    </div>
  );
}
