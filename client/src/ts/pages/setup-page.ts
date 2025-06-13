import HttpService from "../services/http-service";
import { Notification, notificationSerice } from "../services/notification-service";

class SetupPage {
    constructor() {
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

        const response: string = await HttpService.getPuuid(gameName);

        if (response != "") {
            console.log(response);
        } else {
            notificationSerice.add(
                new Notification('Game name is invalid', 3000)
            );
        }
    }
}

new SetupPage;
