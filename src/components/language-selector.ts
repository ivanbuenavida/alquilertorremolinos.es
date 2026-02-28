import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { TranslationService } from '../services/translation-service';

@customElement('language-selector')
export class LanguageSelector extends LitElement {
  @state() private _currentLang = TranslationService.currentLang;

  static styles = css`
    .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropbtn {
      background: #f7f7f7;
      color: var(--primary-dark);
      padding: 8px 12px;
      font-size: 14px;
      border: 1px solid #efefef;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
    }

    .dropbtn:hover {
      background: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      border-color: var(--primary);
    }

    .dropdown-content {
      display: none;
      position: absolute;
      right: 0;
      background-color: white;
      min-width: 140px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.1);
      z-index: 1000;
      border-radius: 12px;
      margin-top: 8px;
      overflow: hidden;
      border: 1px solid #efefef;
    }

    .dropdown:hover .dropdown-content {
      display: block;
    }

    .dropdown-content a {
      color: #222;
      padding: 10px 16px;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      transition: background 0.2s;
    }

    .dropdown-content a:hover {
      background-color: #f7f7f7;
      color: var(--primary);
    }

    .flag {
      font-size: 1.2rem;
    }
  `;

  private _selectLang(code: any) {
    TranslationService.setLanguage(code);
    this._currentLang = code;
    this.requestUpdate();
  }

  render() {
    const langs = TranslationService.getSupportedLanguages();
    const current = langs.find(l => l.code === this._currentLang);

    return html`
      <div class="dropdown">
        <button class="dropbtn">
          <span class="flag">${current?.flag}</span>
          <span>${this._currentLang.toUpperCase()}</span>
          <i class="bi bi-chevron-down ms-1" style="font-size: 0.7rem;"></i>
        </button>
        <div class="dropdown-content">
          ${langs.map(l => html`
            <a href="javascript:void(0)" @click="${() => this._selectLang(l.code)}">
              <span class="flag">${l.flag}</span> ${l.name}
            </a>
          `)}
        </div>
      </div>
    `;
  }
}
