import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';
import { AnalyticsService } from '../services/analytics-service';

@customElement('about-place')
export class AboutPlace extends LitElement {
  @state()
  private isExpanded = false;

  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    window.addEventListener('language-changed', () => this.requestUpdate());
  }

  toggleExpanded(e: Event) {
    e.preventDefault();
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      AnalyticsService.trackExpansion('about_place');
    }
  }

  render() {
    const description = TranslationService.l.prop_description;
    const maxLength = 250;
    const shouldTruncate = description.length > maxLength;
    
    const displayDescription = (shouldTruncate && !this.isExpanded) 
      ? description.substring(0, maxLength) + '...' 
      : description;

    return html`
      <div class="mb-5">
        <h3 class="fw-bold mb-4 text-dark">${TranslationService.l.prop_about}</h3>
        <p class="text-body text-justify mb-2 fs-6 lh-base">
          ${displayDescription}
        </p>
        ${shouldTruncate ? html`
          <a href="#" @click="${this.toggleExpanded}" class="fw-bold text-dark text-decoration-underline d-inline-block mt-1">
            ${this.isExpanded ? TranslationService.l.prop_show_less : TranslationService.l.prop_read_more}
          </a>
        ` : ''}
      </div>
    `;
  }
}
