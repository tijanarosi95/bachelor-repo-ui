<template>
    <div v-if="dialogVisible" class="modal fade show" 
        id="patientDiseaseModal"
        role="dialog"
        tabindex="-1" 
        aria-labelledby="examplePatientDiseaseModal" 
        aria-hidden="true" 
        style="display:block">

        <div class="modal-dialog">
            <div class="modal-content">
                 <div class="modal-header">
                    <h5 class="modal-title" id="examplePatientDiseaseModal">Add patient disease</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="onCloseDialog"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="onAddPatientDiseaseSubmit">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" name="diseaseGroup" type="radio" id="newOne" value="new" v-model="radioValue">
                            <label class="form-check-label" for="newOne">Add new disease</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" name="diseaseGroup" type="radio" id="existingOne" value="existing" v-model="radioValue">
                            <label class="form-check-label" for="existingOne">Select existing one</label>
                        </div>

                        <div class="mb-3" v-if="radioValue === 'new'">
                            <label for="name" class="col-form-label">Disease name</label>
                            <input type="text" class="form-control" id="name" v-model="diseaseName">
                        </div>
                        
                        <div class="mb-3" v-if="radioValue === 'existing'">
                            <label for="selectDisease" class="col-form-label">Select disease</label>
                            <select class="form-control" id="selectDisease" v-model="diseaseName">
                                <option v-for="disease in diseases" :key="disease.id" :value="disease.name">{{ disease.name }}</option>
                            </select>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="onCloseDialog">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="onAddPatientDiseaseSubmit">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PatientDiseaseData from "@/models/PatientDiseaseData";
import axios from "axios";

export default defineComponent({
    name: 'AddPatientDiseaseDialog',
    props: {
        visible: Boolean,
        jmbg: String,
        firstName: String,
        lastName: String
    },
    data() {
        return {
            radioValue: 'new',
            dialogVisible: this.visible,
            diseaseName: '',
            diseases: []
        }
    },
    async created() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        await axios.get('/diseases')
        .then((response) => {
            console.log('Response from GET /diseases ', response.data);
            this.diseases = response.data;

        })
        .catch((error) => {
            console.log('Erorr occurred ', error.data);
        })
    },
    methods: {
        onCloseDialog(): void {
            this.dialogVisible = false;
            this.$emit('close-add-patient-disease-dialog');
        },
        async onAddPatientDiseaseSubmit() {
            const patientDisease: PatientDiseaseData = {
                patientId: this.jmbg,
                firstName: this.firstName,
                lastName: this.lastName,
                disease: {
                    id: this.randomInt(1, 10000),
                    name: this.diseaseName
                }
            }
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            axios.post('/diseases/person-disease', patientDisease)
            .then((response) => {
                console.log('Response from POST /diseases/person-disease ', response.data);
                this.$emit('add-patient-disease', patientDisease.disease?.id, patientDisease.disease?.name);
                this.dialogVisible = false;
            })
            .catch((error) => {
                console.log('Error has happened ', error.data);
            });
        },
        randomInt(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    },
    watch: { 
      visible: function visible (newVal, oldVal) { // watch it
        this.dialogVisible = newVal;
        console.log('new' + newVal + '==' + oldVal);
      }
    }
});
</script>