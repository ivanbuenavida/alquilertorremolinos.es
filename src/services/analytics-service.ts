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
}
