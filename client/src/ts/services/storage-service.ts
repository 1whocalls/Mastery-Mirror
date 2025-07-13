class StorageService {
    public save(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    public get(key: string): string {
        const item = localStorage.getItem(key);

        if (item !== null) {
            return item
        }

        return "";
    }
}

export const storageKeys = {
    GameName: 'gamename',
    TagLine: 'tagline',
    Region: 'region',
    RegionCode: 'regioncode',
    Puuid: 'puuid',
    DDragonVersion: 'ddragonversion',
    ChampionName: 'championname',
    SkinCode: 'skincode',
}

export const storageService = new StorageService;
