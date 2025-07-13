import type IPage from "../../ts/interfaces/i-page";
import httpService from "../../ts/services/http-service";
import { storageKeys, storageService } from "../../ts/services/storage-service";

class DisplayPage implements IPage {
    private displayElement: HTMLElement | null = null;
    private championImageElement: HTMLImageElement | null = null;
    private profileIconImageElement: HTMLImageElement | null = null;
    private nameElement: HTMLImageElement | null = null;

    public async pageCreate() {
        this.displayElement = document.querySelector('[data-display]');
        this.championImageElement = document.querySelector('[data-display-champion]');
        this.profileIconImageElement = document.querySelector('[data-display-profile-icon]');
        this.nameElement = document.querySelector('[data-display-name]');

        this.loadChampion();
        this.loadName();
        const iconCode = await httpService.getProfileIconCode();

        if (iconCode != null) {
            this.loadProfileIcon(iconCode.profileIconId);
        }
    }

    private loadChampion(): void {
        this.championImageElement?.setAttribute('src', `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${storageService.get(storageKeys.ChampionName)}_${storageService.get(storageKeys.SkinCode)}.jpg`);
    }

    private loadName(): void {
        if (this.nameElement !== null) {
            this.nameElement.innerHTML = storageService.get(storageKeys.GameName);
        }
    }

    private loadProfileIcon(iconCode: number): void {
        this.profileIconImageElement?.setAttribute('src', `https://ddragon.leagueoflegends.com/cdn/${storageService.get(storageKeys.DDragonVersion)}/img/profileicon/${iconCode}.png`);
    }
}

export default new DisplayPage;
