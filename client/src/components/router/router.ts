/// <reference path="../html.d.ts" />
import SetupPage from '../../pages/setup/setup-page.html?raw';

class Router extends HTMLElement {
    constructor() {
        super();
        this.insertAdjacentHTML('beforeend', SetupPage);
    }
}

window.customElements.define('router-component', Router);
