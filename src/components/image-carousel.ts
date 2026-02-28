import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('image-carousel')
export class ImageCarousel extends LitElement {
  createRenderRoot() { return this; }

  @property({ type: Array })
  images: string[] = [];

  render() {
    if (!this.images || this.images.length === 0) {
      return html`<div class="alert alert-secondary text-center">No images available</div>`;
    }

    return html`
      <div id="propertyCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          ${this.images.map((_, index) => html`
            <button type="button" data-bs-target="#propertyCarousel" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" aria-current="${index === 0 ? 'true' : 'false'}" aria-label="Slide ${index + 1}"></button>
          `)}
        </div>
        <div class="carousel-inner rounded-4 shadow-sm">
          ${this.images.map((img, index) => html`
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
              <img src="${img}" class="d-block w-100 carousel-img" alt="Property image ${index + 1}">
            </div>
          `)}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#propertyCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#propertyCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    `;
  }
}
