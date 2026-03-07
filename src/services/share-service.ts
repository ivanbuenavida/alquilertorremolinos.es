import { AnalyticsService } from './analytics-service';

export interface ShareOptions {
  title: string;
  text: string;
  url: string;
}

export class ShareService {
  /**
   * Shares content using the Web Share API if available, 
   * falling back to copying to the clipboard.
   */
  async share(options: ShareOptions, fallbackMessage?: string): Promise<boolean> {
    try {
      if (navigator.share && navigator.canShare && navigator.canShare(options)) {
        await navigator.share(options);
        AnalyticsService.trackShare('Web Share API');
        return true;
      } else {
        const { text, url } = options;
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(`${text}\n${url}`);
        if (fallbackMessage) {
          alert(fallbackMessage);
        }
        AnalyticsService.trackShare('Link Copy');
        return true;
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Error sharing content:', err);
      }
      return false;
    }
  }

  /**
   * Copies text to the clipboard and tracks the action.
   */
  async copyToClipboard(text: string, fallbackMessage?: string): Promise<void> {
    await navigator.clipboard.writeText(text);
    if (fallbackMessage) {
      alert(fallbackMessage);
    }
    AnalyticsService.trackShare('Link Copy');
  }
}

export const shareService = new ShareService();
