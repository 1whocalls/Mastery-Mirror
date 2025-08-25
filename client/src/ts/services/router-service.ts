import { storageKeys, storageService } from './storage-service';

class RouterService {
    constructor() {
        if (document.location.pathname == '/') {
            // Localstorage returns an empty string if nothing is found
            if (storageService.get(storageKeys.SkinCode) !== "") {
                this.goToUrl(Routes.Display);
            }
            else {
                this.goToUrl(Routes.Setup);
            }
        }
    }

    public goToUrl(url: string): void {
        document.location.href = url;
    }
}

export const Routes = {
    Setup: 'setup',
    Champions: 'champions',
    Skins: 'skins',
    Display: 'display',
}

export const routerService = new RouterService;
