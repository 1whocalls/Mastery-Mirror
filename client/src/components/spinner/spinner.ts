import SpinnerTemplate from './index.html?raw';
import ComponentBase from '../component-base';

class Spinner extends ComponentBase {
    constructor() {
        super();

        const template = super.setTemplate(SpinnerTemplate);
        this.appendChild(template);
    }
}

window.customElements.define('spinner-component', Spinner);
