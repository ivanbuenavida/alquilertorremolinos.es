import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';

@customElement('host-profile')
export class HostProfile extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  host: any;

  render() {
    if (!this.host) return html``;

    return html`
      <section class="mb-5">
        <h3 class="fw-semibold text-dark mb-4">${TranslationService.l.host_title}</h3>
        <div class="row g-5">
          <div class="col-md-4">
            <div class="card bg-white shadow-sm border rounded-4 text-center p-4">
              <img src="${this.host.image || '/logo.svg'}" class="rounded-circle mx-auto mb-3" width="100" height="100" style="object-fit:cover;" alt="Host">
              <h4 class="fw-bold mb-1">${this.host.name}</h4>
              <p class="text-muted small mb-0"><i class="bi bi-award-fill text-dark"></i> ${TranslationService.l.host_superhost}</p>
            </div>
            <div class="mt-4 px-2">
              <ul class="list-unstyled text-body fs-6 gap-3 d-flex flex-column">
                <li><i class="bi bi-mortarboard me-3 fs-5"></i> ${TranslationService.l.host_study}</li>
                <li><i class="bi bi-briefcase me-3 fs-5"></i> ${TranslationService.l.host_work}</li>
                <li><i class="bi bi-chat-quote me-3 fs-5"></i> ${this.host.name === 'Iván Benavides' ? 'Alegre, cuidadoso, atento' : 'Alegre, puntual, simpática'}</li>
              </ul>
            </div>
          </div>
          <div class="col-md-8">
            <h4 class="fw-bold mb-3">${this.host.name} ${TranslationService.l.host_is_superhost}</h4>
            <p class="text-body mb-4 text-justify" style="font-size: 1.1rem; line-height: 1.6;">${TranslationService.l.host_superhost_desc}</p>
            
            <h5 class="fw-bold mb-2">${TranslationService.l.host_info_title}</h5>
            <p class="text-body mb-4">${TranslationService.l.host_response_rate}<br>${TranslationService.l.host_response_time}</p>

            <button class="btn btn-dark px-4 py-3 rounded-3 fw-semibold mb-4 fs-6">${TranslationService.l.host_contact_btn}</button>

            <!-- Protection block -->
            <div class="d-flex gap-3 align-items-center mt-2 pt-4 border-top">
              <i class="bi bi-shield-check text-primary fs-3"></i>
              <p class="text-muted small mb-0 w-75">${TranslationService.l.host_protection}</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
