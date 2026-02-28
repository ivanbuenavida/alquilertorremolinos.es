import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './index.css';

// Import child components
import './components/image-carousel.ts';
import './components/property-details.ts';
import './components/availability-calendar.ts';

// Import Service / Data
import { propertyData } from './data/mock-data';

import { TranslationService } from './services/translation-service';
import './components/language-selector';

/**
 * Main application component.
 * Acts as a Smart Component, handling data fetching and distribution to Dumb Components.
 * Disables shadow DOM to leverage global Bootstrap 5 configurations.
 */
@customElement('my-app')
export class MyApp extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state()
  private data = propertyData;

  constructor() {
    super();
    // Re-render when language changes
    window.addEventListener('language-changed', () => this.requestUpdate());
  }

  // Configuration for external booking
  private whatsappNumber = '34617293504'; 
  private paypalLink = ''; // Replace with real link

  render() {
    if (!this.data) return html`<div>Loading...</div>`;

    return html`
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;800&display=swap" rel="stylesheet">

      <nav class="navbar navbar-expand-lg navbar-light sticky-top">
        <div class="container d-flex justify-content-between align-items-center">
          <a class="navbar-brand d-flex align-items-center gap-2" href="#">
            <img src="/logo.svg" alt="Logo" style="height: 40px; width: auto;">
            <span>${TranslationService.l.nav_brand}</span>
          </a>
          <language-selector></language-selector>
        </div>
      </nav>

      <main class="container my-4">
        <section class="mb-5">
          <image-carousel .images="${this.data.images}"></image-carousel>
        </section>

        <div class="row g-4">
          <div class="col-lg-8">
            <property-details .data="${this.data}"></property-details>
          </div>
          <div class="col-lg-4">
            <div class="sticky-top" style="top: 80px; z-index: 10;">
              <availability-calendar 
                .whatsappNumber="${this.whatsappNumber}" 
                .paypalLink="${this.paypalLink}">
              </availability-calendar>
            </div>
          </div>
        </div>
      </main>

      <footer class="bg-dark text-white text-center py-4 mt-5">
        <div class="container">
          <p class="mb-0">&copy; ${new Date().getFullYear()} ${TranslationService.l.nav_brand}. ${TranslationService.l.footer_rights}</p>
        </div>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-app': MyApp;
  }
}
