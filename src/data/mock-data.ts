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
    { icon: "bi-wifi", name: "" },      // 1. Wi-Fi
    { icon: "bi-snow", name: "" },      // 2. AC
    { icon: "bi-washer", name: "" },    // 3. Washer
    { icon: "bi-door-open", name: "" }, // 4. Balcony
    { icon: "bi-tv", name: "" },        // 5. Smart TV
    { icon: "bi-cup-hot", name: "" },   // 6. Coffee
    { icon: "bi-grid-3x3-gap", name: "" }, // 7. Microwave
    { icon: "bi-grid", name: "" },      // 8. Toaster
    { icon: "bi-egg-fried", name: "" }, // 9. Essentials
    { icon: "bi-cup", name: "" },       // 10. Kettle
    { icon: "bi-wind", name: "" },      // 11. Hairdryer
    { icon: "bi-droplet-fill", name: "" }, // 12. Toiletry
    { icon: "bi-arrow-down-up", name: "" }, // 13. No elevator (Reverted to arrows)
    { icon: "bi-thermometer-half", name: "" }, // 14. Iron
    { icon: "bi-moon", name: "" },      // 15. Blackout
    { icon: "bi-heart", name: "" },     // 16. Pets
    { icon: "bi-plus-square", name: "" }, // 17. First aid
    { icon: "bi-key", name: "" }        // 18. Check-in
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
