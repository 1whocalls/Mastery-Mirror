import MenuTemplate from './menu.html?raw';
import ComponentBase from '../component-base';
import { routerService, Routes } from '../../ts/services/router-service';
import { storageService } from '../../ts/services/storage-service';
import menuService from '../../ts/services/menu-service';

class Menu extends ComponentBase {
    private closeButton: HTMLElement | null = null;
    private logoutButton: HTMLElement | null = null;

    constructor() {
        super();

        const template = super.setTemplate(MenuTemplate);
        this.appendChild(template);

        this.closeButton = this.querySelector('[data-close]');
        this.logoutButton = this.querySelector('[data-logout]');

        this.closeButton?.addEventListener('click', () => { menuService.hide() });
        this.logoutButton?.addEventListener('click', this.logout.bind(this));
    }

    private logout(): void {
        storageService.clear();
        routerService.goToUrl(Routes.Setup);
    }
}

window.customElements.define('menu-component', Menu);
