import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('things-to-know')
export class ThingsToKnow extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
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
    `;
  }
}
