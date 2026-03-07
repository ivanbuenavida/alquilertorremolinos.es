export interface ContactConfig {
  phone: string;
  whatsapp: string;
  emailUser: string;
  emailDomain: string;
}

export const contactConfig: ContactConfig = {
  // Número principal de contacto (formato legible)
  phone: '+34 617 29 35 04',
  
  // Número para enlaces de WhatsApp (limpio sin '+')
  whatsapp: '34617293504',
  
  // Correo electrónico de contacto (dividido para dificultar recolección automática)
  emailUser: 'ivanbenavides',
  emailDomain: 'alquilertorremolinos.es'
};
