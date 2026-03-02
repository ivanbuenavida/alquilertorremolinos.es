import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';

@customElement('about-place')
export class AboutPlace extends LitElement {
  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    window.addEventListener('language-changed', () => this.requestUpdate());
  }

  render() {
    return html`
      <div class="mb-5">
        <h3 class="fw-bold mb-4 text-dark">${TranslationService.l.prop_about}</h3>
        <p class="fs-5 text-body text-justify lh-lg">
          ${TranslationService.l.prop_description}
        </p>
      </div>
    `;
  }
}
