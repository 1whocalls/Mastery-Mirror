class StorageService {
    public save(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
}

export const StorageKeys = {
    GameName: 'gamename',
    TagLine: 'tagline',
    Region: 'region',
    RegionCode: 'regioncode',
    Puuid: 'puuid',
    DDragonVersion: 'ddragonversion',
    ChampionName: 'championname',
    SkinCode: 'skincode',
    ProfileIconCode: 'profileiconcode'
}

export const storageService = new StorageService;
