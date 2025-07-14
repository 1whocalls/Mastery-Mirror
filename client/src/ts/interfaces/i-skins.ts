export interface ISkins {
    data: IChampion;
}

interface IChampion {
    [name: string]: IChampionSkins
}

interface IChampionSkins {
    skins: Array<ISkin>
}

interface ISkin {
    num: number,
    name: string,
}
