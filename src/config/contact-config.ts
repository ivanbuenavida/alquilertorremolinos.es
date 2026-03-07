export interface ContactConfig {
  phone: string;
  whatsapp: string;
  emailUser: string;
  emailDomain: string;
  googleMapsUrl: string;
}

export const contactConfig: ContactConfig = {
  // Número principal de contacto (formato legible)
  phone: '+34 617 29 35 04',
  
  // Número para enlaces de WhatsApp (limpio sin '+')
  whatsapp: '34617293504',
  
  // Correo electrónico de contacto (dividido para dificultar recolección automática)
  emailUser: 'ivanbenavides',
  emailDomain: 'alquilertorremolinos.es',
  
  // Enlace a Google Maps para ver la ubicación del alojamiento
  googleMapsUrl: 'https://maps.app.goo.gl/pjxcoY85eUZZqP8H7'
};
