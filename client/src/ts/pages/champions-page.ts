import type { IChampion } from "../interfaces/i-champions";
import type IPage from "../interfaces/i-page";
import httpService from "../services/http-service";

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
            }
        }
    }

    private search(): void {
        const searchInput = this.searchElement?.value!;

        for (const el of this.championElements) {
            if (el.name.includes(searchInput)) {
                el.show();
            } else {
                el.hide();
            }
        }
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
