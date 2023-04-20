import { Disease } from "./Disease";
import { Gender } from "./Gender";
import { PatientDiagnosis } from "./PatientDiagnosis";
import { PatientDiseaseCourse } from "./PatientDiseaseCourse";
import { PatientSymptom } from "./PatientSymptom";

export interface PatientInferredData {
    jmbg: string,
    firstName: string,
    lastName: string,
    age: number,
    gender: Gender,
    diseaseCourse?: PatientDiseaseCourse,
    diagnosis?: PatientDiagnosis,
    symptoms?: PatientSymptom,
    hasDisease?: Disease
}