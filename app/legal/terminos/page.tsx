export const metadata = {
  title: "Términos y Condiciones — Puente",
  description: "Condiciones de uso de Puente: responsabilidades, afiliados y contacto.",
};

export default function TerminosPage() {
  return (
    <main className="prose max-w-3xl mx-auto py-10">
      <h1>Términos y Condiciones</h1>
      <p>
        El uso de este sitio implica la aceptación de los siguientes términos:
      </p>
      <h2>Servicios</h2>
      <p>
        Puente ofrece traducción Darija ↔ Español y servicios digitales relacionados.
        El contenido es informativo y no sustituye asesoría legal.
      </p>
      <h2>Afiliados</h2>
      <p>
        Algunos enlaces son de afiliado (Booking, Skyscanner, etc.). Si reservas a través
        de ellos, podemos recibir una comisión sin coste adicional para ti.
      </p>
      <h2>Responsabilidad</h2>
      <p>
        No nos hacemos responsables de interrupciones de servicio, pérdida de datos o
        decisiones tomadas basadas en la información del sitio.
      </p>
      <h2>Contacto</h2>
      <p>
        Para dudas, escríbenos a contacto@puente.com.
      </p>
    </main>
  );
}
