class NotificationSerice {
    private notifications: Array<Notification> = [];
    private isShowing: boolean = false;
    private notificationComponent: HTMLElement;

    constructor() {
        this.notificationComponent = document.querySelector('[data-notification]')!;
    }

    public add(notification: Notification) {
        this.notifications.push(notification);

        this.display();
    }

    public async display() {
        const notification = this.notifications[0];

        if (this.isShowing) {
            return;
        } else {
            this.isShowing = true;
        }

        this.notificationComponent.innerHTML = notification.getText();
        this.notificationComponent.classList.add('notification--show');

        // Duration + show animation
        await new Promise(resolve => setTimeout(resolve, notification.getDuration() + 1000));

        // Hide animation
        this.notificationComponent.classList.remove('notification--show');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Remove notification from this.notifications
        this.notifications.splice(0, 1);

        this.isShowing = false;

        if (this.notifications.length != 0) {
            this.display();
        }
    }
}

export class Notification {
    private text: string;
    private duration: number;

    constructor(text: string, duration: number) {
        this.text = text;
        this.duration = duration;
    }

    public getText() {
        return this.text;
    }

    public getDuration() {
        return this.duration;
    }
}

export const notificationSerice = new NotificationSerice;
