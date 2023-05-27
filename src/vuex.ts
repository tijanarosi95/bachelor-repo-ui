import Vuex from 'vuex';
import { Disease } from './models/Disease';
import { Drug } from './models/Drug';
import { DrugInferredData } from './models/DrugInferredData';
import { Patient } from './models/Patient';

const state = {
    patients: new Array<Patient>(),
    filteredPatients: new Array<Patient>(),
    drugs: new Array<Drug>(),
    inferredDrugs: new Array<DrugInferredData>(),
    filteredInferredDrugs: new Array<DrugInferredData>(),
    diseases: new Array<Disease>()
}

const store = new Vuex.Store({ 
    state,
    getters: {
        patients: (state) => {
            return state.patients;
        },
        filteredPatients: (state) => {
            return state.filteredPatients;
        },
        drugs: (state) => {
            return state.drugs;
        },
        inferredDrugs: (state) => {
            return state.inferredDrugs;
        },
        filteredInferredDrugs: (state) => {
            return state.filteredInferredDrugs;
        },
        diseases: (state) => {
            return state.diseases;
        }
    },
    actions: {
        patients(context, patients: Patient[]) {
           context.commit('patients', patients);
        },
        createPatient(context, patient: Patient) {
            context.commit('addPatient', patient);
        },
        deletePatient(context, patientJmbg: string) {
            context.commit('removePatient', patientJmbg);
        },
        drugs(context, drugs: Drug[]) {
            context.commit('drugs', drugs);
        },
        createDrug(context, drug: Drug) {
            context.commit('addDrug', drug);
        },
        deleteDrug(context, drugId: string) {
            context.commit('removeDrug', drugId);
        },
        inferredDrugs(context, drugs: DrugInferredData[]) {
            context.commit('inferredDrugs', drugs);
        },
        filterInferredDrugs(context, drugName: string) {
            context.commit('filterInferredDrugs', drugName);
        },
        filterPatients(context, treatedDrug: string) {
            context.commit('filterPatients', treatedDrug);
        },
        diseases(context, diseases: Disease[]) {
            context.commit('diseases', diseases);
        },
        createDisease(context, disease: Disease) {
            context.commit('addDisease', disease);
        }
    },
    mutations: {
        patients(state, patients: Patient[]) {
           state.patients = patients;
           state.filteredPatients = patients;
        },
        addPatient(state, patient: Patient) {
            state.patients.push(patient);
        },
        removePatient(state, patientJmbg: string) {
            state.patients = state.patients.filter(patient => patient.jmbg !== patientJmbg);
        },
        drugs(state, drugs: Drug[]) {
            state.drugs = drugs;
        },
        addDrug(state, drug: Drug) {
            state.drugs.push(drug);
        },
        removeDrug(state, drugId: string) {
            state.drugs = state.drugs.filter(drug => drug.drugId !== drugId);
        },
        inferredDrugs(state, drugs: DrugInferredData[]) {
            state.inferredDrugs = drugs;
            state.filteredInferredDrugs = drugs;
        },
        filterInferredDrugs(state, drugName: string) {
            if (drugName !== '') {
                state.filteredInferredDrugs = state.filteredInferredDrugs.filter(drug => drug.drugName?.includes(drugName));
            } else {
                state.filteredInferredDrugs = state.inferredDrugs;
            }
        },
        filterPatients(state, treatedDrug: string) {
            if (treatedDrug !== '') {
                state.filteredPatients = state.filteredPatients.filter(patient => patient.isTreatedWith?.name?.includes(treatedDrug));
            } else {
                state.filteredPatients = state.patients;
            }
        },
        diseases(state, diseases: Disease[]) {
            state.diseases = diseases;
        },
        addDisease(state, disease: Disease) {
            state.diseases.push(disease);
        }
    }
});

export default store;