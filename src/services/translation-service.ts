export type Language = string;

export interface Labels {
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
  cal_share_text: (property: string, dates: string) => string;
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
  // Months
  month_jan: string; month_feb: string; month_mar: string;
  month_apr: string; month_may: string; month_jun: string;
  month_jul: string; month_aug: string; month_sep: string;
  month_oct: string; month_nov: string; month_dec: string;
  img_btn_show_all: string;
  img_btn_close: string;
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
  img_title_9: string;
  // SEO
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  // Host qualities
  host_qualities_ivan: string;
  host_qualities_other: string;
  // WhatsApp & Helpers
  wa_hello: string;
  wa_request_prefix: string;
  wa_would_like: string;
  wa_date_to: string;
  wa_translation_prefix: string;
  wa_client_detail: string;
}

// Dynamically load all language modules in src/services/languages/
const modules = (import.meta as any).glob('./languages/translation-*.ts', { eager: true }) as Record<string, {
  code: string;
  name: string;
  flag: string;
  labels: Labels;
}>;

const translations: Record<string, Labels> = {};
const supportedLanguages: Array<{ code: string; name: string; flag: string }> = [];

for (const path in modules) {
  const mod = modules[path];
  translations[mod.code] = mod.labels;
  supportedLanguages.push({
    code: mod.code,
    name: mod.name,
    flag: mod.flag
  });
}

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
    return translations[this._currentLang] || translations['en'];
  }

  static getLabelsFor(lang: Language) {
    return translations[lang] || translations['en'];
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
    const priority = ['es', 'en'];
    return [...supportedLanguages].sort((a, b) => {
      const idxA = priority.indexOf(a.code);
      const idxB = priority.indexOf(b.code);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.name.localeCompare(b.name);
    });
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

  static formatWhatsAppMessage(messageSelected: string, messageEs: string): string {
    if (this._currentLang === 'es') {
      return messageEs;
    }
    const label = this.l.wa_client_detail;
    return `${messageEs}\n\n---\n${label}\n${messageSelected}`;
  }
}
