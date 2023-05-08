import { Disease } from "./Disease";

export interface Drug {
    drugId?: number,
    name?: string,
    activeIngredient?: string,
    isDoseRanged?: boolean,
    hasEfficacy?: boolean,
    hasToxicity?: boolean,
    hasSideEffects?: boolean
    hasTherapeuticEffect?: boolean,
    isApproved?: boolean,
    mayTreat?: Disease[]
}