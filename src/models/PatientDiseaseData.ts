import { Disease } from "./Disease";

export default interface PatientDiseaseData {
    patientId?: string,
    firstName?: string,
    lastName?:string,
    disease?: Disease
}