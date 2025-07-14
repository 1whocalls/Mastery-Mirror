class MenuService {
    private menuComponent: HTMLElement | null = null;

    public show(): void {
        this.setComponent();

        this.menuComponent?.classList.remove('menu__hide');
    }

    public hide(): void {
        this.setComponent();

        this.menuComponent?.classList.add('menu__hide');
    }

    private setComponent(): void {
        if (this.menuComponent == null) {
            this.menuComponent = document.querySelector('[data-menu]');
        }
    }
}

export default new MenuService;
