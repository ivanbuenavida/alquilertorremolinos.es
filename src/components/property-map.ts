import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('property-map')
export class PropertyMap extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <section class="mb-5">
        <h3 class="fw-semibold mb-4 text-dark">¿Dónde dormirás?</h3>
        <div class="rounded-4 overflow-hidden border" style="height: 400px; background-color: #f8f9fa;">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14138.82424443152!2d-4.508544062534591!3d36.62319985926671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72fb4d014bc08d%3A0x67623a1a5b48192a!2sTorremolinos%2C%20M%C3%A1laga!5e0!3m2!1ses!2ses!4v1709400000000!5m2!1ses!2ses" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>
    `;
  }
}
