export interface ApprovedDrug {
    type: string,
    hasSideEffects?: boolean,
    isDoseRanged?: boolean,
    hasEfficacy?: boolean,
    hasToxicity?: boolean,
    hasTherapeuticEffect?: boolean,
    isApproved?: boolean
}