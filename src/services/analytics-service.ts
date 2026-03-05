/**
 * Service to handle Google Analytics tracking.
 * Provides a clean abstraction to avoid direct 'gtag' calls in components.
 * If you want to disable tracking, simply comment out the contents of the trackEvent method.
 */
export class AnalyticsService {

  /**
   * Tracks a custom event in GA4
   * @param eventName Name of the event (e.g., 'generate_lead', 'share')
   * @param params Additional parameters for the event
   */
  static trackEvent(eventName: string, params: Record<string, any> = {}) {
    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, params);
    }
  }

  /**
   * Specifically tracks a lead generated from WhatsApp
   * @param value Optional monetary value (e.g. total price)
   */
  static trackLead(value: number = 0) {
    this.trackEvent('generate_lead', {
      'event_category': 'engagement',
      'event_label': 'WhatsApp Booking',
      'value': value,
      'currency': 'EUR'
    });
  }

  /**
   * Tracks social shares
   * @param contentType Type of content shared
   * @param itemId ID of the item shared
   */
  static trackShare(contentType: string, itemId: string) {
    this.trackEvent('share', {
      'content_type': contentType,
      'item_id': itemId
    });
  }

  /**
   * Tracks general contact clicks
   * @param method Method of contact (e.g. 'WhatsApp Footer')
   */
  static trackContact(method: string) {
    this.trackEvent('contact', {
      'method': method
    });
  }

  /**
   * Tracks when a user encounters an availability error (e.g. min nights, occupied)
   * This is CRITICAL to know if you're losing customers due to your rules or full calendar.
   */
  static trackAvailabilityError(errorType: string, details: string) {
    this.trackEvent('availability_error', {
      'error_type': errorType,
      'error_details': details
    });
  }

  /**
   * Tracks when users select a date range (interest)
   */
  static trackDateSelection(nights: number, price: number) {
    this.trackEvent('date_selection', {
      'nights': nights,
      'price': price
    });
  }

  /**
   * Tracks when users open the photo gallery
   */
  static trackGalleryView() {
    this.trackEvent('view_gallery', {
      'item_id': 'property_main'
    });
  }

  /**
   * Tracks language switches
   */
  static trackLanguageChange(newLang: string) {
    this.trackEvent('change_language', {
      'language': newLang
    });
  }
}
