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
  title: "Stunning Apartment in Torremolinos",
  location: "Torremolinos, Málaga, Spain",
  host: {
    name: "Iván",
    description: "Superhost · Reliable support"
  },
  description: "Welcome to our beautiful apartment in the heart of Torremolinos. Perfectly located just minutes from the beach, enjoy a relaxing getaway with all the modern amenities you could ask for. Experience the best of the Costa del Sol with easy access to restaurants, supermarkets, and public transport.",
  amenities: [
    { icon: "bi-wifi", name: "Fast Wi-Fi" },
    { icon: "bi-tv", name: "Smart TV" },
    { icon: "bi-snow", name: "Air Conditioning" },
    { icon: "bi-cup-hot", name: "Kitchen Basics" },
    { icon: "bi-car-front", name: "Free Parking" },
    { icon: "bi-water", name: "Pool Access" }
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
