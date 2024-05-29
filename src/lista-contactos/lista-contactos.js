import { LitElement, html, css } from "lit-element";
import "../elemento-lista/elemento-lista";
import "../app-recargas";
class listaContactos extends LitElement {
  static get properties() {
    return {
      contactos: { type: Array },
      currentView: { type: String },
    };
  }

  constructor() {
    super();
    this.currentView = "listaContactos";
  }

  static get styles() {
    return css`
      :host {
      }
      .hidden {
        display: none;
      }
    `;
  }

  render() {
    return html`
      <div class="${this.currentView === "listaContactos" ? "" : "hidden"}">
        ${this.renderList()}
      </div>

      <div class="${this.currentView === "modificarContacto" ? "" : "hidden"}">
        <h1>Componente modificar contacto</h1>
      </div>
      <div class="${this.currentView === "recargarContacto" ? "" : "hidden"}">
        <h1>Componente de recarga telefonica</h1>
      </div>
    `;
  }
  renderList() {
    return html`
      <p>Lista de contactos</p>
      ${this.contactos.map(
        (contacto) => html`

          <elemento-lista
            name="${contacto.name}"
            phone="${contacto.phone}"
            company="${contacto.company}"
            @navigateList="${(e) => this.navigateList(e.detail.page)}"
          ></elemento-lista>
        `
      )}
      <button @click="${() =>this.emitEvent("inicio")}">Regresar</button>
    `;
  }
  navigateList(page) {
    this.currentView = page;
  }
  emitEvent(page) {
    this.dispatchEvent(
      new CustomEvent("navigate", {
        detail: { page },
        composed: true,
        bubbles: true,
      })
    );
  }
}

customElements.define("lista-contactos", listaContactos);
