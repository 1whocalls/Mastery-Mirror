/// <reference path="../../components/html.d.ts" />
import SetupPage from '../../pages/setup/setup-page.html?raw';
import ChampionsPage from '../../pages/champions/champions-page.html?raw';

class RouterService {
    private routerElement: HTMLElement;

    constructor() {
        this.routerElement = document.querySelector('router-component')!;
    }

    public goToUrl(url: string): void {
        this.routerElement.setAttribute('url', url);
    }

    public getUrlHtml(url: string): string {
        switch (url) {
            case Routes.Setup:
                return SetupPage;
            case Routes.Champions:
                return ChampionsPage;
        }

        return SetupPage;
    }
}

export const Routes = {
    Setup: 'setup',
    Champions: 'champions',
}

export const routerService = new RouterService;
