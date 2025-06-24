/// <reference path="../../components/html.d.ts" />
import SetupPageHtml from '../../pages/setup/setup-page.html?raw';
import ChampionsPageHtml from '../../pages/champions/champions-page.html?raw';
import ChampionsPage from '../pages/champions-page';
import SetupPage from '../pages/setup-page';
import type IPage from '../interfaces/i-page';

class RouterService {
    private routerElement: HTMLElement;
    private activePage: IPage = SetupPage;

    constructor() {
        this.routerElement = document.querySelector('router-component')!;
    }

    public goToUrl(url: string): void {
        this.routerElement.setAttribute('url', url);
    }

    public getUrlHtml(url: string): string {
        switch (url) {
            case Routes.Setup:
                this.activePage = SetupPage;
                return SetupPageHtml;
            case Routes.Champions:
                this.activePage = ChampionsPage;
                return ChampionsPageHtml;
        }

        this.activePage = SetupPage;
        return SetupPageHtml;
    }

    public callUrlClass(): void {
        this.activePage.pageCreate();
    }
}

export const Routes = {
    Setup: 'setup',
    Champions: 'champions',
}

export const routerService = new RouterService;
