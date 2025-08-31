// app/components/AffiliateLink.tsx
import type { ReactNode } from "react";

type Props = {
  /** Nombre del partner: booking | agoda | skyscanner | trip | etc. */
  partner: string;
  /** URL final del partner (la que quieres abrir). */
  to: string;
  /** Opcional: subId/ref para atribución (cookie, campaña, etc.) */
  refId?: string;
  /** Texto o nodos a renderizar como enlace */
  children: ReactNode;
  className?: string;
  title?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
};

function buildClickUrl(partner: string, to: string, refId?: string) {
  const base = `/api/click?partner=${encodeURIComponent(partner)}&to=${encodeURIComponent(to)}`;
  return refId ? `${base}&ref=${encodeURIComponent(refId)}` : base;
}

export default function AffiliateLink({
  partner,
  to,
  refId,
  children,
  className,
  title,
  target = "_blank",
  rel,
}: Props) {
  const href = buildClickUrl(partner, to, refId);
  const safeRel = rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);

  return (
    <a
      href={href}
      className={className}
      title={title}
      target={target}
      rel={safeRel}
      data-partner={partner}
      data-ref={refId}
    >
      {children}
    </a>
  );
}
