import { Disease } from "./Disease";
import { Drug } from "./Drug";
import { Gender } from "./Gender";
import { LifeQuality } from "./LifeQuality";

export interface Patient {
    jmbg: string,
    firstName: string,
    lastName: string,
    age: number,
    gender: Gender,
    isCancerSpread: boolean,
    isCancerGrown: boolean,
    isCancerSpreadToOrgans: boolean,
    strongPain: boolean,
    weightLoss: boolean,
    isCancerReappear: boolean,
    isCancerDetectable: boolean,
    lifeQuality: LifeQuality,
    hasDisease?: Disease,
    isTreatedWith?: Drug,
}