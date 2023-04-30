import { ApprovedDrug } from "./ApprovedDrug";
import { DrugClinicalTestedPhase1 } from "./DrugClinicalTestedPhase1";
import { DrugClinicalTestedPhase2 } from "./DrugClinicalTestedPhase2";
import { DrugClinicalTestedPhase3 } from "./DrugClinicalTestedPhase3";
import { DrugPreclinicalTested } from "./DrugPreclinicalTested";

export interface DrugInferredData {
    drugId?: string,
    drugName?: string,
    activeIngredient?: string,
    preclinicalTestedDrug?: DrugPreclinicalTested,
    clinicalTestedDrugPhase1?: DrugClinicalTestedPhase1,
    clinicalTestedDrugPhase2?: DrugClinicalTestedPhase2,
    clinicalTestedDrugPhase3?: DrugClinicalTestedPhase3,
    approvedDrug?: ApprovedDrug
}