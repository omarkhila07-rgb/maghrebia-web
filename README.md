# Puente · Web base (Next.js + Tailwind)

Mini esqueleto con home, traductor embebido, servicios y contacto.
Afiliados preparado con `?ref=` (cookie).

## Uso

```bash
pnpm i   # o npm i / yarn
pnpm dev # http://localhost:3000
```

## Pega tu traductor
Copia tu UI a `app/traductor/page.tsx`.
La home usa un `<iframe src="/traductor/mini" />` como demo.

## Activar correo real
Cambia el `mailto:` en `app/contacto/page.tsx` o crea un endpoint en `/api/contact` (Resend).
