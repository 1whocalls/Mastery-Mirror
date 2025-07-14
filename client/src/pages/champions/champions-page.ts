import type { IChampion } from "../../ts/interfaces/i-champions";
import type IPage from "../../ts/interfaces/i-page";
import httpService from "../../ts/services/http-service";
import { routerService, Routes } from "../../ts/services/router-service";
import { storageKeys, storageService } from "../../ts/services/storage-service";

class ChampionsPage implements IPage {
    private champions: Array<IChampion> = [];
    private championsElement: HTMLElement | null = null;
    private championElements: Array<ChampionElement> = [];
    private searchElement: HTMLInputElement | null = null;

    public async pageCreate(): Promise<void> {
        const champions = await httpService.getChampions();
        this.championsElement = document.querySelector('[data-champions]');
        this.searchElement = document.getElementsByName('search')[0] as HTMLInputElement;

        if (champions !== null) {
            for (const champion in champions.data) {
                const typedChampion = champions.data[champion] as IChampion;

                this.champions.push(typedChampion);
            }
        }

        this.searchElement?.addEventListener('input', this.search.bind(this));

        this.loadChampions();
    }

    private loadChampions(): void {
        for (const champion of this.champions) {
            const newSkin = `<champion-skin-component src="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg" alt="${champion.id}"></champion-skin-component>`;

            this.championsElement?.insertAdjacentHTML("beforeend", newSkin);

            const championElement = this.championsElement?.querySelector(`img[alt="${champion.id}"]`)?.parentElement;

            if (championElement != null) {
                this.championElements.push(new ChampionElement(champion.id, championElement));
                championElement.addEventListener('click', this.click.bind(this, champion.id));
            }
        }
    }

    private search(): void {
        const searchInput = this.searchElement?.value;

        if (searchInput != undefined) {
            for (const el of this.championElements) {
                if (el.name.includes(searchInput)) {
                    el.show();
                } else {
                    el.hide();
                }
            }
        }
    }

    private click(id: string): void {
        storageService.set(storageKeys.ChampionName, id);
        routerService.goToUrl(Routes.Skins);
    }
}

class ChampionElement {
    public name: string;
    private element: HTMLElement;

    constructor(name: string, element: HTMLElement) {
        this.name = name;
        this.element = element;
    }

    public hide(): void {
        this.element.classList.add('hide');
    }

    public show(): void {
        this.element.classList.remove('hide');
    }
}

export default new ChampionsPage;
