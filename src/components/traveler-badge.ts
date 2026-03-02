import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';

@customElement('traveler-badge')
export class TravelerBadge extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String })
  rating = "4,92";

  @property({ type: Number })
  reviews = 104;

  render() {
    return html`
      <div class="card bg-light border border-opacity-25 rounded-4 mb-5 p-3">
        <div class="d-flex flex-row align-items-center justify-content-around">
          <div class="text-center d-flex align-items-center gap-2">
            <i class="bi bi-award fs-1 text-warning"></i>
            <div class="text-start">
              <span class="fw-bold text-dark d-block" style="line-height:1.2; white-space: pre-line;">${TranslationService.l.badge_recommendation}</span>
            </div>
          </div>
          <div class="text-center border-start border-end px-4">
            <span class="fw-bold fs-3">${this.rating}</span>
            <div class="text-dark small d-flex gap-1 justify-content-center">
              <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
            </div>
          </div>
          <div class="text-center px-4">
            <span class="fw-bold fs-3">${this.reviews}</span>
            <span class="text-dark small d-block text-decoration-underline">${TranslationService.l.badge_reviews}</span>
          </div>
        </div>
      </div>
    `;
  }
}
