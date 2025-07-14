import { routerService, Routes } from '../../ts/services/router-service';
import { storageKeys, storageService } from '../../ts/services/storage-service';

class Router extends HTMLElement {
    static observedAttributes = ["url"];

    constructor() {
        super();

        // Localstorage returns an empty string if nothing is found
        if (storageService.get(storageKeys.SkinCode) !== "") {
            const displayPage = routerService.getUrlHtml(Routes.Display);
            this.loadPage(displayPage);
        }
        else {
            const setupPage = routerService.getUrlHtml(Routes.Setup);
            this.loadPage(setupPage);
        }
    }

    // Underscore (_name, _oldValue and _key) is because they aren't used and the build fails otherwise
    attributeChangedCallback(_name: string, _oldValue: string, newValue: string) {
        let newPage: string = "";

        for (const [_key, value] of Object.entries(Routes)) {
            if (newValue === value) {
                newPage = routerService.getUrlHtml(value);
            }
        }

        this.loadPage(newPage);
    }

    private loadPage(page: string): void {
        this.innerHTML = page;
        routerService.callUrlClass();
    }
}

window.customElements.define('router-component', Router);
