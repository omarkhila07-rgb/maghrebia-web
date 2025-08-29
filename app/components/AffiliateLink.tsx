import Link from "next/link";
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

export default function AffiliateLink({
  partner,
  to,
  refId,
  children,
  className,
  title,
  target = "_blank",
  rel = "noopener noreferrer",
}: Props) {
  const href = `/api/click?partner=${encodeURIComponent(partner)}&to=${encodeURIComponent(to)}${
    refId ? `&ref=${encodeURIComponent(refId)}` : ""
  }`;

  return (
    <Link href={href} className={className} title={title} target={target} rel={rel}>
      {children}
    </Link>
  );
}
