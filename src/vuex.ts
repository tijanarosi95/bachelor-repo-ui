import Vuex from 'vuex';
import { Patient } from './models/Patient';

const state = {
    patients: new Array<Patient>()
}

const store = new Vuex.Store({ 
    state,
    getters: {
        patients: (state) => {
            return state.patients;
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
        }
    }
});

export default store;