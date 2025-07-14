import type IPage from "../../ts/interfaces/i-page";
import type { ISkins } from "../../ts/interfaces/i-skins";
import httpService from "../../ts/services/http-service";
import { routerService, Routes } from "../../ts/services/router-service";
import { storageKeys, storageService } from "../../ts/services/storage-service";

class SkinsPage implements IPage {
    private skinsElement: HTMLElement | null = null;

    public pageCreate() {
        this.skinsElement = document.querySelector('[data-skins]');

        window.addEventListener('back-to-champions', this.back, true); // Needs useCapture: true to capture event

        this.loadSkins();
    }

    private back(): void {
        routerService.goToUrl(Routes.Champions);
    }

    private async loadSkins(): Promise<void> {
        const skins = await httpService.getSkins();
        const championName = storageService.get(storageKeys.ChampionName);

        for (const skin of (skins as ISkins).data[championName].skins) {
            const newSkin = `<champion-skin-component src="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName}_${skin.num}.jpg" alt="${skin.name}"></champion-skin-component>`;

            this.skinsElement?.insertAdjacentHTML("beforeend", newSkin);

            const skinElement = this.skinsElement?.querySelector(`img[alt="${skin.name}"]`)?.parentElement;

            skinElement?.addEventListener('click', this.click.bind(this, skin.num));
        }
    }

    private click(skinCode: number): void {
        storageService.set(storageKeys.SkinCode, String(skinCode));
        routerService.goToUrl(Routes.Display);
    }
}

export default new SkinsPage;
