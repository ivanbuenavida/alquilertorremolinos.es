import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './index.css';

// Import child components
import './components/image-carousel';
import './components/property-details';
import './components/availability-calendar';

// Import Service / Data
import { propertyData } from './data/mock-data';

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

  // Configuration for external booking
  private whatsappNumber = '34000000000'; // Replace with real number
  private paypalLink = ''; // Replace with real link

  render() {
    if (!this.data) return html`<div>Loading...</div>`;

    return html`
      <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div class="container">
          <a class="navbar-brand text-primary d-flex align-items-center gap-2" href="#">
            <i class="bi bi-house-door-fill"></i>
            Torremolinos Retreat
          </a>
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
          <p class="mb-0">&copy; ${new Date().getFullYear()} Torremolinos Retreat. All rights reserved.</p>
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
