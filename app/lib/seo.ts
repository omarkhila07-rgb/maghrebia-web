export function organizationJsonLd({
  name,
  url,
  logo,
  sameAs = [],
}: {
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    sameAs,
  };
}

export function articleJsonLd({
  title,
  description,
  url,
  datePublished,
  image,
  authorName = "Puente",
  publisherName = "Puente",
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  image?: string;
  authorName?: string;
  publisherName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished: datePublished || new Date().toISOString(),
    image: image || `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/og.png`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: authorName },
    publisher: { "@type": "Organization", name: publisherName },
  };
}

