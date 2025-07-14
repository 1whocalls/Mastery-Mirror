import SkinTemplate from './champion-skin.html?raw';
import ComponentBase from '../component-base';
import { ComponentProperty, HtmlAttribute } from '../component-property';

class Skin extends ComponentBase {
    constructor() {
        super();

        this.properties.push(
            new ComponentProperty('src', HtmlAttribute.Src),
            new ComponentProperty('alt', HtmlAttribute.Alt),
        );

        const template = super.setTemplate(SkinTemplate);
        this.appendChild(template);
    }
}

window.customElements.define('champion-skin-component', Skin);
