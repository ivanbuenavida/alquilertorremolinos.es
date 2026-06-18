export interface ContactConfig {
  phoneBase64: string;
  whatsappBase64: string;
  googleMapsUrl: string;
}

export const contactConfig: ContactConfig = {
  // Base64 de '+34 614 44 98 90'
  phoneBase64: 'KzM0IDYxNCA0NCA5OCA5MA==',
  
  // Base64 de '34614449890'
  whatsappBase64: 'MzQ2MTQ0NDk4OTA=',
  
  // Enlace a Google Maps para ver la ubicación del alojamiento
  googleMapsUrl: 'https://maps.app.goo.gl/pjxcoY85eUZZqP8H7'
};
