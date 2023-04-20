import { DiseaseSymptom } from "./DiseaseSymptom";
import { LifeQuality } from "./LifeQuality";

export interface PatientSymptom {
    type: DiseaseSymptom,
    strongPain?: boolean,
    weightLoss?: boolean,
    lifeQuality?: LifeQuality
}