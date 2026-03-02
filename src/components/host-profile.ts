import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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
        <h3 class="fw-semibold text-dark mb-4">Conoce a tu anfitrión</h3>
        <div class="row g-5">
          <div class="col-md-4">
            <div class="card bg-white shadow-sm border rounded-4 text-center p-4">
              <img src="${this.host.image || '/logo.svg'}" class="rounded-circle mx-auto mb-3" width="100" height="100" style="object-fit:cover;" alt="Host">
              <h4 class="fw-bold mb-1">${this.host.name}</h4>
              <p class="text-muted small mb-0"><i class="bi bi-award-fill text-dark"></i> Superanfitrión</p>
            </div>
            <div class="mt-4 px-2">
              <ul class="list-unstyled text-body fs-6 gap-3 d-flex flex-column">
                <li><i class="bi bi-mortarboard me-3 fs-5"></i> Estudió en: Universidad</li>
                <li><i class="bi bi-briefcase me-3 fs-5"></i> Trabajo: Hostelería</li>
                <li><i class="bi bi-chat-quote me-3 fs-5"></i> ${this.host.name === 'Iván Benavides' ? 'Alegre, cuidadoso, atento' : 'Alegre, puntual, simpática'}</li>
              </ul>
            </div>
          </div>
          <div class="col-md-8">
            <h4 class="fw-bold mb-3">${this.host.name} es Superanfitrión</h4>
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
    `;
  }
}
