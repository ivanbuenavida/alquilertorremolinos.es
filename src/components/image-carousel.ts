import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('image-carousel')
export class ImageCarousel extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array })
  images: string[] = [];

  render() {
    if (!this.images || this.images.length === 0) {
      return html`<div class="alert alert-secondary text-center">No images available</div>`;
    }

    return html`
      <div id="propertyCarousel" class="carousel slide overflow-hidden rounded-bottom-4 shadow-sm" data-bs-ride="carousel">
        <div class="carousel-indicators">
          ${this.images.map((_, index) => html`
            <button type="button" data-bs-target="#propertyCarousel" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" aria-current="${index === 0 ? 'true' : 'false'}"></button>
          `)}
        </div>
        <div class="carousel-inner">
          ${this.images.map((img, index) => html`
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
              <img src="${img}" class="d-block w-100 object-fit-cover" style="height: 60vh; min-height: 400px;" alt="...">
            </div>
          `)}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#propertyCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#propertyCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>
    `;
  }
}
