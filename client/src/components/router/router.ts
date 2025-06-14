import { routerService, Routes } from '../../ts/services/router-service';

class Router extends HTMLElement {
    static observedAttributes = ["url"];

    constructor() {
        super();

        const setupPage = routerService.getUrlHtml(Routes.Setup);
        this.loadPage(setupPage);
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        let newPage: string = "";

        for (const [key, value] of Object.entries(Routes)) {
            if (newValue === value) {
                newPage = routerService.getUrlHtml(value);
            }
        }

        this.loadPage(newPage);
    }

    private loadPage(page: string): void {
        this.innerHTML = page;
    }
}

window.customElements.define('router-component', Router);
