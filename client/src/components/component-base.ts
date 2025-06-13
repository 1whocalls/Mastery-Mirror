import { ComponentProperty, HtmlAttribute } from "./component-property";

export default class ComponentBase extends HTMLElement {
    protected properties: Array<ComponentProperty> = [];

    constructor() {
        super();
    }

    protected setTemplate(template: string): Element {
        const html = new DOMParser().parseFromString(template, 'text/html').body;

        this.setAttr(html);

        return html.children[0];
    }

    private setAttr(html: HTMLElement) {
        for (const prop of this.properties) {
            const attr = prop.getName();
            const value = this.getAttribute(prop.getName())!;

            if (attr === null) {
                return
            }

            switch (prop.getType()) {
                case HtmlAttribute.InnerHtml:
                    html.querySelector(`[${attr}]`)!.innerHTML = value;
                    break;
                case HtmlAttribute.Placeholder:
                    (html.querySelector(`[${attr}]`) as HTMLInputElement).placeholder = value;
                    break;
                case HtmlAttribute.Name:
                    (html.querySelector(`[${attr}]`) as HTMLInputElement).name = value;
                    break;
            }

            this.removeAttr(attr);
        }
    }

    private removeAttr(attr: string) {
        this.removeAttribute(attr);
    }
}
