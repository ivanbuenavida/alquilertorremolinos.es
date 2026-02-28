import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';

@customElement('language-selector')
export class LanguageSelector extends LitElement {
  @state() private _currentLang = TranslationService.currentLang;
  @state() private _isOpen = false;

  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .dropdown {
      position: relative;
    }

    .dropbtn {
      background: white;
      color: var(--primary-dark);
      padding: 6px 14px;
      font-size: 14px;
      border: 2px solid #efefef;
      border-radius: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }

    .dropbtn:hover {
      border-color: var(--primary);
      background: #fcfcfc;
      transform: translateY(-1px);
    }

    .dropbtn.active {
      border-color: var(--primary);
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    .dropdown-content {
      display: none;
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      background-color: white;
      min-width: 160px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.12);
      z-index: 1000;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #efefef;
      padding: 4px;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .dropdown-content.show {
      display: block;
    }

    .dropdown-content a {
      color: #222;
      padding: 10px 14px;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 14px;
      transition: all 0.2s;
      border-radius: 8px;
      font-weight: 500;
    }

    .dropdown-content a:hover {
      background-color: #f7f7f7;
      color: var(--primary);
    }

    .dropdown-content a.active {
      background-color: var(--primary-light);
      color: var(--primary-dark);
    }

    .flag {
      font-size: 1.1rem;
    }

    .check-icon {
      color: var(--primary);
      font-size: 0.8rem;
    }

    /* Invisible overlay to catch clicks outside */
    .overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 999;
    }

    .overlay.show {
      display: block;
    }
  `;

  private _toggleDropdown(e: Event) {
    e.stopPropagation();
    this._isOpen = !this._isOpen;
  }

  private _selectLang(code: any) {
    TranslationService.setLanguage(code);
    this._currentLang = code;
    this._isOpen = false;
    this.requestUpdate();
  }

  render() {
    const langs = TranslationService.getSupportedLanguages();
    const current = langs.find(l => l.code === this._currentLang);

    return html`
      <div class="overlay ${this._isOpen ? 'show' : ''}" @click="${() => this._isOpen = false}"></div>
      <div class="dropdown">
        <button class="dropbtn ${this._isOpen ? 'active' : ''}" @click="${this._toggleDropdown}">
          <span class="flag">${current?.flag}</span>
          <span>${this._currentLang.toUpperCase()}</span>
          <i class="bi bi-chevron-down ms-1" style="font-size: 0.7rem; color: #999;"></i>
        </button>
        <div class="dropdown-content ${this._isOpen ? 'show' : ''}">
          ${langs.map(l => html`
            <a href="javascript:void(0)" 
               class="${l.code === this._currentLang ? 'active' : ''}"
               @click="${() => this._selectLang(l.code)}">
              <span class="d-flex align-items-center gap-2">
                <span class="flag">${l.flag}</span> ${l.name}
              </span>
              ${l.code === this._currentLang ? html`<i class="bi bi-check2 check-icon"></i>` : ''}
            </a>
          `)}
        </div>
      </div>
    `;
  }
}
