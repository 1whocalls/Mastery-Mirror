import type IAccountInfo from '../interfaces/i-account-info';
import Regions from '../regions.json';
import SpinnerService from './spinner-service';

class HttpService {
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

    private async setDdragonVersion() {
        const response: Response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');

        if (response.ok) {
            // Save retrieved ddragonVersion
        } else {
            // Display message "Could not retrieve latest skins, some skins may be missing" for 4 seconds
            // Save ddragonVersion 15.12.1
        }
    }

    private async storeProfileIconCode() {
        const response: Response = await fetch(`https://${/* Get regioncode from storage */1}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${/* Get puuid from storage */1}`); // proxy adds api key ?api_key=apiKey

        if (response.ok) {
            // Save profileIconCode
        } else {
            // Display message "Could not retrieve profile icon" for 3 seconds
        }
    }

    private async getChampions() {
        await this.setDdragonVersion();

        const response: Response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${/* Get ddragonVersion from storage */1}/data/en_US/champion.json`);

        if (response.ok) {
            return response.body;
        } else {
            // Display message "Could not retrieve champions" for 3 seconds
            return [];
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