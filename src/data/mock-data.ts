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
  description: "Un luminoso y moderno apartamento de dos dormitorios situado en el corazón de Torremolinos, a solo dos minutos de la estación de tren. Ubicado en una zona peatonal tranquila, este encantador hogar combina el estilo mediterráneo con un diseño contemporáneo. Se encuentra en la segunda planta de un edificio y ha sido recientemente renovado con materiales de alta calidad. Cuenta con una cocina equipada (horno, microondas, vitrocerámica), un salón espacioso con aire acondicionado y balcón con vistas a una plaza local pintoresca.",
  amenities: [
    { icon: "bi-wifi", name: "" },      // Wi-Fi
    { icon: "bi-snow", name: "" },      // AC
    { icon: "bi-droplet", name: "" },   // Washer
    { icon: "bi-door-open", name: "" }, // Balcony
    { icon: "bi-tv", name: "" },        // Smart TV
    { icon: "bi-cup-hot", name: "" },   // Coffee
    { icon: "bi-grid-1x2", name: "" },  // Microwave
    { icon: "bi-box-seam", name: "" },  // Toaster
    { icon: "bi-egg-fried", name: "" }, // Essentials
    { icon: "bi-moisture", name: "" },  // Kettle
    { icon: "bi-wind", name: "" },      // Hairdryer
    { icon: "bi-magic", name: "" },     // Toiletry
    { icon: "bi-hammer", name: "" },    // Iron
    { icon: "bi-moon", name: "" },      // Blackout
    { icon: "bi-heart", name: "" },     // Pets
    { icon: "bi-plus-square", name: "" }, // First aid
    { icon: "bi-key", name: "" },        // Check-in
    { icon: "bi-arrow-down-up", name: "" } // No elevator (LAST)
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
