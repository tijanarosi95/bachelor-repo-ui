import { DiseaseDiagnosis } from "./DiseaseDiagnosis";

export interface PatientDiagnosis {
  type: DiseaseDiagnosis,
  isCancerSpread?: boolean,
  isCancerGrown?: boolean,
  isCancerSpreadToOrgans?: boolean
}