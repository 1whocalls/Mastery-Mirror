import type { IChampion } from "../interfaces/i-champions";

export default class ChampionSchema implements IChampion {
    public id: string;

    constructor(id: string) {
        this.id = id;
    }
}
