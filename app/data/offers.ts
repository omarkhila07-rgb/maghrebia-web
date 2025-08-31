import type { Partner, Category } from "@/lib/affiliates";

export type Offer = {
  id: string;
  title: string;
  description: string;
  image?: string;
  category: Category;
  partner: Partner;
  params?: Record<string, string>;
};

export const OFFERS: Offer[] = [
  {
    id: "hotel-marrakech-centro",
    title: "Hoteles en Marrakech Centro",
    description: "Encuentra alojamiento en el corazón de Marrakech.",
    image: "/images/marrakech.jpg",
    category: "hoteles",
    partner: "booking",
    params: { q: "Marrakech" }
  },
  {
    id: "vuelos-tangier-madrid",
    title: "Vuelos Tánger → Madrid",
    description: "Compara vuelos económicos de TNG a MAD.",
    image: "/images/vuelos.jpg",
    category: "vuelos",
    partner: "skyscanner",
    params: { origin: "TNG", destination: "MAD" }
  },
  {
    id: "hoteles-tetuan",
    title: "Hoteles en Tetuán",
    description: "Buenas opciones calidad/precio.",
    image: "/images/tetuan.jpg",
    category: "hoteles",
    partner: "agoda",
    params: { q: "Tetouan" }
  },
  {
    id: "vuelos-casablanca-barcelona",
    title: "Vuelos Casablanca → Barcelona",
    description: "Busca tu mejor combinación desde CMN a BCN.",
    image: "/images/vuelos2.jpg",
    category: "vuelos",
    partner: "trip",
    params: { origin: "CMN", destination: "BCN" }
  }
];
