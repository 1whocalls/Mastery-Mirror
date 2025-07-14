import NotificationTemplate from './notification.html?raw';
import ComponentBase from '../component-base';

class Notification extends ComponentBase {
    constructor() {
        super();

        const template = super.setTemplate(NotificationTemplate);
        this.appendChild(template);
    }
}

window.customElements.define('notification-component', Notification);
