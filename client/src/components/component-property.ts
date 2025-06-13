export class ComponentProperty {
    private name: string;
    private type: string;

    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }

    public getName(): string {
        return this.name;
    }

    public getType(): string {
        return this.type;
    }
}

export const HtmlAttribute = {
    InnerHtml: 'innerhtml',
    Placeholder: 'placeholder',
    Name: 'name',
}
