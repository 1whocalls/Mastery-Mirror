class UrlService {
    public get(): string {
        if (window.location.hostname === 'localhost') {
            return 'http://127.0.0.1:8787';
        }

        return 'https://mastery-mirror-api.1whocalls.workers.dev/';
    }
}

export default new UrlService;
