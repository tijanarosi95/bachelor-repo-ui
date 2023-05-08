import Vuex from 'vuex';
import { Drug } from './models/Drug';
import { DrugInferredData } from './models/DrugInferredData';
import { Patient } from './models/Patient';

const state = {
    patients: new Array<Patient>(),
    drugs: new Array<Drug>(),
    inferredDrugs: new Array<DrugInferredData>(),
    filteredInferredDrugs: new Array<DrugInferredData>()
}

const store = new Vuex.Store({ 
    state,
    getters: {
        patients: (state) => {
            return state.patients;
        },
        drugs: (state) => {
            return state.drugs;
        },
        inferredDrugs: (state) => {
            return state.inferredDrugs;
        },
        filteredInferredDrugs: (state) => {
            return state.filteredInferredDrugs;
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
        deleteDrug(context, drugId: number) {
            context.commit('removeDrug', drugId);
        },
        inferredDrugs(context, drugs: DrugInferredData[]) {
            context.commit('inferredDrugs', drugs);
        },
        filterInferredDrugs(context, drugName: string) {
            context.commit('filterInferredDrugs', drugName);
        }
    },
    mutations: {
        patients(state, patients: Patient[]) {
           state.patients = patients;
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
        removeDrug(state, drugId: number) {
            state.drugs = state.drugs.filter(drug => drug.drugId !== drugId);
        },
        inferredDrugs(state, drugs: DrugInferredData[]) {
            state.inferredDrugs = drugs;
        },
        filterInferredDrugs(state, drugName: string) {
            state.filteredInferredDrugs = [...state.inferredDrugs];
            drugName === '' ? state.filteredInferredDrugs : state.filteredInferredDrugs.filter(drug => drug.drugName?.includes(drugName));
        }
    }
});

export default store;