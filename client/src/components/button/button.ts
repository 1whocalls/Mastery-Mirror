/// <reference path="../html.d.ts" />
import ButtonTemplate from './button.html?raw';
import ComponentBase from '../component-base';
import { ComponentProperty, HtmlAttribute } from '../component-property';

class Button extends ComponentBase {
    constructor() {
        super();

        this.properties.push(
            new ComponentProperty('text', HtmlAttribute.InnerHtml),
        );

        const template = super.setTemplate(ButtonTemplate);

        if (this.hasAttribute('click-event')) {
            template.addEventListener('click', this.clickEvent.bind(this));
        }

        this.appendChild(template);
    }

    clickEvent(): void {
        const eventName = this.getAttribute('click-event')!;

        this.dispatchEvent(new CustomEvent(eventName));
    }
}

window.customElements.define('button-component', Button);
