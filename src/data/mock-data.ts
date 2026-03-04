export interface PropertyData {
  title: string;
  location: string;
  host: {
    name: string;
    description: string;
    image?: string;
    experience?: string;
  };
  description: string;
  amenities: {
    icon: string;
    name: string;
  }[];
  images: string[];
}

export const propertyData: PropertyData = {
  title: "Moderno Apartamento de 2 Dormitorios en el Centro",
  location: "Junto a calle San miguel, Torremolinos, Málaga",
  host: {
    name: "Iván Benavides",
    description: "Anfitrión verificado · Respuesta rápida",
    image: "/anfitrion.jpg",
    experience: "Superhost"
  },
  description: "Un luminoso y moderno apartamento de dos dormitorios situado en el corazón de Torremolinos, a solo dos minutos de la estación de tren. Ubicado en una zona peatonal tranquila, este encantador hogar combina el estilo mediterráneo con un diseño contemporáneo. Se encuentra en la segunda planta de un edificio (sin ascensor) y ha sido recientemente renovado con materiales de alta calidad. Cuenta con una cocina equipada (horno, microondas, vitrocerámica), un salón espacioso con aire acondicionado y balcón con vistas a una plaza local pintoresca.",
  amenities: [
    { icon: "bi-wifi", name: "" },
    { icon: "bi-tv", name: "" },
    { icon: "bi-snow", name: "" },
    { icon: "bi-cup-hot", name: "" },
    { icon: "bi-grid-1x2", name: "" },
    { icon: "bi-moisture", name: "" },
    { icon: "bi-box-seam", name: "" },
    { icon: "bi-egg-fried", name: "" },
    { icon: "bi-wind", name: "" },
    { icon: "bi-magic", name: "" },
    { icon: "bi-hammer", name: "" },
    { icon: "bi-droplet", name: "" },
    { icon: "bi-moon", name: "" },
    { icon: "bi-door-open", name: "" },
    { icon: "bi-heart", name: "" },
    { icon: "bi-plus-square", name: "" },
    { icon: "bi-arrow-down-up", name: "" },
    { icon: "bi-key", name: "" }
  ],
  images: [
    '/images/WhatsApp-Image-2026-02-20-at-15.06.42-1.jpeg',
    '/images/WhatsApp-Image-2026-02-20-at-15.06.42-2.jpeg',
    '/images/WhatsApp-Image-2026-02-20-at-15.06.42-3.jpeg',
    '/images/WhatsApp-Image-2026-02-20-at-15.06.42-4.jpeg',
    '/images/WhatsApp-Image-2026-02-20-at-15.06.42-5.jpeg',
    '/images/WhatsApp-Image-2026-02-20-at-15.06.42.jpeg',
    '/images/WhatsApp-Image-2026-02-20-at-15.06.43-1.jpeg',
    '/images/WhatsApp-Image-2026-02-20-at-15.06.43.jpeg'
  ]
};
