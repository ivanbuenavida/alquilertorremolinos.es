import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './index.css';

// Import child components
import './components/image-carousel.ts';
import './components/property-header.ts';
import './components/traveler-badge.ts';
import './components/about-place.ts';
import './components/property-amenities.ts';
import './components/property-map.ts';
import './components/host-profile.ts';
import './components/things-to-know.ts';
import './components/app-footer.ts';
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
    // Initialize language from URL or browser
    TranslationService.init();
    
    // Re-render when language changes
    window.addEventListener('language-changed', () => this.requestUpdate());
    
    window.addEventListener('popstate', () => {
      TranslationService.init();
    });
  }

  render() {
    if (!this.data) return html`<div>Loading...</div>`;



    return html`
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;800&display=swap" rel="stylesheet">

      <nav class="navbar navbar-expand-lg navbar-light sticky-top bg-white border-bottom shadow-sm">
        <div class="container d-flex justify-content-between align-items-center">
          <a class="navbar-brand d-flex align-items-center gap-2" href="#">
            <img src="/logo.svg" alt="Logo" style="height: 40px; width: auto;">
            <span>${TranslationService.l.nav_brand}</span>
          </a>
          <language-selector></language-selector>
        </div>
      </nav>

      <main class="container my-4">
        <property-header></property-header>

        <section class="mb-5">
          <image-carousel .images="${this.data.images}"></image-carousel>
        </section>

        <div class="row g-5">
          <div class="col-lg-8">
            <!-- Property summary line (Airbnb style) -->
            <div class="d-flex justify-content-between align-items-start mb-4 pb-4 border-bottom">
               <div>
                 <h2 class="fs-4 fw-semibold mb-1">Alojamiento entero: apartamento en Torremolinos, España</h2>
                 <p class="text-body mb-0">3 viajeros · 2 dormitorios · 2 camas · 1 baño</p>
               </div>
               <img src="${this.data.host.image || '/logo.svg'}" alt="Host" class="rounded-circle border" width="56" height="56">
            </div>

            <traveler-badge></traveler-badge>

            <about-place></about-place>
            <property-amenities .amenities="${this.data.amenities}"></property-amenities>
          </div>
          
          <div class="col-lg-4">
            <div class="sticky-top" style="top: 80px; z-index: 10;">
              <!-- Reservation Widget Card -->
              <div class="card rounded-4 shadow-lg border-opacity-25 p-4 mb-4">
                <div class="d-flex align-items-baseline mb-4 gap-2">
                   <span class="fs-4 fw-bold">211 €</span>
                   <span class="text-body fw-medium">en total</span>
                </div>

                <div class="border rounded-3 p-1 mb-3 bg-white">
                   <!-- Keep existing calendar as requested by the user -->
                   <availability-calendar></availability-calendar>
                </div>

                <div class="bg-light rounded-3 p-2 mb-3 text-center small text-muted">
                    <i class="bi bi-info-circle text-primary"></i> 0 € hoy · Cancelación gratuita
                </div>

                <button class="btn btn-danger w-100 rounded-3 py-3 fs-5 fw-bold mb-3">Reservar</button>
                <div class="text-center text-body small">No se te cobrará nada aún</div>
              </div>
              
              <!-- Report listing banner -->
              <div class="text-center mb-5">
                <a href="#" class="text-muted text-decoration-underline small"><i class="bi bi-flag-fill"></i> Denunciar este anuncio</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Extra single-property sections that mimic Airbnb -->
        <hr class="my-5 opacity-25">
        <property-map></property-map>

        <hr class="my-5 opacity-25">
        <host-profile .host="${this.data.host}"></host-profile>

        <hr class="my-5 opacity-25">
        <things-to-know></things-to-know>

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
