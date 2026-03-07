import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './index.css';

// Import child components
import './components/image-carousel.ts';
import './components/property-header.ts';
import './components/property-header.ts';
import './components/about-place.ts';
import './components/property-amenities.ts';
import './components/property-map.ts';
import './components/host-profile.ts';
import './components/app-footer.ts';
import './components/availability-calendar.ts';

// Import Service / Data
import { propertyData } from './data/mock-data';

import { TranslationService } from './services/translation-service';
import { AnalyticsService } from './services/analytics-service';
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
    // Initialize language from URL or browser
    TranslationService.init();
    
    // Track initial property view
    AnalyticsService.trackPropertyView();
    
    // Re-render when language changes
    window.addEventListener('language-changed', () => this.requestUpdate());
    
    window.addEventListener('popstate', () => {
      TranslationService.init();
    });
  }

  render() {
    if (!this.data) return html`<div>Loading...</div>`;



    return html`
      <nav class="navbar navbar-expand-lg navbar-light sticky-top bg-white border-bottom shadow-sm px-3">
        <div class="container d-flex justify-content-between align-items-center">
          <a class="navbar-brand d-flex align-items-center gap-2" href="#">
            <img src="/logo.svg" alt="Alquiler Torremolinos Logo" style="height: 40px; width: auto;">
            <span class="d-none d-md-inline">${TranslationService.l.nav_brand}</span>
          </a>
          <language-selector></language-selector>
        </div>
      </nav>

      <main class="container my-4">
        <property-header></property-header>

        <section class="mb-5">
          <image-carousel .images="${this.data.images}"></image-carousel>
        </section>

        <div class="row g-4 g-lg-5">
          <div class="col-lg-8">
            <!-- Property summary line (Airbnb style) -->
            <div class="d-flex justify-content-between align-items-start mb-4 pb-4 border-bottom">
               <div>
                 <h2 class="fs-4 fw-semibold mb-1">${TranslationService.l.app_property_title}</h2>
                 <p class="text-body mb-0">${TranslationService.l.app_property_specs}</p>
               </div>
               <img src="${this.data.host.image || '/logo.svg'}" alt="${TranslationService.l.prop_host_prefix} - ${this.data.host.name}" class="rounded-circle border" width="56" height="56">
            </div>



            <about-place></about-place>
            <property-amenities .amenities="${this.data.amenities}"></property-amenities>
            
            <hr class="my-5 opacity-25">
            <property-map></property-map>
            
            <hr class="d-md-none" />
          </div>
          <div class="col-lg-4">
            <div class="sticky-top" style="top: 80px; z-index: 10;">
              <availability-calendar style="display: block;"></availability-calendar>
            </div>
          </div>
        </div>
        <div>
            <hr class="my-5 opacity-25">
            <host-profile .host="${this.data.host}"></host-profile>
        </div>
      </main>

      <app-footer></app-footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-app': MyApp;
  }
}
