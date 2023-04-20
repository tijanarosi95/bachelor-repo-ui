import { DiseaseCourse } from "./DiseaseCourse";

export interface PatientDiseaseCourse {
    type: DiseaseCourse,
    isCancerReappear?: boolean,
    isCancerDetectable?: boolean,
}