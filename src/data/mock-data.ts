export interface PropertyData {
  title: string;
  location: string;
  host: {
    name: string;
    description: string;
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
  location: "Cerca de Plaza de Andalucía, Torremolinos, Málaga",
  host: {
    name: "Iván",
    description: "Anfitrión verificado · Respuesta rápida"
  },
  description: "Un luminoso y moderno apartamento de dos dormitorios situado en el corazón de Torremolinos, a solo dos minutos de la estación de tren. Ubicado en una zona peatonal tranquila, este encantador hogar combina el estilo mediterráneo con un diseño contemporáneo. Se encuentra en la segunda planta de un edificio (sin ascensor) y ha sido recientemente renovado con materiales de alta calidad. Cuenta con una cocina equipada (horno, microondas, vitrocerámica), un salón espacioso con aire acondicionado y balcón con vistas a una plaza local pintoresca.",
  amenities: [
    { icon: "bi-wifi", name: "Wi-Fi de alta velocidad" },
    { icon: "bi-snow", name: "Aire Acondicionado (Frío/Calor)" },
    { icon: "bi-cup-hot", name: "Cocina y Horno/Microondas" },
    { icon: "bi-droplet", name: "Lavadora en el baño" },
    { icon: "bi-door-open", name: "Balcón privado (Vistas a la plaza)" },
    { icon: "bi-heart", name: "Se permiten mascotas" }
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
