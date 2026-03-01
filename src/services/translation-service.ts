type Language = 'es' | 'en' | 'de' | 'fr' | 'nl';

interface Labels {
  // Navbar
  nav_brand: string;
  // Hero/Carousel
  hero_title: string;
  // Property Details
  prop_about: string;
  prop_host_prefix: string;
  prop_location: string;
  prop_description: string;
  // Amenities
  amen_offers: string;
  amen_wifi: string;
  amen_tv: string;
  amen_ac: string;
  amen_kitchen: string;
  amen_parking: string;
  amen_pool: string;
  amen_washer: string;
  amen_balcony: string;
  amen_pets: string;
  // Availability Calendar
  cal_title: string;
  cal_legend_available: string;
  cal_legend_occupied: string;
  cal_btn_whatsapp: string;
  cal_loading: string;
  // Footer
  footer_rights: string;
  footer_whatsapp: string;
  footer_whatsapp_msg: string;
  // Months (if needed for JS formatting)
  month_jan: string;
  month_feb: string;
  month_mar: string;
  month_apr: string;
  month_may: string;
  month_jun: string;
  month_jul: string;
  month_aug: string;
  month_sep: string;
  month_oct: string;
  month_nov: string;
  month_dec: string;
}

const translations: Record<Language, Labels> = {
  es: {
    nav_brand: "Alquiler Torremolinos",
    hero_title: "Escapada en Torremolinos",
    prop_about: "Sobre este lugar",
    prop_host_prefix: "Anfitrión",
    prop_location: "Junto a calle San miguel, Torremolinos, Málaga",
    prop_description: "Un luminoso y moderno apartamento de dos dormitorios situado en el corazón de Torremolinos, a solo dos minutos de la estación de tren. Ubicado en una zona peatonal tranquila, este encantador hogar combina el estilo mediterráneo con un diseño contemporáneo. Se encuentra en la segunda planta de un edificio (sin ascensor) y ha sido recientemente renovado con materiales de alta calidad. Cuenta con una cocina equipada (horno, microondas, vitrocerámica), un salón espacioso con aire acondicionado y balcón con vistas a una plaza local pintoresca.",
    amen_offers: "Lo que este lugar ofrece",
    amen_wifi: "Wi-Fi rápido",
    amen_tv: "Smart TV",
    amen_ac: "Aire Acondicionado",
    amen_kitchen: "Conceptos básicos de cocina",
    amen_parking: "Aparcamiento gratuito",
    amen_pool: "Piscina comunitaria",
    amen_washer: "Lavadora",
    amen_balcony: "Balcón privado",
    amen_pets: "Mascotas permitidas",
    cal_title: "Disponibilidad y Reservas",
    cal_legend_available: "Disponible",
    cal_legend_occupied: "Ocupado",
    cal_btn_whatsapp: "Reservar por WhatsApp",
    cal_loading: "Cargando...",
    footer_rights: "Todos los derechos reservados.",
    footer_whatsapp: "Contacta por WhatsApp",
    footer_whatsapp_msg: "Hola, escribo para solicitar información sobre el piso en Centro comercial España",
    month_jan: "Enero", month_feb: "Febrero", month_mar: "Marzo",
    month_apr: "Abril", month_may: "Mayo", month_jun: "Junio",
    month_jul: "Julio", month_aug: "Agosto", month_sep: "Septiembre",
    month_oct: "Octubre", month_nov: "Noviembre", month_dec: "Diciembre"
  },
  en: {
    nav_brand: "Torremolinos Rental",
    hero_title: "Torremolinos Retreat",
    prop_about: "About this place",
    prop_host_prefix: "Host",
    prop_location: "Junto a calle San miguel, Torremolinos, Málaga",
    prop_description: "A bright and modern two-bedroom apartment located in the heart of Torremolinos, just two minutes from the train station. Situated in a quiet pedestrian area, this charming home combines Mediterranean style with contemporary design. It is located on the second floor of a building (no elevator) and has been recently renovated with high-quality materials. It features an equipped kitchen (oven, microwave, ceramic hob), a spacious air-conditioned living room, and a balcony overlooking a picturesque local square.",
    amen_offers: "What this place offers",
    amen_wifi: "Fast Wi-Fi",
    amen_tv: "Smart TV",
    amen_ac: "Air Conditioning",
    amen_kitchen: "Kitchen Basics",
    amen_parking: "Free Parking",
    amen_pool: "Communal Pool",
    amen_washer: "Washing Machine",
    amen_balcony: "Private Balcony",
    amen_pets: "Pets Allowed",
    cal_title: "Availability & Bookings",
    cal_legend_available: "Available",
    cal_legend_occupied: "Occupied",
    cal_btn_whatsapp: "Book via WhatsApp",
    cal_loading: "Loading...",
    footer_rights: "All rights reserved.",
    footer_whatsapp: "Contact via WhatsApp",
    footer_whatsapp_msg: "Hello, I am writing to request information about the apartment at Centro comercial España",
    month_jan: "January", month_feb: "February", month_mar: "March",
    month_apr: "April", month_may: "May", month_jun: "June",
    month_jul: "July", month_aug: "August", month_sep: "September",
    month_oct: "October", month_nov: "November", month_dec: "December"
  },
  de: {
    nav_brand: "Ferienwohnung Torremolinos",
    hero_title: "Rückzugsort in Torremolinos",
    prop_about: "Über diesen Ort",
    prop_host_prefix: "Gastgeber",
    prop_location: "Junto a calle San miguel, Torremolinos, Málaga",
    prop_description: "Ein helles und modernes Apartment mit zwei Schlafzimmern im Herzen von Torremolinos, nur zwei Minuten vom Bahnhof entfernt. In einer ruhigen Fußgängerzone gelegen, kombiniert dieses charmante Zuhause mediterranen Stil mit modernem Design. Es befindet sich im zweiten Stock eines Gebäudes (kein Aufzug) und wurde kürzlich mit hochwertigen Materialien renoviert. Es verfügt über eine ausgestattete Küche (Backofen, Mikrowelle, Cerankochfeld), ein geräumiges, klimatisiertes Wohnzimmer und einen Balkon mit Blick auf einen malerischen lokalen Platz.",
    amen_offers: "Was dieser Ort bietet",
    amen_wifi: "Schnelles WLAN",
    amen_tv: "Smart TV",
    amen_ac: "Klimaanlage",
    amen_kitchen: "Küchengrundausstattung",
    amen_parking: "Kostenlose Parkplätze",
    amen_pool: "Gemeinschaftspool",
    amen_washer: "Waschmaschine",
    amen_balcony: "Privater Balkon",
    amen_pets: "Haustiere erlaubt",
    cal_title: "Verfügbarkeit & Buchungen",
    cal_legend_available: "Verfügbar",
    cal_legend_occupied: "Belegt",
    cal_btn_whatsapp: "Über WhatsApp buchen",
    cal_loading: "Wird geladen...",
    footer_rights: "Alle Rechte vorbehalten.",
    footer_whatsapp: "Kontakt über WhatsApp",
    footer_whatsapp_msg: "Hallo, ich schreibe, um Informationen über die Wohnung im Centro comercial España anzufordern",
    month_jan: "Januar", month_feb: "Februar", month_mar: "März",
    month_apr: "April", month_may: "Mai", month_jun: "Juni",
    month_jul: "Juli", month_aug: "August", month_sep: "September",
    month_oct: "Oktober", month_nov: "November", month_dec: "Dezember"
  },
  fr: {
    nav_brand: "Location Torremolinos",
    hero_title: "Retraite à Torremolinos",
    prop_about: "À propos de ce logement",
    prop_host_prefix: "Hôte",
    prop_location: "Junto a calle San miguel, Torremolinos, Málaga",
    prop_description: "Un appartement de deux chambres lumineux et moderne situé au cœur de Torremolinos, à seulement deux minutes de la gare. Située dans une zone piétonne calme, cette charmante maison combine le style méditerranéen avec un design contemporain. Il est situé au deuxième étage d'un bâtiment (pas d'ascenseur) et a été récemment rénové avec des matériaux de haute qualité. Il dispose d'une cuisine équipée (four, micro-ondes, plaque vitrocéramique), d'un salon climatisé spacieux et d'un balcon donnant sur une place locale pittoresque.",
    amen_offers: "Ce que ce logement propose",
    amen_wifi: "Wi-Fi rapide",
    amen_tv: "Smart TV",
    amen_ac: "Climatisation",
    amen_kitchen: "Équipements de cuisine",
    amen_parking: "Parking gratuit",
    amen_pool: "Piscine commune",
    amen_washer: "Lave-linge",
    amen_balcony: "Balcon privé",
    amen_pets: "Animaux acceptés",
    cal_title: "Disponibilité et Réservations",
    cal_legend_available: "Disponible",
    cal_legend_occupied: "Occupé",
    cal_btn_whatsapp: "Réserver par WhatsApp",
    cal_loading: "Chargement...",
    footer_rights: "Tous droits réservés.",
    footer_whatsapp: "Contactez sur WhatsApp",
    footer_whatsapp_msg: "Bonjour, je vous écris pour demander des informations sur l'appartement au Centro comercial España",
    month_jan: "Janvier", month_feb: "Février", month_mar: "Mars",
    month_apr: "Avril", month_may: "Mai", month_jun: "Juin",
    month_jul: "Juillet", month_aug: "Août", month_sep: "Septembre",
    month_oct: "Octobre", month_nov: "Novembre", month_dec: "Décembre"
  },
  nl: {
    nav_brand: "Verhuur Torremolinos",
    hero_title: "Torremolinos Retreat",
    prop_about: "Over deze plek",
    prop_host_prefix: "Host",
    prop_location: "Junto a calle San miguel, Torremolinos, Málaga",
    prop_description: "Een licht en modern appartement met twee slaapkamers gelegen in het hart van Torremolinos, op slechts twee minuten van het treinstation. Gelegen in een rustig voetgangersgebied, combineert dit charmante huis een mediterrane stijl met een eigentijds design. Het bevindt zich op de tweede verdieping van een gebouw (geen lift) en is onlangs gerenoveerd met hoogwaardige materialen. Het beschikt over een uitgeruste keuken (oven, magnetron, keramische kookplaat), een ruime woonkamer met airconditioning en een balkon met uitzicht op een schilderachtig lokaal plein.",
    amen_offers: "Wat deze plek biedt",
    amen_wifi: "Snelle wifi",
    amen_tv: "Smart-tv",
    amen_ac: "Airconditioning",
    amen_kitchen: "Keukenbenodigdheden",
    amen_parking: "Gratis parkeren",
    amen_pool: "Gedeeld zwembad",
    amen_washer: "Wasmachine",
    amen_balcony: "Privébalkon",
    amen_pets: "Huisdieren toegestaan",
    cal_title: "Beschikbaarheid & Boekingen",
    cal_legend_available: "Beschikbaar",
    cal_legend_occupied: "Bezet",
    cal_btn_whatsapp: "Boeken via WhatsApp",
    cal_loading: "Laden...",
    footer_rights: "Alle rechten voorbehouden.",
    footer_whatsapp: "Contact via WhatsApp",
    footer_whatsapp_msg: "Hallo, ik schrijf om informatie op te vragen over het appartement in Centro comercial España",
    month_jan: "Januari", month_feb: "Februari", month_mar: "Maart",
    month_apr: "April", month_may: "Mei", month_jun: "Juni",
    month_jul: "Juli", month_aug: "Augustus", month_sep: "September",
    month_oct: "Oktober", month_nov: "November", month_dec: "December"
  }
};

export class TranslationService {
  private static _currentLang: Language = 'es';
  private static _listeners: Array<(lang: Language) => void> = [];

  static init() {
    // 1. Try to get from URL (?lang=en)
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang') as Language;
    
    // 2. Try to detect from browser
    const browserLang = navigator.language.split('-')[0] as Language;
    
    const supported = this.getSupportedLanguages().map(l => l.code);
    
    let targetLang: Language = 'es';
    if (supported.includes(langParam)) {
      targetLang = langParam;
    } else if (supported.includes(browserLang)) {
      targetLang = browserLang;
    }

    this.setLanguage(targetLang, false); // false to avoid redundant URL push on init
  }

  static get l() {
    return translations[this._currentLang];
  }

  static get currentLang() {
    return this._currentLang;
  }

  static setLanguage(lang: Language, updateUrl: boolean = true) {
    this._currentLang = lang;
    
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.pushState({}, '', url.toString());
    }

    this._listeners.forEach(cb => cb(lang));
    window.dispatchEvent(new CustomEvent('language-changed', { detail: lang }));
  }

  static onLanguageChange(cb: (lang: Language) => void) {
    this._listeners.push(cb);
  }

  static getSupportedLanguages() {
    return [
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'nl', name: 'Nederlands', flag: '🇳🇱' }
    ];
  }

  static translateAmenity(key: string): string {
    const map: any = {
      'bi-wifi': this.l.amen_wifi,
      'bi-tv': this.l.amen_tv,
      'bi-snow': this.l.amen_ac,
      'bi-cup-hot': this.l.amen_kitchen,
      'bi-car-front': this.l.amen_parking,
      'bi-water': this.l.amen_pool,
      'bi-droplet': this.l.amen_washer,
      'bi-door-open': this.l.amen_balcony,
      'bi-heart': this.l.amen_pets,
    };
    return map[key] || key;
  }
}
