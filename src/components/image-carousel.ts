import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';

@customElement('image-carousel')
export class ImageCarousel extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array })
  images: string[] = [];

  @state()
  private _showModal = false;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this._handleKeyDown);
    window.addEventListener('popstate', this._handlePopState);
    
    // Check if we should start with modal open (e.g. on refresh)
    if (history.state?.gallery) {
      this._showModal = true;
      document.body.style.overflow = 'hidden';
    }
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this._handleKeyDown);
    window.removeEventListener('popstate', this._handlePopState);
    super.disconnectedCallback();
  }

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this._showModal) {
      this._closeModal();
    }
  };

  private _handlePopState = () => {
    const wasOpen = this._showModal;
    this._showModal = !!history.state?.gallery;
    
    if (wasOpen && !this._showModal) {
      document.body.style.overflow = '';
    } else if (!wasOpen && this._showModal) {
      document.body.style.overflow = 'hidden';
    }
  };

  private _openModal() {
    this._showModal = true;
    document.body.style.overflow = 'hidden';
    history.pushState({ gallery: true }, '');
  }

  private _closeModal() {
    if (this._showModal) {
      window.history.back();
    }
  }

  private _handleOverlayClick(e: MouseEvent) {
    // If user clicked the backdrop or scrollable area (not an image or link)
    const target = e.target as HTMLElement;
    if (target.tagName !== 'IMG' && target.tagName !== 'A' && !target.closest('.sticky-top')) {
      this._closeModal();
    }
  }

  render() {
    if (!this.images || this.images.length === 0) {
      return html`<div class="alert alert-secondary text-center">No images available</div>`;
    }

    const mainImg = this.images[0];
    const sideImages = this.images.slice(1, 5);

    return html`
      <div class="position-relative overflow-hidden rounded-4 mb-4">
        <div class="row g-2" style="height: 50vh; min-height: 400px; max-height: 600px;">
          <!-- Main Left Image -->
          <div class="col-12 col-md-6 h-100">
            <img src="${mainImg}" class="w-100 h-100 object-fit-cover" 
                 alt="${(TranslationService.l as any).img_title_1} - Alquiler Torremolinos" style="cursor: pointer;" @click="${this._openModal}">
          </div>
          
          <!-- Right 4 Images Grid -->
          <div class="col-md-6 d-none d-md-block h-100">
            <div class="row g-2 h-100">
              ${sideImages.map((img, index) => html`
                <div class="col-6 h-50">
                  <img src="${img}" class="w-100 h-100 object-fit-cover" 
                       alt="${(TranslationService.l as any)['img_title_' + (index + 2)]} - Torremolinos" style="cursor: pointer;" @click="${this._openModal}">
                </div>
              `)}
            </div>
          </div>
        </div>
        
        <!-- Optional: "Show all photos" button -->
        <button class="btn btn-light position-absolute bottom-0 end-0 m-3 shadow-sm d-flex align-items-center gap-2 border border-dark border-opacity-25" style="z-index: 2;" @click="${this._openModal}">
          <i class="bi bi-grid-3x3-gap-fill"></i> ${TranslationService.l.img_btn_show_all}
        </button>
      </div>

      <!-- Fullscreen Modal Gallery -->
      ${this._showModal ? html`
        <div class="position-fixed top-0 start-0 w-100 h-100" style="z-index: 1050; background-color: rgba(255, 255, 255, 0.95);" @click="${this._handleOverlayClick}">
          
          <!-- Sticky Header Area (Top Bar + Thumbnails) -->
          <div class="sticky-top w-100" style="background-color: transparent;">
            
            <!-- Modal Top Bar -->
            <div class="px-4 py-3 d-flex justify-content-between align-items-center bg-white bg-opacity-75" style="backdrop-filter: blur(10px);">
              <button class="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center border" style="width: 40px; height: 40px;" @click="${this._closeModal}">
                <i class="bi bi-chevron-left"></i>
              </button>
              
              <div class="fw-bold fs-5 d-none d-md-block flex-grow-1 text-center">${TranslationService.l.img_gallery_title}</div>

              <div style="width: 40px;"></div> <!-- Spacer to keep title centered -->
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
                    <img src="${img}" class="img-fluid rounded mb-1 w-100 object-fit-cover" style="height: 80px;" alt="${(TranslationService.l as any)['img_title_' + (index + 1)]}">
                    <div class="small text-truncate text-center">${(TranslationService.l as any)['img_title_' + (index + 1)]}</div>
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
                    <img src="${img}" class="img-fluid rounded-4 w-100 shadow-sm border border-light" alt="${(TranslationService.l as any)['img_title_' + (index + 1)]} - Alquiler Torremolinos">
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
