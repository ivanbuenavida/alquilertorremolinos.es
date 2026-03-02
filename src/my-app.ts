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
import { contactConfig } from './config/contact-config';

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

    const footerWaMsg = encodeURIComponent(TranslationService.l.footer_whatsapp_msg);
    const footerWaUrl = `https://wa.me/${contactConfig.whatsapp}?text=${footerWaMsg}`;

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
        <!-- Property Header -->
        <div class="mb-4">
          <h1 class="fs-2 fw-semibold mb-2 text-dark">${TranslationService.l.hero_title}</h1>
          <div class="d-flex flex-wrap align-items-center gap-2 text-body fs-6">
            <a href="https://www.google.es/maps/place/36%C2%B037'26.6%22N+4%C2%B029'55.0%22W/@36.6240061,-4.4986878,3a,75y,116.03h,96.76t/data=!3m8!1e1!3m6!1sCIABIhA86cI1tJLhg2xzb0l3RATT!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAFfmt2al4HgBHCoJQRpoZCfVYSs4TfsFs7jPmOLPz6o3o3JEpsUL4n1Xg_EfnaibYaJ7yTx3SD3bLlsN7ZaUCIh2Z_8Ko_awhsbGxNSOP1TYkqgjkUUIZVjh_WfieFatJUVO4g-El3KgRGJuqX-n%3Dw900-h600-k-no-pi-6.756274244445322-ya253.22037494810303-ro0-fo100!7i8192!8i4096!4m5!3m4!8m2!3d36.6240556!4d-4.4986111!10e5" target="_blank" rel="noopener noreferrer" class="text-decoration-underline text-body fw-medium d-flex align-items-center gap-1">
              <i class="bi bi-geo-alt-fill"></i> 
              <span>${TranslationService.l.prop_location}</span>
            </a>
            <span class="mx-1 d-none d-sm-inline">·</span>
            <span class="d-flex align-items-center gap-1 fw-bold"><i class="bi bi-star-fill text-dark"></i> 4,92</span>
            <span class="text-decoration-underline mx-1">104 evaluaciones</span>
          </div>
        </div>

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

            <!-- "Recomendación del viajero" badge -->
            <div class="card bg-light border border-opacity-25 rounded-4 mb-5 p-3">
               <div class="d-flex flex-row align-items-center justify-content-around">
                 <div class="text-center d-flex align-items-center gap-2">
                    <i class="bi bi-award fs-1 text-warning"></i>
                    <div class="text-start">
                      <span class="fw-bold text-dark d-block" style="line-height:1.2;">Recomendación<br>del viajero</span>
                    </div>
                 </div>
                 <div class="text-center border-start border-end px-4">
                    <span class="fw-bold fs-3">4,92</span>
                    <div class="text-dark small d-flex gap-1 justify-content-center">
                      <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                    </div>
                 </div>
                 <div class="text-center px-4">
                    <span class="fw-bold fs-3">104</span>
                    <span class="text-dark small d-block text-decoration-underline">evaluaciones</span>
                 </div>
               </div>
            </div>

            <property-details .data="${this.data}"></property-details>
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
        
        <section class="mb-5">
          <h3 class="fw-semibold mb-4 text-dark">¿Dónde dormirás?</h3>
          <div class="rounded-4 overflow-hidden border" style="height: 400px; background-color: #f8f9fa;">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14138.82424443152!2d-4.508544062534591!3d36.62319985926671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72fb4d014bc08d%3A0x67623a1a5b48192a!2sTorremolinos%2C%20M%C3%A1laga!5e0!3m2!1ses!2ses!4v1709400000000!5m2!1ses!2ses" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </section>

        <hr class="my-5 opacity-25">

        <section class="mb-5">
          <h3 class="fw-semibold text-dark mb-4">Conoce a tu anfitrión</h3>
          <div class="row g-5">
             <div class="col-md-4">
                <div class="card bg-white shadow-sm border rounded-4 text-center p-4">
                   <img src="${this.data.host.image || '/logo.svg'}" class="rounded-circle mx-auto mb-3" width="100" height="100" style="object-fit:cover;" alt="Host">
                   <h4 class="fw-bold mb-1">${this.data.host.name}</h4>
                   <p class="text-muted small mb-0"><i class="bi bi-award-fill text-dark"></i> Superanfitrión</p>
                </div>
                <div class="mt-4 px-2">
                   <ul class="list-unstyled text-body fs-6 gap-3 d-flex flex-column">
                      <li><i class="bi bi-mortarboard me-3 fs-5"></i> Estudió en: Universidad</li>
                      <li><i class="bi bi-briefcase me-3 fs-5"></i> Trabajo: Hostelería</li>
                      <li><i class="bi bi-chat-quote me-3 fs-5"></i> ${this.data.host.name === 'Iván Benavides' ? 'Alegre, cuidadoso, atento' : 'Alegre, puntual, simpática'}</li>
                   </ul>
                </div>
             </div>
             <div class="col-md-8">
                <h4 class="fw-bold mb-3">${this.data.host.name} es Superanfitrión</h4>
                <p class="text-body mb-4 text-justify" style="font-size: 1.1rem; line-height: 1.6;">Los Superanfitriones son anfitriones con experiencia y valoraciones excelentes que se esfuerzan al máximo por ofrecer estancias inolvidables a sus viajeros.</p>
                
                <h5 class="fw-bold mb-2">Información sobre el anfitrión</h5>
                <p class="text-body mb-4">Índice de respuesta: 100%.<br>Responde en menos de una hora.</p>

                <button class="btn btn-dark px-4 py-3 rounded-3 fw-semibold mb-4 fs-6">Escribe al anfitrión</button>

                <!-- Protection block -->
                <div class="d-flex gap-3 align-items-center mt-2 pt-4 border-top">
                   <i class="bi bi-shield-check text-primary fs-3"></i>
                   <p class="text-muted small mb-0 w-75">Para proteger tus pagos, utiliza siempre canales seguros para transferir dinero y comunicarte con nosotros.</p>
                </div>
             </div>
          </div>
        </section>

        <hr class="my-5 opacity-25">

        <section class="mb-5">
          <h3 class="fw-semibold text-dark mb-4">Qué debes saber</h3>
          <div class="row g-4 text-body text-start">
             <div class="col-md-4">
                <div class="d-flex flex-column gap-2 pe-3">
                   <i class="bi bi-calendar-x fs-4"></i>
                   <span class="fw-bold text-dark fs-6">Política de cancelación</span>
                   <span class="small" style="line-height: 1.6;">Cancelación gratuita antes de 48h. Si cancelas antes de la fecha de llegada (20 de noviembre), recibirás un reembolso parcial. Consulta la rápida gestión de esta política.</span>
                   <a href="#" class="text-dark fw-bold text-decoration-underline small mt-1">Más información</a>
                </div>
             </div>
             <div class="col-md-4">
                <div class="d-flex flex-column gap-2 pe-3">
                   <i class="bi bi-door-open fs-4"></i>
                   <span class="fw-bold text-dark fs-6">Normas de la casa</span>
                   <span class="small" style="line-height: 1.6;">Llegada a partir de las 15:00<br>Salida antes de las 11:00<br>Máximo 4 viajeros</span>
                   <a href="#" class="text-dark fw-bold text-decoration-underline small mt-1">Más información</a>
                </div>
             </div>
             <div class="col-md-4">
                <div class="d-flex flex-column gap-2 pe-3">
                   <i class="bi bi-shield-exclamation fs-4"></i>
                   <span class="fw-bold text-dark fs-6">Seguridad y propiedad</span>
                   <span class="small" style="line-height: 1.6;">Detector de monóxido de carbono<br>Detector de humo<br>Botiquín de primeros auxilios</span>
                   <a href="#" class="text-dark fw-bold text-decoration-underline small mt-1">Más información</a>
                </div>
             </div>
          </div>
        </section>

      </main>

      <footer class="bg-dark text-white text-center py-4 mt-5">
        <div class="container">
          <div class="mb-3">
            <a href="${footerWaUrl}" target="_blank" class="text-white text-decoration-none d-inline-flex align-items-center gap-2" style="opacity: 0.8; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">
              <i class="bi bi-whatsapp fs-5"></i> ${TranslationService.l.footer_whatsapp}
            </a>
          </div>
          <p class="mb-0 text-white-50 small">&copy; ${new Date().getFullYear()} ${TranslationService.l.nav_brand}. ${TranslationService.l.footer_rights}</p>
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
