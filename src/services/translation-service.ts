type Language = 'es' | 'en' | 'de' | 'fr' | 'nl';

interface Labels {
  // Navbar
  nav_brand: string;
  // Hero/Carousel
  hero_title: string;
  // Property Details
  prop_about: string;
  prop_host_prefix: string;
  prop_host_description: string;
  host_languages: string;
  prop_read_more: string;
  prop_show_less: string;
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
  amen_coffee: string;
  amen_microwave: string;
  amen_kettle: string;
  amen_toaster: string;
  amen_essentials: string;
  amen_hairdryer: string;
  amen_toiletry: string;
  amen_iron: string;
  amen_blackout: string;
  amen_smart_tv: string;
  amen_firstaid: string;
  amen_no_elevator: string;
  amen_checkin: string;
  amen_btn_show_all: (count: number) => string;
  amen_modal_title: string;
  // Availability Calendar
  cal_title: string;
  cal_legend_available: string;
  cal_legend_occupied: string;
  cal_btn_whatsapp: string;
  cal_loading: string;
  cal_summary_nights: string;
  cal_summary_total: string;
  cal_summary_title: string;
  cal_summary_dates: string;
  cal_summary_checkin: string;
  cal_summary_checkout: string;
  cal_summary_select_checkout: string;
  cal_summary_reset: string;
  cal_err_min_nights: (reserved: number, min: number) => string;
  cal_err_overlap: string;
  cal_suggested_dates: string;
  cal_summary_subtotal: string;
  cal_summary_discount_weekly: string;
  cal_summary_discount_monthly: string;
  cal_err_max_nights_msg: string;
  cal_err_date_limit_msg: string;
  cal_wa_limit_msg: (date: string) => string;
  cal_summary_discount_early: string;
  cal_summary_discount_early_info: string;
  cal_summary_deposit: (percent: number) => string;
  cal_summary_deposit_info: string;
  cal_btn_share: string;
  cal_share_title: string;
  cal_share_text: (property: string, dates: string, price: string) => string;
  cal_copy_success: string;
  // Policies (Accordion)
  pol_title: string;
  pol_cancellation_title: string;
  pol_cancellation_desc: string;
  pol_payment_title: string;
  pol_payment_desc: string;
  pol_contact_title: string;
  pol_contact_desc: string;
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
  img_btn_show_all: string;
  img_gallery_title: string;
  img_btn_share: string;
  img_gallery_photo: string;
  map_title: string;
  host_title: string;
  host_superhost: string;
  host_study: string;
  host_contact_btn: string;
  host_protection: string;
  app_property_title: string;
  app_property_specs: string;
  pol_rules_title: string;
  pol_rules_desc: string;
  img_title_1: string;
  img_title_2: string;
  img_title_3: string;
  img_title_4: string;
  img_title_5: string;
  img_title_6: string;
  img_title_7: string;
  img_title_8: string;
  // SEO
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  // Host
  host_qualities_ivan: string;
  host_qualities_other: string;
  // WhatsApp & Helpers
  wa_hello: string;
  wa_request_prefix: string;
  wa_would_like: string;
  wa_date_to: string;
  wa_translation_prefix: string;
}

const translations: Record<Language, Labels> = {
  es: {
    nav_brand: "Alquiler Torremolinos",
    hero_title: "Alquiler Vacacional Torremolinos",
    prop_about: "Sobre este lugar",
    prop_host_prefix: "Anfitrión",
    prop_host_description: "¡Hola! Soy Iván, ingeniero de profesión, deportista y amante de viajar. Hace poco decidí reformar y preparar mis alojamientos con mucho cariño para embarcarme en el mundo del alquiler turístico y ofrecer estancias de calidad. Soy una persona extrovertida, risueña y con sentido del humor. Estoy disponible para ayudarte a que tu estancia supere tus expectativas y sea lo más placentera posible. ¡Espero recibirte pronto!",
    host_languages: "Idiomas que habla: Inglés, Español, Alemán",
    prop_read_more: "Leer más",
    prop_show_less: "Mostrar menos",
    prop_location: "Junto a calle San miguel, Torremolinos, Málaga",
    prop_description: "Un luminoso y moderno apartamento de dos dormitorios situado en el corazón de Torremolinos, a solo dos minutos de la estación de tren. Ubicado en una zona peatonal tranquila, este encantador hogar combina el estilo mediterráneo con un diseño contemporáneo. Se encuentra en la segunda planta de un edificio y ha sido recientemente renovado con materiales de alta calidad. Cuenta con una cocina equipada (horno, microondas, vitrocerámica), un salón espacioso con aire acondicionado y balcón con vistas a una plaza local pintoresca.",
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
    amen_coffee: "Cafetera Nespresso",
    amen_microwave: "Microondas con grill",
    amen_kettle: "Hervidor de agua",
    amen_toaster: "Tostadora",
    amen_essentials: "Sal, aceite y azúcar",
    amen_hairdryer: "Secador de pelo",
    amen_toiletry: "Champú y gel de ducha",
    amen_iron: "Plancha para ropa",
    amen_blackout: "Persianas (oscuridad total)",
    amen_smart_tv: "Smart TV 65\" (Netflix, Prime, Disney+)",
    amen_firstaid: "Botiquín de primeros auxilios",
    amen_no_elevator: "Sin ascensor (Segunda planta)",
    amen_checkin: "Llegada personal o autónoma",
    amen_btn_show_all: (count) => `Mostrar los ${count} servicios`,
    amen_modal_title: "Lo que este lugar ofrece",
    cal_title: "Reservas",
    cal_legend_available: "Disponible",
    cal_legend_occupied: "Ocupado",
    cal_btn_whatsapp: "Reservar por WhatsApp",
    cal_loading: "Cargando...",
    cal_summary_nights: "noches",
    cal_summary_total: "Precio total",
    cal_summary_title: "Resumen de reserva",
    cal_summary_dates: "Fechas",
    cal_summary_checkin: "Entrada",
    cal_summary_checkout: "Salida",
    cal_summary_select_checkout: "Selecciona fecha de salida",
    cal_summary_reset: "Limpiar selección",
    cal_err_min_nights: (reserved, min) => `Estás reservando ${reserved} noches. La reserva mínima en estas fechas es de ${min} noches`,
    cal_err_overlap: "Las fechas seleccionadas contienen días no disponibles.",
    cal_suggested_dates: "Fechas alternativas sugeridas:",
    cal_summary_subtotal: "Subtotal",
    cal_summary_discount_weekly: "Descuento semanal",
    cal_summary_discount_monthly: "Descuento de larga estancia",
    cal_err_max_nights_msg: "No es posible reservar más de 30 días por la web. Contacta con nosotros directamente para estancias de larga duración.",
    cal_err_date_limit_msg: "No es posible reservar más allá del 30 de Septiembre por la web. Contacta con nosotros para consultar disponibilidad futura.",
    cal_wa_limit_msg: (date) => `Hola, quiero reservar para las fechas: ${date}`,
    cal_summary_discount_early: "Descuento por reserva temprana",
    cal_summary_discount_early_info: "Si se cancela o modifica la reserva, se perderá este descuento.",
    cal_summary_deposit: (percent) => `Reserva del ${percent}%`,
    cal_summary_deposit_info: "Para garantizar su reserva, el pago del depósito debe completarse en un plazo de 24 horas. De lo contrario, las fechas volverán a estar disponibles.",
    cal_btn_share: "Compartir reserva",
    cal_share_title: "Mira este alojamiento en Torremolinos",
    cal_share_text: (property, dates, price) => `He encontrado este alojamiento en Torremolinos: ${property}\n\nFechas: ${dates}\nPrecio total: ${price}\n\nPuedes verlo aquí:`,
    cal_copy_success: "¡Enlace copiado al portapapeles!",
    pol_title: "Condiciones de reserva",
    pol_cancellation_title: "Política de cancelación",
    pol_cancellation_desc: "Cancelación gratuita hasta 14 días antes de la llegada. Si cancelas posteriormente, se retendrá el depósito de reserva.",
    pol_payment_title: "Pago y Reserva",
    pol_payment_desc: "La reserva se bloquea durante 24 horas. Si no se ha efectuado el pago en ese plazo, se liberarán las fechas y se anulará cualquier oferta que se hubiera aplicado.",
    pol_contact_title: "¿Tienes alguna duda?",
    pol_contact_desc: "Ponte en contacto con nosotros para cualquier consulta antes de reservar.",
    footer_rights: "Todos los derechos reservados.",
    footer_whatsapp: "Contacta por WhatsApp",
    footer_whatsapp_msg: "Hola, escribo para solicitar información sobre el piso en Centro comercial España",
    month_jan: "Enero", month_feb: "Febrero", month_mar: "Marzo",
    month_apr: "Abril", month_may: "Mayo", month_jun: "Junio",
    month_jul: "Julio", month_aug: "Agosto", month_sep: "Septiembre",
    month_oct: "Octubre", month_nov: "Noviembre", month_dec: "Diciembre",
    img_btn_show_all: "Mostrar todas las fotos",
    img_gallery_title: "Ruta fotográfica",
    img_btn_share: "Compartir",
    img_gallery_photo: "Foto",
    map_title: "¿Dónde dormirás?",
    host_title: "Conoce a tu anfitrión",
    host_superhost: "Superanfitrión",
    host_study: "Estudió en: Universidad",
    host_contact_btn: "Escribe al anfitrión",
    host_protection: "Para proteger tus pagos, utiliza siempre canales seguros para transferir dinero y comunicarte con nosotros.",
    app_property_title: "Alojamiento entero: apartamento en Torremolinos, España",
    app_property_specs: "4 viajeros · 2 dormitorios · 2 camas · 1 sofá-cama · 1 baño",
    pol_rules_title: "Normas de la casa",
    pol_rules_desc: "Llegada a partir de las 15:00<br>Salida antes de las 12:00<br>Máximo 4 viajeros",
    img_title_1: "Salón principal",
    img_title_2: "Baño moderno",
    img_title_3: "Vistas exteriores",
    img_title_4: "Cocina equipada",
    img_title_5: "Detalle baño",
    img_title_6: "Zona de salón",
    img_title_7: "Dormitorio acogedor",
    img_title_8: "Dormitorio principal",
    seo_title: "Alquiler Torremolinos | Apartamento Vacacional en la Costa del Sol",
    seo_description: "Reserva tu alquiler vacacional en Torremolinos. Apartamento moderno en el centro, cerca de la playa, con Wi-Fi, Aire Acondicionado y máxima comodidad. ¡Mejor precio garantizado!",
    seo_keywords: "alquiler torremolinos, vacaciones torremolinos, apartamento vacacional costa del sol, alojamiento torremolinos centro, alquilar apartamento torremolinos playa",
    host_qualities_ivan: "Alegre, cuidadoso, atento",
    host_qualities_other: "Alegre, puntual, simpática",
    wa_hello: "Hola",
    wa_request_prefix: "se ha solicitado la reserva para el alojamiento ubicado en",
    wa_would_like: "me gustaría reservar el alojamiento en",
    wa_date_to: "al",
    wa_translation_prefix: "Traducción al español para el anfitrión:"
  },
  en: {
    nav_brand: "Torremolinos Rental",
    hero_title: "Holiday Rental Torremolinos",
    prop_about: "About this place",
    prop_host_prefix: "Host",
    prop_host_description: "Hello! I'm Iván, an engineer by profession, athlete, and travel lover. I recently decided to renovate and prepare my accommodations with great care to embark on the world of tourist rentals and offer quality stays. I am an outgoing, cheerful person with a sense of humor. I am available to help make your stay exceed your expectations and be as pleasant as possible. I look forward to hosting you soon!",
    host_languages: "Languages spoken: English, Spanish, German",
    prop_read_more: "Read more",
    prop_show_less: "Show less",
    prop_location: "Next to San Miguel street, Torremolinos, Málaga",
    prop_description: "A bright and modern two-bedroom apartment located in the heart of Torremolinos, just two minutes from the train station. Situated in a quiet pedestrian area, this charming home combines Mediterranean style with contemporary design. It is located on the second floor of a building and has been recently renovated with high-quality materials. It features an equipped kitchen (oven, microwave, ceramic hob), a spacious air-conditioned living room, and a balcony overlooking a picturesque local square.",
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
    amen_coffee: "Nespresso Coffee Maker",
    amen_microwave: "Microwave with grill",
    amen_kettle: "Water Kettle",
    amen_toaster: "Toaster",
    amen_essentials: "Salt, oil, and sugar",
    amen_hairdryer: "Hair dryer",
    amen_toiletry: "Shampoo and shower gel",
    amen_iron: "Clothing iron",
    amen_blackout: "Shutters (Total darkness)",
    amen_smart_tv: "65\" Smart TV (Netflix, Prime, Disney+)",
    amen_firstaid: "First aid kit",
    amen_no_elevator: "No elevator (Second floor)",
    amen_checkin: "Personal or self check-in",
    amen_btn_show_all: (count) => `Show all ${count} amenities`,
    amen_modal_title: "What this place offers",
    cal_title: "Reservations",
    cal_legend_available: "Available",
    cal_legend_occupied: "Occupied",
    cal_btn_whatsapp: "Book via WhatsApp",
    cal_loading: "Loading...",
    cal_summary_nights: "nights",
    cal_summary_total: "Total price",
    cal_summary_title: "Booking summary",
    cal_summary_dates: "Dates",
    cal_summary_checkin: "Check-in",
    cal_summary_checkout: "Check-out",
    cal_summary_select_checkout: "Select check-out date",
    cal_summary_reset: "Clear selection",
    cal_err_min_nights: (reserved, min) => `You are reserving ${reserved} nights. Minimum stay for these dates is ${min} nights`,
    cal_err_overlap: "The selected dates contain unavailable days.",
    cal_suggested_dates: "Suggested alternative dates:",
    cal_summary_subtotal: "Subtotal",
    cal_summary_discount_weekly: "Weekly discount",
    cal_summary_discount_monthly: "Long stay discount",
    cal_err_max_nights_msg: "Stays longer than 30 days cannot be booked online. Please contact us directly for long-term stays.",
    cal_err_date_limit_msg: "Bookings beyond September 30th are not available online. Please contact us to check future availability.",
    cal_wa_limit_msg: (date) => `Hello, I would like to book for these dates: ${date}`,
    cal_summary_discount_early: "Early bird discount",
    cal_summary_discount_early_info: "If the reservation is cancelled or modified, this discount will be lost.",
    cal_summary_deposit: (percent) => `Booking deposit (${percent}%)`,
    cal_summary_deposit_info: "To guarantee your booking, the deposit payment must be completed within 24 hours. Otherwise, the dates will be released.",
    cal_btn_share: "Share booking",
    cal_share_title: "Check out this accommodation in Torremolinos",
    cal_share_text: (property, dates, price) => `I found this accommodation in Torremolinos: ${property}\n\nDates: ${dates}\nTotal price: ${price}\n\nYou can see it here:`,
    cal_copy_success: "Link copied to clipboard!",
    pol_title: "Booking Conditions",
    pol_cancellation_title: "Cancellation Policy",
    pol_cancellation_desc: "Free cancellation up to 14 days before arrival. If you cancel later, the booking deposit will be retained.",
    pol_payment_title: "Payment and Reservation",
    pol_payment_desc: "The reservation is held for 24 hours. If payment is not made within this period, the dates will be released and any applied offers will be canceled.",
    pol_contact_title: "Do you have any doubts?",
    pol_contact_desc: "Contact us for any questions before booking.",
    footer_rights: "All rights reserved.",
    footer_whatsapp: "Contact via WhatsApp",
    footer_whatsapp_msg: "Hello, I am writing to request information about the apartment at Centro comercial España",
    month_jan: "January", month_feb: "February", month_mar: "March",
    month_apr: "April", month_may: "May", month_jun: "June",
    month_jul: "July", month_aug: "August", month_sep: "September",
    month_oct: "October", month_nov: "November", month_dec: "December",
    img_btn_show_all: "Show all photos",
    img_gallery_title: "Photo Tour",
    img_btn_share: "Share",
    img_gallery_photo: "Photo",
    map_title: "Where you'll sleep",
    host_title: "Meet your host",
    host_superhost: "Superhost",
    host_study: "Studied at: University",
    host_contact_btn: "Message host",
    host_protection: "To protect your payment, never transfer money or communicate outside of the Airbnb website.",
    app_property_title: "Entire rental unit in Torremolinos, Spain",
    app_property_specs: "4 guests · 2 bedrooms · 2 beds · 1 sofa-bed · 1 bath",
    pol_rules_title: "House rules",
    pol_rules_desc: "Check-in after 15:00<br>Checkout before 12:00<br>4 guests maximum",
    img_title_1: "Main lounge",
    img_title_2: "Modern bathroom",
    img_title_3: "Exterior views",
    img_title_4: "Equipped kitchen",
    img_title_5: "Bathroom detail",
    img_title_6: "Living area",
    img_title_7: "Cozy bedroom",
    img_title_8: "Master bedroom",
    seo_title: "Torremolinos Holiday Rental | Luxury Vacation Apartment",
    seo_description: "Book your holiday rental in Torremolinos. Modern city center apartment near the beach, with Wi-Fi, AC, and premium comfort. Best price guaranteed!",
    seo_keywords: "torremolinos holiday rental, torremolinos vacation apartment, holiday accommodation torremolinos, rent apartment torremolinos beach, costa del sol holiday",
    host_qualities_ivan: "Cheerful, careful, attentive",
    host_qualities_other: "Cheerful, punctual, nice",
    wa_hello: "Hello",
    wa_request_prefix: "a reservation has been requested for the accommodation located at",
    wa_would_like: "I would like to book the accommodation at",
    wa_date_to: "to",
    wa_translation_prefix: "Spanish translation for the host:"
  },
  de: {
    nav_brand: "Ferienwohnung Torremolinos",
    hero_title: "Ferienwohnung Torremolinos",
    prop_about: "Über diesen Ort",
    prop_host_prefix: "Gastgeber",
    prop_host_description: "Hallo! Ich bin Iván, von Beruf Ingenieur, Sportler und reiselustig. Ich habe vor kurzem beschlossen, meine Unterkünfte mit viel Liebe zu renovieren und vorzubereiten, um in die Welt der Ferienvermietung einzusteigen und Qualitätsaufenthalte anzubieten. Ich bin ein aufgeschlossener, fröhlicher Mensch mit Sinn für Humor. Ich stehe Ihnen zur Verfügung, um Ihnen zu helfen, dass Ihr Aufenthalt Ihre Erwartungen übertrifft und so angenehm wie möglich ist. Ich freue mich darauf, Sie bald begrüßen zu dürfen!",
    host_languages: "Gesprochene Sprachen: Englisch, Spanisch, Deutsch",
    prop_read_more: "Mehr lesen",
    prop_show_less: "Weniger anzeigen",
    prop_location: "Neben der Straße San Miguel, Torremolinos, Málaga",
    prop_description: "Ein helles und modernes Apartment mit zwei Schlafzimmern im Herzen von Torremolinos, nur zwei Minuten vom Bahnhof entfernt. In einer ruhigen Fußgängerzone gelegen, kombiniert dieses charmante Zuhause mediterranen Stil mit modernem Design. Es befindet sich im zweiten Stock eines Gebäudes und wurde kürzlich mit hochwertigen Materialien renoviert. Es verfügt über eine ausgestattete Küche (Backofen, Mikrowelle, Cerankochfeld), ein geräumiges, klimatisiertes Wohnzimmer und einen Balkon mit Blick auf einen malerischen lokalen Platz.",
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
    amen_coffee: "Nespresso-Kaffeemaschine",
    amen_microwave: "Mikrowelle mit Grill",
    amen_kettle: "Wasserkocher",
    amen_toaster: "Toaster",
    amen_essentials: "Salz, Öl und Zucker",
    amen_hairdryer: "Haartrockner",
    amen_toiletry: "Shampoo und Duschgel",
    amen_iron: "Bügeleisen",
    amen_blackout: "Rollläden (totale Dunkelheit)",
    amen_smart_tv: "65\" Smart-TV (Netflix, Prime, Disney+)",
    amen_firstaid: "Erste-Hilfe-Kasten",
    amen_no_elevator: "Kein Aufzug (Zweiter Stock)",
    amen_checkin: "Persönlicher oder Check-in am Automaten",
    amen_btn_show_all: (count) => `Alle ${count} Ausstattungsmerkmale anzeigen`,
    amen_modal_title: "Was dieser Ort bietet",
    cal_title: "Buchungen",
    cal_legend_available: "Verfügbar",
    cal_legend_occupied: "Belegt",
    cal_btn_whatsapp: "Über WhatsApp buchen",
    cal_loading: "Wird geladen...",
    cal_summary_nights: "Nächte",
    cal_summary_total: "Gesamtpreis",
    cal_summary_title: "Buchungsübersicht",
    cal_summary_dates: "Daten",
    cal_summary_checkin: "Anreise",
    cal_summary_checkout: "Abreise",
    cal_summary_select_checkout: "Wählen Sie das Abreisedatum",
    cal_summary_reset: "Auswahl löschen",
    cal_err_min_nights: (reserved, min) => `Sie reservieren ${reserved} Nächte. Der Mindestaufenthalt für diese Daten beträgt ${min} Nächte`,
    cal_err_overlap: "Die ausgewählten Daten enthalten nicht verfügbare Tage.",
    cal_suggested_dates: "Vorgeschlagene alternative Daten:",
    cal_summary_subtotal: "Zwischensumme",
    cal_summary_discount_weekly: "Wochenrabatt",
    cal_summary_discount_monthly: "Langzeitrabatt",
    cal_err_max_nights_msg: "Aufenthalte von mehr als 30 Tagen können nicht online gebucht werden. Bitte kontaktieren Sie uns direkt für Langzeitaufenthalte.",
    cal_err_date_limit_msg: "Buchungen über den 30. September hinaus sind online nicht möglich. Bitte kontaktieren Sie uns, um die zukünftige Verfügbarkeit zu prüfen.",
    cal_wa_limit_msg: (date) => `Hallo, ich möchte für diese Termine buchen: ${date}`,
    cal_summary_discount_early: "Frühbucherrabatt",
    cal_summary_discount_early_info: "Wenn die Reservierung storniert oder geändert wird, geht dieser Rabatt verloren.",
    cal_summary_deposit: (percent) => `Buchungsanzahlung (${percent}%)`,
    cal_summary_deposit_info: "Um Ihre Buchung zu garantieren, muss die Anzahlung innerhalb von 24 Stunden erfolgen. Andernfalls werden die Termine wieder freigegeben.",
    cal_btn_share: "Reservierung teilen",
    cal_share_title: "Schau dir diese Unterkunft in Torremolinos an",
    cal_share_text: (property, dates, price) => `Ich habe diese Unterkunft in Torremolinos gefunden: ${property}\n\nDaten: ${dates}\nGesamtpreis: ${price}\n\nHier kannst du sie sehen:`,
    cal_copy_success: "Link in die Zwischenablage kopiert!",
    pol_title: "Buchungsbedingungen",
    pol_cancellation_title: "Stornierungsbedingungen",
    pol_cancellation_desc: "Kostenlose Stornierung bis 14 Tage vor Anreise. Bei späterer Stornierung wird die Buchungskaution einbehalten.",
    pol_payment_title: "Zahlung und Reservierung",
    pol_payment_desc: "Die Reservierung wird für 24 Stunden gehalten. Wenn die Zahlung nicht innerhalb dieses Zeitraums erfolgt, werden die Daten freigegeben und alle angewendeten Angebote storniert.",
    pol_contact_title: "Haben Sie Fragen?",
    pol_contact_desc: "Kontaktieren Sie uns bei Fragen, bevor Sie buchen.",
    footer_rights: "Alle Rechte vorbehalten.",
    footer_whatsapp: "Kontakt über WhatsApp",
    footer_whatsapp_msg: "Hallo, ich schreibe, um Informationen über die Wohnung im Centro comercial España anzufordern",
    month_jan: "Januar", month_feb: "Februar", month_mar: "März",
    month_apr: "April", month_may: "Mai", month_jun: "Juni",
    month_jul: "Juli", month_aug: "August", month_sep: "September",
    month_oct: "Oktober", month_nov: "November", month_dec: "Dezember",
    img_btn_show_all: "Alle Fotos anzeigen",
    img_gallery_title: "Fototour",
    img_btn_share: "Teilen",
    img_gallery_photo: "Foto",
    map_title: "Wo du schlafen wirst",
    host_title: "Lerne deinen Gastgeber kennen",
    host_superhost: "Superhost",
    host_study: "Hat studiert an: Universität",
    host_contact_btn: "Nachricht an den Gastgeber",
    host_protection: "Um deine Zahlungen zu schützen, solltest du niemals außerhalb der Website kommunizieren oer Geld überweisen.",
    app_property_title: "Ganze Mieteinheit in Torremolinos, Spanien",
    app_property_specs: "4 Gäste · 2 Schlafzimmer · 2 Betten · 1 Schlafsofa · 1 Badezimmer",
    pol_rules_title: "Hausregeln",
    pol_rules_desc: "Check-in ab 15:00<br>Check-out vor 12:00<br>Maximal 4 Gäste",
    img_title_1: "Hauptwohnzimmer",
    img_title_2: "Modernes Bad",
    img_title_3: "Außenansicht",
    img_title_4: "Ausgestattete Küche",
    img_title_5: "Badezimmer-Detail",
    img_title_6: "Wohnbereich",
    img_title_7: "Gemütliches Zimmer",
    img_title_8: "Hauptschlafzimmer",
    seo_title: "Ferienwohnung Torremolinos | Luxus-Urlaubsapartment mieten",
    seo_description: "Buchen Sie Ihre Ferienwohnung in Torremolinos. Modernes Apartment im Zentrum nahe dem Strand, mit WLAN, Klimaanlage und höchstem Komfort. Bestpreis garantiert!",
    seo_keywords: "ferienwohnung torremolinos, torremolinos urlaub, apartment mieten torremolinos, torremolinos ferienunterkunft, costa del sol urlaubsapartment",
    host_qualities_ivan: "Fröhlich, sorgfältig, aufmerksam",
    host_qualities_other: "Fröhlich, pünktlich, sympathisch",
    wa_hello: "Hallo",
    wa_request_prefix: "eine Reservierung wurde für die Unterkunft in angefordert",
    wa_would_like: "ich möchte die Unterkunft in buchen",
    wa_date_to: "bis",
    wa_translation_prefix: "Spanische Übersetzung für den Gastgeber:"
  },
  fr: {
    nav_brand: "Location Torremolinos",
    hero_title: "Location Vacances Torremolinos",
    prop_about: "À propos de ce logement",
    prop_host_prefix: "Hôte",
    prop_host_description: "Bonjour ! Je suis Iván, ingénieur de profession, sportif et amateur de voyages. J'ai récemment décidé de rénover et de préparer mes logements avec beaucoup d'affection pour me lancer dans le monde de la location touristique et proposer des séjours de qualité. Je suis une personne extravertie, souriante et avec le sens de l'humour. Je suis disponible pour vous aider à ce que votre séjour dépasse vos attentes et soit le plus agréable possible. J'espère vous recevoir bientôt !",
    host_languages: "Langues parlées : Anglais, Espagnol, Allemand",
    prop_read_more: "Lire la suite",
    prop_show_less: "Afficher moins",
    prop_location: "À côté de la rue San Miguel, Torremolinos, Málaga",
    prop_description: "Un appartement de deux chambres lumineux et moderne situé au cœur de Torremolinos, à seulement deux minutes de la gare. Située dans une zone piétonne calme, cette charmante maison combine le style méditerranéen avec un design contemporain. Il est situé au deuxième étage d'un bâtiment et a été récemment rénové avec des matériaux de haute qualité. Il dispose d'une cuisine équipée (four, micro-ondes, plaque vitrocéramique), d'un salon climatisé spacieux et d'un balcon donnant sur une place locale pittoresque.",
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
    amen_coffee: "Machine à café Nespresso",
    amen_microwave: "Micro-ondes avec grill",
    amen_kettle: "Bouilloire électrique",
    amen_toaster: "Grille-pain",
    amen_essentials: "Sel, huile et sucre",
    amen_hairdryer: "Sèche-cheveux",
    amen_toiletry: "Shampooing et gel douche",
    amen_iron: "Fer à repasser",
    amen_blackout: "Volets (obscurité totale)",
    amen_smart_tv: "Smart TV 65\" (Netflix, Prime, Disney+)",
    amen_firstaid: "Trousse de premiers secours",
    amen_no_elevator: "Pas d'ascenseur (Deuxième étage)",
    amen_checkin: "Arrivée personnelle ou autonome",
    amen_btn_show_all: (count) => `Afficher les ${count} équipements`,
    amen_modal_title: "Ce que ce logement propose",
    cal_title: "Réservations",
    cal_legend_available: "Disponible",
    cal_legend_occupied: "Occupé",
    cal_btn_whatsapp: "Réserver par WhatsApp",
    cal_loading: "Chargement...",
    cal_summary_nights: "nuits",
    cal_summary_total: "Prix total",
    cal_summary_title: "Résumé de la réservation",
    cal_summary_dates: "Dates",
    cal_summary_checkin: "Arrivée",
    cal_summary_checkout: "Départ",
    cal_summary_select_checkout: "Sélectionnez la date de départ",
    cal_summary_reset: "Effacer la sélection",
    cal_err_min_nights: (reserved, min) => `Vous réservez ${reserved} nuits. Le séjour minimum à ces dates est de ${min} nuits`,
    cal_err_overlap: "Les dates sélectionnées contiennent des jours non disponibles.",
    cal_suggested_dates: "Dates alternatives suggérées :",
    cal_summary_subtotal: "Sous-total",
    cal_summary_discount_weekly: "Remise hebdomadaire",
    cal_summary_discount_monthly: "Remise longue durée",
    cal_err_max_nights_msg: "Les séjours de plus de 30 jours ne peuvent pas être réservés en ligne. Veuillez nous contacter directement pour les longs séjours.",
    cal_err_date_limit_msg: "Les réservations au-delà du 30 septembre ne sont pas disponibles en ligne. Veuillez nous contacter pour vérifier la disponibilité future.",
    cal_wa_limit_msg: (date) => `Bonjour, je souhaite réserver pour ces dates : ${date}`,
    cal_summary_discount_early: "Remise réservation anticipée",
    cal_summary_discount_early_info: "Si la réservation est annulée ou modifiée, cette remise sera perdue.",
    cal_summary_deposit: (percent) => `Acompte de réservation (${percent}%)`,
    cal_summary_deposit_info: "Pour garantir votre réservation, le paiement de l'acompte doit être effectué dans les 24 heures. Dans le cas contraire, les dates seront remises en disponibilité.",
    cal_btn_share: "Partager la réservation",
    cal_share_title: "Regardez ce logement à Torremolinos",
    cal_share_text: (property, dates, price) => `J'ai trouvé ce logement à Torremolinos : ${property}\n\nDates : ${dates}\nPrix total : ${price}\n\nVous pouvez le voir ici :`,
    cal_copy_success: "Lien copié dans le presse-papiers !",
    pol_title: "Conditions de réservation",
    pol_cancellation_title: "Conditions d'annulation",
    pol_cancellation_desc: "Annulation gratuite jusqu'à 14 jours avant l'arrivée. Si vous annulez plus tard, l'acompte de réservation sera conservé.",
    pol_payment_title: "Paiement et Réservation",
    pol_payment_desc: "La réservation est bloquée pendant 24 heures. Si le paiement n'est pas effectué pendant cette période, les dates seront libérées et toute offre appliquée sera annulée.",
    pol_contact_title: "Vous avez des doutes ?",
    pol_contact_desc: "Contactez-nous pour toute question avant de réserver.",
    footer_rights: "Tous droits réservés.",
    footer_whatsapp: "Contactez sur WhatsApp",
    footer_whatsapp_msg: "Bonjour, je vous écris pour demander des informations sur l'appartement au Centro comercial España",
    month_jan: "Janvier", month_feb: "Février", month_mar: "Mars",
    month_apr: "Avril", month_may: "Mai", month_jun: "Juin",
    month_jul: "Juillet", month_aug: "Août", month_sep: "Septembre",
    month_oct: "Octobre", month_nov: "Novembre", month_dec: "Décembre",
    img_btn_show_all: "Afficher toutes les photos",
    img_gallery_title: "Visite en photos",
    img_btn_share: "Partager",
    img_gallery_photo: "Photo",
    map_title: "Où vous dormirez",
    host_title: "Rencontrez votre hôte",
    host_superhost: "Superhôte",
    host_study: "A étudié : Université",
    host_contact_btn: "Contacter l'hôte",
    host_protection: "Pour protéger vos paiements, ne transférez jamais d'argent en dehors du site.",
    app_property_title: "Logement entier à Torremolinos, Espagne",
    app_property_specs: "4 voyageurs · 2 chambres · 2 lits · 1 canapé-lit · 1 salle de bain",
    pol_rules_title: "Règlement intérieur",
    pol_rules_desc: "Arrivée après 15:00<br>Départ avant 12:00<br>4 voyageurs maximum",
    img_title_1: "Salon principal",
    img_title_2: "Salle de bain",
    img_title_3: "Vues extérieures",
    img_title_4: "Cuisine équipée",
    img_title_5: "Détail salle de bain",
    img_title_6: "Espace salon",
    img_title_7: "Chambre douillette",
    img_title_8: "Chambre principale",
    seo_title: "Location Torremolinos | Appartement de Vacances de Luxe",
    seo_description: "Réservez votre location de vacances à Torremolinos. Appartement moderne au centre-ville près de la plage, avec Wi-Fi, clim et confort premium. Meilleur prix garanti !",
    seo_keywords: "location torremolinos, vacances torremolinos, appartement vacances torremolinos, louer appartement torremolinos plage, côte du soleil vacances",
    host_qualities_ivan: "Joyeux, soigneux, attentif",
    host_qualities_other: "Joyeux, ponctuel, sympathique",
    wa_hello: "Bonjour",
    wa_request_prefix: "une réservation a été demandée pour l'hébergement situé à",
    wa_would_like: "je souhaiterais réserver l'hébergement à",
    wa_date_to: "au",
    wa_translation_prefix: "Traduction en espagnol pour l'hôte :"
  },
  nl: {
    nav_brand: "Verhuur Torremolinos",
    hero_title: "Vakantiehuis Torremolinos",
    prop_about: "Over deze plek",
    prop_host_prefix: "Host",
    prop_host_description: "Hallo! Ik ben Iván, ingenieur van beroep, atleet en reisliefhebber. Ik heb onlangs besloten om mijn accommodaties met veel liefde te renoveren en voor te bereiden om de wereld van de toeristische verhuur te betreden en kwaliteitsverblijven aan te bieden. Ik ben een extravert, vrolijk persoon met gevoel voor humor. Ik ben beschikbaar om je verblijf je verwachtingen te laten overtreffen en het zo aangenaam mogelijk te maken. Ik hoop je snel te mogen verwelkomen!",
    host_languages: "Gesproken talen: Engels, Spaans, Duits",
    prop_read_more: "Lees meer",
    prop_show_less: "Toon minder",
    prop_location: "Naast de straat San Miguel, Torremolinos, Málaga",
    prop_description: "Een licht en modern appartement met twee slaapkamers gelegen in het hart van Torremolinos, op slechts twee minuten van het treinstation. Gelegen in een rustig voetgangersgebied, combineert dit charmante huis een mediterrane stijl met een eigentijds design. Het bevindt zich op de tweede verdieping van een gebouw en is onlangs gerenoveerd met hoogwaardige materialen. Het beschikt over een uitgeruste keuken (oven, magnetron, keramische kookplaat), een ruime woonkamer met airconditioning en een balkon met uitzicht op een schilderachtig lokaal plein.",
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
    amen_coffee: "Nespresso-koffiezetapparaat",
    amen_microwave: "Magnetron met grill",
    amen_kettle: "Waterkoker",
    amen_toaster: "Broodrooster",
    amen_essentials: "Zout, olie en suiker",
    amen_hairdryer: "Haardroger",
    amen_toiletry: "Shampoo en douchegel",
    amen_iron: "Strijkijzer",
    amen_blackout: "Rolluiken (volledige duisternis)",
    amen_smart_tv: "65\" Smart-TV (Netflix, Prime, Disney+)",
    amen_firstaid: "Eerste hulp kit",
    amen_no_elevator: "Geen lift (Tweede verdieping)",
    amen_checkin: "Persoonlijke of zelf inchecken",
    amen_btn_show_all: (count) => `Alle ${count} voorzieningen tonen`,
    amen_modal_title: "Wat deze plek biedt",
    cal_title: "Reserveringen",
    cal_legend_available: "Beschikbaar",
    cal_legend_occupied: "Bezet",
    cal_btn_whatsapp: "Boeken via WhatsApp",
    cal_loading: "Laden...",
    cal_summary_nights: "nachten",
    cal_summary_total: "Totale prijs",
    cal_summary_title: "Boekingssamenvatting",
    cal_summary_dates: "Data",
    cal_summary_checkin: "Inchecken",
    cal_summary_checkout: "Uitchecken",
    cal_summary_select_checkout: "Selecteer uitcheckdatum",
    cal_summary_reset: "Selectie wissen",
    cal_err_min_nights: (reserved, min) => `U reserveert ${reserved} nachten. Minimum verblijf voor deze data is ${min} nachten`,
    cal_err_overlap: "De geselecteerde data bevatten onbeschikbare dagen.",
    cal_suggested_dates: "Voorgestelde alternatieve data:",
    cal_summary_subtotal: "Subtotaal",
    cal_summary_discount_weekly: "Weekkorting",
    cal_summary_discount_monthly: "Lange verblijfskorting",
    cal_err_max_nights_msg: "Verblijven langer dan 30 dagen kunnen niet online worden geboekt. Neem rechtstreeks contact met ons op voor een lang verblijf.",
    cal_err_date_limit_msg: "Boekingen na 30 september zijn niet online beschikbaar. Neem contact met ons op om toekomstige beschikbaarheid te controleren.",
    cal_wa_limit_msg: (date) => `Hallo, ik wil graag boeken voor deze data: ${date}`,
    cal_summary_discount_early: "Vroegboekkorting",
    cal_summary_discount_early_info: "Als de reservering wordt geannuleerd of gewijzigd, komt deze korting te vervallen.",
    cal_summary_deposit: (percent) => `Boekingsaanbetaling (${percent}%)`,
    cal_summary_deposit_info: "Om uw boeking te garanderen, moet de aanbetaling binnen 24 uur worden voldaan. Anders worden de data weer vrijgegeven.",
    cal_btn_share: "Reservering delen",
    cal_share_title: "Bekijk deze accommodatie in Torremolinos",
    cal_share_text: (property, dates, price) => `Ik heb deze accommodatie in Torremolinos gevonden: ${property}\n\nData: ${dates}\nTotale prijs: ${price}\n\nJe kunt het hier bekijken:`,
    cal_copy_success: "Link gekopieerd naar klembord!",
    pol_title: "Boekingsvoorwaarden",
    pol_cancellation_title: "Annuleringsvoorwaarden",
    pol_cancellation_desc: "Gratis annuleren tot 14 dagen voor aankomst. Als u later annuleert, wordt de boekingsaanbetaling ingehouden.",
    pol_payment_title: "Betaling en Reservering",
    pol_payment_desc: "De reservering wordt 24 uur vastgehouden. Als de betaling niet binnen deze periode is voldaan, worden de data vrijgegeven en worden eventueel toegepaste aanbiedingen geannuleerd.",
    pol_contact_title: "Heeft u nog vragen?",
    pol_contact_desc: "Neem voor het boeken contact met ons op voor eventuele vragen.",
    footer_rights: "Alle rechten voorbehouden.",
    footer_whatsapp: "Contact via WhatsApp",
    footer_whatsapp_msg: "Hallo, ik schrijf om informatie op te vragen over het vakantiehuis",
    month_jan: "Januari", month_feb: "Februari", month_mar: "Maart",
    month_apr: "April", month_may: "Mei", month_jun: "Juni",
    month_jul: "Juli", month_aug: "Augustus", month_sep: "September",
    month_oct: "Oktober", month_nov: "November", month_dec: "December",
    img_btn_show_all: "Alle foto's bekijken",
    img_gallery_title: "Fototour",
    img_btn_share: "Delen",
    img_gallery_photo: "Foto",
    map_title: "Waar je zult slapen",
    host_title: "Maak kennis met je host",
    host_superhost: "Superhost",
    host_study: "Heeft gestudeerd: Universiteit",
    host_contact_btn: "Contact met de host",
    host_protection: "Om je betaling te beschermen, raden we je aan om altijd via de website te communiceren en te betalen.",
    app_property_title: "Gehele huurwoning in Torremolinos, Spanje",
    app_property_specs: "4 gasten · 2 slaapkamers · 2 bedden · 1 slaapbank · 1 badkamer",
    pol_rules_title: "Huisregels",
    pol_rules_desc: "Inchecken na 15:00<br>Uitchecken voor 12:00<br>Maximaal 4 gasten",
    img_title_1: "Woonkamer",
    img_title_2: "Moderne badkamer",
    img_title_3: "Uitzicht buiten",
    img_title_4: "Keuken",
    img_title_5: "Detail badkamer",
    img_title_6: "Zithoek",
    img_title_7: "Gezellige kamer",
    img_title_8: "Hoofdslaapkamer",
    seo_title: "Vakantiehuis Torremolinos | Luxe Vakantieappartement huren",
    seo_description: "Boek uw vakantiehuis in Torremolinos. Modern appartement in het centrum nabij het strand, met Wi-Fi, airconditioning en premium comfort. Beste prijs gegarandeerd!",
    seo_keywords: "vakantiehuis torremolinos, torremolinos vakantie, appartement huren torremolinos, vakantie accommodatie torremolinos, costa del sol vakantie",
    host_qualities_ivan: "Vrolijk, zorgvuldig, attent",
    host_qualities_other: "Vrolijk, punctueel, sympathiek",
    wa_hello: "Hallo",
    wa_request_prefix: "er is een reservering aangevraagd voor de accommodatie in",
    wa_would_like: "ik zou graag de accommodatie in willen boeken",
    wa_date_to: "tot",
    wa_translation_prefix: "Spaanse vertaling voor de gastheer:"
  },
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
    this.updateMetadata();
  }

  static get l() {
    return translations[this._currentLang];
  }

  static getLabelsFor(lang: Language) {
    return translations[lang];
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
    this.updateMetadata();
    window.dispatchEvent(new CustomEvent('language-changed', { detail: lang }));
  }

  static updateMetadata() {
    const labels = this.l;
    
    // Update Title
    document.title = labels.seo_title;
    
    // Update Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', labels.seo_description);
    }
    
    // Update Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', labels.seo_keywords);
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', labels.seo_title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', labels.seo_description);

    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', labels.seo_title);

    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', labels.seo_description);

    // Update HTML lang attribute
    document.documentElement.lang = this._currentLang;
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
      'bi-snow': this.l.amen_ac,
      'bi-cup-hot': this.l.amen_coffee,
      'bi-pip': this.l.amen_microwave,
      'bi-cup': this.l.amen_kettle,
      'bi-grid': this.l.amen_toaster,
      'bi-egg-fried': this.l.amen_essentials,
      'bi-wind': this.l.amen_hairdryer,
      'bi-droplet': this.l.amen_toiletry,
      'bi-thermometer-half': this.l.amen_iron,
      'bi-moon': this.l.amen_blackout,
      'bi-tv': this.l.amen_smart_tv,
      'bi-plus-square': this.l.amen_firstaid,
      'bi-arrow-down-up': this.l.amen_no_elevator,
      'bi-key': this.l.amen_checkin,
      'bi-heart': this.l.amen_pets,
      'bi-water': this.l.amen_washer,
      'bi-door-open': this.l.amen_balcony,
      'bi-car-front': this.l.amen_parking,
    };
    return map[key] || key;
  }
}
