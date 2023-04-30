export interface Drug {
    drugId?: string,
    name?: string,
    activeIngredient?: string,
    isDoseRanged?: boolean,
    hasEfficacy?: boolean,
    hasToxicity?: boolean,
    hasSideEffects?: boolean
    hasTherapeuticEffect?: boolean,
    isApproved?: boolean
}