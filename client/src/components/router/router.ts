import { routerService, Routes } from '../../ts/services/router-service';
import { storageKeys, storageService } from '../../ts/services/storage-service';

class Router extends HTMLElement {
    static observedAttributes = ["url"];

    constructor() {
        super();

        // Temp check if routing is possible
        // Todo refactor to only go to detail page when name, champion and skin are chosen
        if (storageService.get(storageKeys.Puuid) !== null) {
            const championsPage = routerService.getUrlHtml(Routes.Champions);
            this.loadPage(championsPage);
            routerService.callUrlClass();
        }
        else {
            const setupPage = routerService.getUrlHtml(Routes.Setup);
            this.loadPage(setupPage);
            routerService.callUrlClass();
        }
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        let newPage: string = "";

        for (const [key, value] of Object.entries(Routes)) {
            if (newValue === value) {
                newPage = routerService.getUrlHtml(value);
            }
        }

        this.loadPage(newPage);
        routerService.callUrlClass();
    }

    private loadPage(page: string): void {
        this.innerHTML = page;
    }
}

window.customElements.define('router-component', Router);
