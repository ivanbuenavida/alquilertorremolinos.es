import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';

@customElement('language-selector')
export class LanguageSelector extends LitElement {
  @state() private _currentLang = TranslationService.currentLang;
  @state() private _isOpen = false;

  // No custom styles, using only Bootstrap classes
  createRenderRoot() {
    return this;
  }

  private _toggleDropdown(e: Event) {
    e.stopPropagation();
    this._isOpen = !this._isOpen;
  }

  constructor() {
    super();
    // Close on click outside
    window.addEventListener('click', () => {
      this._isOpen = false;
    });

    // Sync state when language changes globally
    window.addEventListener('language-changed', () => {
      this._currentLang = TranslationService.currentLang;
    });
  }

  private _selectLang(code: any) {
    TranslationService.setLanguage(code);
    this._isOpen = false;
  }

  render() {
    const langs = TranslationService.getSupportedLanguages();
    const current = langs.find(l => l.code === this._currentLang);

    return html`
      <div class="dropdown">
        <button 
          class="btn btn-white border-2 rounded-pill fw-bold d-flex align-items-center gap-2 shadow-sm btn-sm px-3" 
          type="button"
          @click="${this._toggleDropdown}"
          style="border-color: #efefef;"
        >
          <span>${current?.flag}</span>
          <span class="text-uppercase small">${this._currentLang}</span>
          <i class="bi bi-chevron-down opacity-50 small"></i>
        </button>
        
        <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-4 p-2 ${this._isOpen ? 'show' : ''}" 
            style="margin-top: 10px; display: ${this._isOpen ? 'block' : 'none'};">
          ${langs.map(l => html`
            <li>
              <a class="dropdown-item rounded-3 d-flex align-items-center justify-content-between gap-3 py-2 ${l.code === this._currentLang ? 'active bg-primary-subtle text-primary' : ''}" 
                 href="javascript:void(0)" 
                 @click="${() => this._selectLang(l.code)}">
                <span class="d-flex align-items-center gap-2">
                  <span>${l.flag}</span> ${l.name}
                </span>
                ${l.code === this._currentLang ? html`<i class="bi bi-check2"></i>` : ''}
              </a>
            </li>
          `)}
        </ul>
      </div>
    `;
  }
}
