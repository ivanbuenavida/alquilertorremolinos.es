import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';

@customElement('property-amenities')
export class PropertyAmenities extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array })
  amenities: any[] = [];

  @state()
  private _showModal = false;

  constructor() {
    super();
    window.addEventListener('language-changed', () => this.requestUpdate());
  }

  private _toggleModal() {
    this._showModal = !this._showModal;
    if (this._showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  render() {
    if (!this.amenities) return html``;

    const displayAmenities = this.amenities.slice(0, 6);

    return html`
      <div class="mb-5 position-relative">
        <h3 class="fw-bold mb-4 text-dark">${TranslationService.l.amen_offers}</h3>
        <div class="row g-4">
          ${displayAmenities.map((amenity: any) => html`
            <div class="col-md-6">
              <div class="d-flex align-items-center gap-3">
                <i class="bi ${amenity.icon} fs-4 text-dark"></i>
                <span class="fs-6 text-dark">${TranslationService.translateAmenity(amenity.icon)}</span>
              </div>
            </div>
          `)}
        </div>

        ${this.amenities.length > 6 ? html`
          <button 
            @click="${this._toggleModal}"
            class="btn btn-outline-dark fw-bold px-4 py-2 mt-4 rounded-3 hover-shadow transition-all"
            style="border-width: 1px;"
          >
            ${TranslationService.l.amen_btn_show_all(this.amenities.length)}
          </button>
        ` : ''}

        <!-- Simple Modal Implementation -->
        ${this._showModal ? html`
          <div 
            class="modal fade show d-block" 
            tabindex="-1" 
            style="background: rgba(0,0,0,0.5); z-index: 1050;"
            @click="${(e: MouseEvent) => (e.target as HTMLElement).classList.contains('modal') && this._toggleModal()}"
          >
            <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
              <div class="modal-content border-0 rounded-4 shadow-lg">
                <div class="modal-header border-0 p-4 pb-0">
                  <button type="button" class="btn-close" @click="${this._toggleModal}" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4 pt-2">
                  <h2 class="fw-bold mb-4 text-dark fs-3">${TranslationService.l.amen_modal_title}</h2>
                  <div class="row g-4">
                    ${this.amenities.map((amenity: any) => html`
                      <div class="col-12 py-3 border-bottom">
                        <div class="d-flex align-items-center gap-4">
                          <i class="bi ${amenity.icon} fs-3 text-dark"></i>
                          <span class="fs-5 text-dark">${TranslationService.translateAmenity(amenity.icon)}</span>
                        </div>
                      </div>
                    `)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` : ''}
      </div>

      <style>
        .transition-all { transition: all 0.2s ease-in-out; }
        .hover-shadow:hover { background-color: #f7f7f7; transform: scale(1.01); }
      </style>
    `;
  }
}
