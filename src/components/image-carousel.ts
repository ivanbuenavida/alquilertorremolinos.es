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

    // Airbnb style: 1 big image on left, grid of 4 small images on right
    // On small screens, we might just show the first one or a scrollable list, 
    // but a grid is fine for now, we'll use d-none d-md-flex for the right side
    
    const mainImg = this.images[0];
    const sideImages = this.images.slice(1, 5); // Take up to 4 images for the right side

    return html`
      <div class="position-relative overflow-hidden rounded-4 mb-4">
        <div class="row g-2" style="height: 50vh; min-height: 400px; max-height: 600px;">
          <!-- Main Left Image -->
          <div class="col-12 col-md-6 h-100">
            <img src="${mainImg}" class="w-100 h-100 object-fit-cover" 
                 alt="Main property image" style="cursor: pointer;">
          </div>
          
          <!-- Right 4 Images Grid -->
          <div class="col-md-6 d-none d-md-block h-100">
            <div class="row g-2 h-100">
              ${sideImages.map((img, index) => html`
                <div class="col-6 h-50">
                  <img src="${img}" class="w-100 h-100 object-fit-cover" 
                       alt="Property image ${index + 2}" style="cursor: pointer;">
                </div>
              `)}
            </div>
          </div>
        </div>
        
        <!-- Optional: "Show all photos" button (purely visual for now) -->
        <button class="btn btn-light position-absolute bottom-0 end-0 m-3 shadow-sm d-flex align-items-center gap-2 border border-dark border-opacity-25" style="z-index: 2;">
          <i class="bi bi-grid-3x3-gap-fill"></i> Mostrar todas las fotos
        </button>
      </div>
    `;
  }
}
