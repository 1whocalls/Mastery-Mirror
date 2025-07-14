import type IAccountInfo from "../../ts/interfaces/i-account-info";
import type IPage from "../../ts/interfaces/i-page";
import HttpService from "../../ts/services/http-service";
import { Notification, notificationSerice } from "../../ts/services/notification-service";
import { routerService, Routes } from "../../ts/services/router-service";
import { storageKeys, storageService } from "../../ts/services/storage-service";

class SetupPage implements IPage {
    public pageCreate() {
        const forms = document.getElementsByTagName('form');

        for (const form of forms) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
            });
        }

        window.addEventListener('setup-next', this.submit, true); // Needs useCapture: true to capture event
    }

    public async submit() {
        const gameName = (document.getElementsByName('gameName')[0] as HTMLInputElement).value;

        if (gameName === "") {
            return;
        }

        const response: IAccountInfo | null = await HttpService.getPuuid(gameName);

        if (response != null) {
            storageService.set(storageKeys.GameName, response.gameName);
            storageService.set(storageKeys.Puuid, response.puuid);
            storageService.set(storageKeys.TagLine, response.tagLine);

            routerService.goToUrl(Routes.Champions);
        } else {
            notificationSerice.add(
                new Notification('Game name is invalid', 3000)
            );
        }
    }
}

export default new SetupPage;
