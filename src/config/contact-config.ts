export interface ContactConfig {
  phone: string;
  whatsapp: string;
  emailUser: string;
  emailDomain: string;
  googleMapsUrl: string;
}

export const contactConfig: ContactConfig = {
  // Número principal de contacto (formato legible)
  phone: '+34 614 44 98 90',
  
  // Número para enlaces de WhatsApp (limpio sin '+')
  whatsapp: '34614449890',
  
  // Correo electrónico de contacto (dividido para dificultar recolección automática)
  emailUser: 'info',
  emailDomain: 'alquilertorremolinos.es',
  
  // Enlace a Google Maps para ver la ubicación del alojamiento
  googleMapsUrl: 'https://maps.app.goo.gl/pjxcoY85eUZZqP8H7'
};
