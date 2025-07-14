class UrlService {
    public get(): string {
        if (window.location.hostname === 'localhost') {
            return 'http://localhost:3000';
        }

        return 'https://mastery-mirror.pages.dev/';
    }
}

export default new UrlService;
