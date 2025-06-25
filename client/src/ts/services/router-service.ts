/// <reference path="../../components/html.d.ts" />
import SetupPage from '../../pages/setup/setup-page';
import SetupPageHtml from '../../pages/setup/setup-page.html?raw';
import ChampionsPage from '../../pages/champions/champions-page';
import ChampionsPageHtml from '../../pages/champions/champions-page.html?raw';
import SkinsPage from '../../pages/skins/skins-page';
import SkinsPageHtml from '../../pages/skins/skins-page.html?raw';
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
            case Routes.Skins:
                this.activePage = SkinsPage;
                return SkinsPageHtml;
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
    Skins: 'skins',
}

export const routerService = new RouterService;
