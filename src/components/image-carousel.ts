import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('image-carousel')
export class ImageCarousel extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array })
  images: string[] = [];

  @state()
  private _showModal = false;

  private _toggleModal() {
    this._showModal = !this._showModal;
    if (this._showModal) {
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = '';
    }
  }

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
                 alt="Main property image" style="cursor: pointer;" @click="${this._toggleModal}">
          </div>
          
          <!-- Right 4 Images Grid -->
          <div class="col-md-6 d-none d-md-block h-100">
            <div class="row g-2 h-100">
              ${sideImages.map((img, index) => html`
                <div class="col-6 h-50">
                  <img src="${img}" class="w-100 h-100 object-fit-cover" 
                       alt="Property image ${index + 2}" style="cursor: pointer;" @click="${this._toggleModal}">
                </div>
              `)}
            </div>
          </div>
        </div>
        
        <!-- Optional: "Show all photos" button -->
        <button class="btn btn-light position-absolute bottom-0 end-0 m-3 shadow-sm d-flex align-items-center gap-2 border border-dark border-opacity-25" style="z-index: 2;" @click="${this._toggleModal}">
          <i class="bi bi-grid-3x3-gap-fill"></i> Mostrar todas las fotos
        </button>
      </div>

      <!-- Fullscreen Modal Gallery -->
      ${this._showModal ? html`
        <div class="position-fixed top-0 start-0 w-100 h-100" style="z-index: 1050; background-color: rgba(255, 255, 255, 0.95);">
          
          <!-- Sticky Header Area (Top Bar + Thumbnails) -->
          <div class="sticky-top w-100" style="background-color: transparent;">
            
            <!-- Modal Top Bar -->
            <div class="px-4 py-3 d-flex justify-content-between align-items-center bg-white bg-opacity-75" style="backdrop-filter: blur(10px);">
              <button class="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center border" style="width: 40px; height: 40px;" @click="${this._toggleModal}">
                <i class="bi bi-chevron-left"></i>
              </button>
              
              <div class="fw-bold fs-5 d-none d-md-block">Ruta fotográfica</div>

              <div class="d-flex gap-3">
                <button class="btn btn-link text-dark text-decoration-underline fw-medium d-flex align-items-center gap-2 px-0">
                  <i class="bi bi-box-arrow-up"></i> Compartir
                </button>
                <button class="btn btn-link text-dark text-decoration-underline fw-medium d-flex align-items-center gap-2 px-0">
                  <i class="bi bi-heart"></i> Guardar
                </button>
              </div>
            </div>

            <!-- Thumbnail Bar -->
            <div class="w-100 bg-white bg-opacity-75 border-bottom py-3 overflow-auto" style="backdrop-filter: blur(10px); white-space: nowrap;">
              <div class="container d-flex gap-3 px-4">
                ${this.images.map((img, index) => html`
                  <a href="#gallery-img-${index}" class="text-decoration-none text-dark d-inline-block" style="width: 120px;" @click="${(e: Event) => {
                    e.preventDefault();
                    const target = this.renderRoot.querySelector(`#gallery-img-${index}`);
                    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}">
                    <img src="${img}" class="img-fluid rounded mb-1 w-100 object-fit-cover" style="height: 80px;" alt="Thumbnail ${index + 1}">
                    <div class="small text-truncate text-center">Foto ${index + 1}</div>
                  </a>
                `)}
              </div>
            </div>

          </div>

          <!-- Scrollable Gallery Content -->
          <div class="overflow-auto pb-5" style="height: calc(100vh - 180px);">
            <div class="container py-4 max-w-lg" style="max-width: 800px;">
              <div class="d-flex flex-column gap-5">
                ${this.images.map((img, index) => html`
                  <div class="w-100" id="gallery-img-${index}">
                    <img src="${img}" class="img-fluid rounded-4 w-100 shadow-sm border border-light" alt="Gallery image ${index + 1}">
                  </div>
                `)}
              </div>
            </div>
          </div>

        </div>
      ` : ''}
    `;
  }
}
