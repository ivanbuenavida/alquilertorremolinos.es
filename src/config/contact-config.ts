export interface ContactConfig {
  phone: string;
  whatsapp: string;
  email: string;
}

export const contactConfig: ContactConfig = {
  // Número principal de contacto
  phone: '34645229342', // Asumiendo este basado en conversaciones anteriores
  
  // Número para enlaces de WhatsApp (debe contener el código de país sin el '+')
  whatsapp: '34645229342',
  
  // Correo electrónico de información general
  email: 'info@alquilertorremolinos.es'
};
