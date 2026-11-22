/**
 * Expert-level Analytics Service for Google Analytics 4.
 * Uses standard GA4 events and custom engagement tracking.
 */
export class AnalyticsService {
  
  /**
   * Generic event tracker with safety check
   */
  static trackEvent(eventName: string, params: Record<string, any> = {}) {
    if ((window as any).gtag) {
      // Add common parameters like timestamp or page context if needed
      (window as any).gtag('event', eventName, {
        ...params,
        page_location: window.location.href,
        send_to: 'G-5RT7VZETN8'
      });
    }
  }

  /**
   * Track main conversion: WhatsApp Lead
   * Uses 'generate_lead' (standard GA4)
   */
  static trackLead(value: number = 0, nights: number = 0) {
    this.trackEvent('generate_lead', {
      value: value,
      currency: 'EUR',
      nights: nights,
      item_name: 'Estancia en Torremolinos Centro',
      method: 'WhatsApp'
    });
  }

  /**
   * Track when users see the property details
   * Uses 'view_item' (standard GA4 for e-commerce/leads)
   */
  static trackPropertyView() {
    this.trackEvent('view_item', {
      currency: 'EUR',
      value: 0,
      items: [{
        item_id: 'APT_TORREMOLINOS_1',
        item_name: 'Apartamento Centro Torremolinos',
        item_category: 'Vacation Rental'
      }]
    });
  }

  /**
   * Track Date Interactivity
   * Helps understand price sensitivity
   */
  static trackDateSelection(nights: number, price: number) {
    this.trackEvent('select_content', {
      content_type: 'date_range',
      nights: nights,
      price: price
    });
  }

  /**
   * Track High-Intent Clicks (Maps)
   */
  static trackMapClick() {
    this.trackEvent('select_content', {
      content_type: 'location_map',
      item_id: 'google_maps_external'
    });
  }

  /**
   * Track Engagement: Photo Gallery
   */
  static trackGalleryView() {
    this.trackEvent('view_item_list', {
      item_list_name: 'Property Photo Gallery'
    });
  }

  /**
   * Track Friction: Availability Errors
   * CRITICAL for identifying lost sales
   */
  static trackAvailabilityError(errorType: string, errorMsg: string) {
    this.trackEvent('exception', {
      description: `AvailError: ${errorType} - ${errorMsg}`,
      fatal: false
    });
  }

  /**
   * Track Language Switch
   */
  static trackLanguageChange(newLang: string) {
    this.trackEvent('select_content', {
      content_type: 'language',
      item_id: newLang
    });
  }

  /**
   * Track Shares
   */
  static trackShare(method: string) {
    this.trackEvent('share', {
      method: method,
      content_type: 'property',
      item_id: 'APT_TORREMOLINOS_1'
    });
  }

  /**
   * Track Contact clicks (Footer/Profile)
   */
  static trackContact(method: string) {
    this.trackEvent('contact', {
      method: method
    });
  }

  /**
   * Track content expansion (Read more / Show all)
   * Helps identify which content is most engaging
   */
  static trackExpansion(contentType: string) {
    this.trackEvent('select_content', {
      content_type: 'expansion',
      item_id: contentType
    });
  }
}
