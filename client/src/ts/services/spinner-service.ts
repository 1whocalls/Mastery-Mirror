class SpinnerService {
    private spinnerComponent: HTMLElement;
    private isShowing: boolean = false;
    private timer: number = 0;
    private timerValue: number = 0; // 1 = 1s
    private minShowTime = 2; // In seconds

    constructor() {
        this.spinnerComponent = document.querySelector('[data-spinner]')!;
    }

    public show(): void {
        if (this.isShowing) {
            return;
        } else {
            this.isShowing = true;
        }

        this.startTimer();

        this.spinnerComponent.classList.add('spinner--show');
    }

    public hide(): void {
        if (this.timerValue < this.minShowTime) {
            this.wait();
            return;
        }

        if (this.isShowing) {
            this.spinnerComponent.classList.remove('spinner--show');

            this.stopTimer();
            this.isShowing = false;
        }
    }

    private startTimer(): void {
        this.timer = setInterval(() => {
            this.timerValue += 1;
        }, 1000);
    }

    private stopTimer(): void {
        clearInterval(this.timer);
        this.timerValue = 0;
    }

    private wait(): void {
        setInterval(() => {
            if (this.timerValue == this.minShowTime) {
                this.hide();
            }
        }, 100);
    }
}

export default new SpinnerService;
