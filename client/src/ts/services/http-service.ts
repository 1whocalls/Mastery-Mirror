import type IAccountInfo from '../interfaces/i-account-info';
import type { IChampions } from '../interfaces/i-champions';
import Regions from '../regions.json';
import { Notification, notificationSerice } from './notification-service';
import SpinnerService from './spinner-service';
import { storageKeys, storageService } from './storage-service';

class HttpService {
    private async setDdragonVersion(): Promise<void> {
        const response: Response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');

        if (response.ok) {
            const versions = await response.json();

            storageService.save(storageKeys.DDragonVersion, versions[0]);
        } else {
            notificationSerice.add(
                new Notification('Could not retrieve latest skins, some skins may be missing', 4)
            );

            // Latest version as of making this commit
            storageService.save(storageKeys.DDragonVersion, '15.12.1');
        }
    }

    public async getPuuid(gameName: string): Promise<IAccountInfo | null> {
        SpinnerService.show();

        for (const element of Regions) {
            const response: Response = await fetch(`http://localhost:3000/acount/${element.region}/${gameName}/${element.tagLine}`);

            // Todo check all regions and if more than 1 returns return list so user can choose

            if (response.ok) {
                SpinnerService.hide();

                return JSON.parse(await response.json());
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

    private async storeProfileIconCode(): Promise<void> {
        const response: Response = await fetch(`https://${/* Get regioncode from storage */1}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${/* Get puuid from storage */1}`); // proxy adds api key ?api_key=apiKey

        if (response.ok) {
            // Save profileIconCode
        } else {
            // Display message "Could not retrieve profile icon" for 3 seconds
        }
    }

    private async getSkins(championName: string) {
        const response: Response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${/* Get ddragonVersion from storage */1}/data/en_US/champion/${championName}.json`);

        if (response.ok) {
            return response.body;
        } else {
            // Display message "Could not retrieve champion skins" for 3 seconds
            return [];
        }
    }
}

export default new HttpService;