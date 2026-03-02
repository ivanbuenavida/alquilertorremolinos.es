import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('things-to-know')
export class ThingsToKnow extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <section class="mb-5">
        <h3 class="fw-semibold text-dark mb-4">${TranslationService.l.know_title}</h3>
        <div class="row g-4 text-body text-start">
          <div class="col-md-4">
            <div class="d-flex flex-column gap-2 pe-3">
              <i class="bi bi-calendar-x fs-4"></i>
              <span class="fw-bold text-dark fs-6">${TranslationService.l.know_cancel_title}</span>
              <span class="small" style="line-height: 1.6;">${TranslationService.l.know_cancel_desc}</span>
              <a href="#" class="text-dark fw-bold text-decoration-underline small mt-1">${TranslationService.l.know_more_info}</a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex flex-column gap-2 pe-3">
              <i class="bi bi-door-open fs-4"></i>
              <span class="fw-bold text-dark fs-6">${TranslationService.l.know_rules_title}</span>
              <span class="small" style="line-height: 1.6;">${unsafeHTML(TranslationService.l.know_rules_desc)}</span>
              <a href="#" class="text-dark fw-bold text-decoration-underline small mt-1">${TranslationService.l.know_more_info}</a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-flex flex-column gap-2 pe-3">
              <i class="bi bi-shield-exclamation fs-4"></i>
              <span class="fw-bold text-dark fs-6">${TranslationService.l.know_safety_title}</span>
              <span class="small" style="line-height: 1.6;">${unsafeHTML(TranslationService.l.know_safety_desc)}</span>
              <a href="#" class="text-dark fw-bold text-decoration-underline small mt-1">${TranslationService.l.know_more_info}</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
