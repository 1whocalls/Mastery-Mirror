/// <reference path="../html.d.ts" />
import TextfieldTemplate from './textfield.html?raw';
import ComponentBase from '../component-base';
import { ComponentProperty, HtmlAttribute } from '../component-property';

class Textfield extends ComponentBase {
    constructor() {
        super();

        this.properties.push(
            new ComponentProperty('placeholder', HtmlAttribute.Placeholder),
            new ComponentProperty('name', HtmlAttribute.Name),
        );

        const template = super.setTemplate(TextfieldTemplate);
        this.appendChild(template);
    }
}

window.customElements.define('textfield-component', Textfield);
