import type IAccountInfo from '../interfaces/i-account-info';
import type { IChampions } from '../interfaces/i-champions';
import type IDisplayInfo from '../interfaces/i-display-info';
import Regions from '../regions.json';
import { Notification, notificationSerice } from './notification-service';
import SpinnerService from './spinner-service';
import { storageKeys, storageService } from './storage-service';
import urlService from './url-service';

class HttpService {
    private async setDdragonVersion(): Promise<void> {
        const response: Response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');

        if (response.ok) {
            const versions = await response.json();

            storageService.set(storageKeys.DDragonVersion, versions[0]);
        } else {
            notificationSerice.add(
                new Notification('Could not retrieve latest skins, some skins may be missing', 4)
            );

            // Latest version as of making this commit
            storageService.set(storageKeys.DDragonVersion, '15.12.1');
        }
    }

    public async getPuuid(gameName: string): Promise<IAccountInfo | null> {
        SpinnerService.show();

        for (const element of Regions) {
            const response: Response = await fetch(`${urlService.get()}/account/${element.region}/${gameName}/${element.tagLine}`);

            // Todo check all regions and if more than 1 returns return list so user can choose

            if (response.ok) {
                SpinnerService.hide();

                storageService.set(storageKeys.RegionCode, element.code);

                return await response.json();
            }
        }

        SpinnerService.hide();

        return null;
    }

    public async getChampions(): Promise<IChampions | null> {
        await this.setDdragonVersion();

        const response: Response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${storageService.get(storageKeys.DDragonVersion)}/data/en_US/champion.json`);

        if (response.ok) {
            return await response.json();
        } else {
            notificationSerice.add(
                new Notification('Could not retrieve champions, try reloading the page', 5)
            );

            return null;
        }
    }

    public async getProfileIconCode(): Promise<IDisplayInfo | null> {
        const iconCodeResponse: Response = await fetch(`${urlService.get()}/iconcode/${storageService.get(storageKeys.RegionCode)}/${storageService.get(storageKeys.Puuid)}`);

        if (iconCodeResponse.ok) {
            return await iconCodeResponse.json();
        } else {
            notificationSerice.add(
                new Notification('Could not retrieve profile icon', 3)
            );

            return null;
        }
    }

    public async getSkins() {
        await this.setDdragonVersion();

        const championName = storageService.get(storageKeys.ChampionName);
        const response: Response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${storageService.get(storageKeys.DDragonVersion)}/data/en_US/champion/${championName}.json`);

        if (response.ok) {
            return await response.json();
        } else {
            notificationSerice.add(
                new Notification('Could not retrieve champion skins', 3)
            );

            return [];
        }
    }
}

export default new HttpService;
