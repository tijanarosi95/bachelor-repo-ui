<template>
    <div v-if="dialogVisible" class="modal fade show" 
        id="exampleModal"
        role="dialog"
        tabindex="-1" 
        aria-labelledby="exampleModalLabel" 
        aria-hidden="true" 
        style="display:block">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add patient</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="onCloseDialog"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="onAddPatientClick">
                        <div class="mb-3">
                            <label for="jmbg" class="col-form-label">JMBG</label>
                            <input type="text" class="form-control" id="jmbg" v-model="jmbg">
                        </div>
                        <div class="mb-3">
                            <label for="first-name" class="col-form-label">First name</label>
                            <input type="text" class="form-control" id="first-name" v-model="firstName">
                        </div>
                        <div class="mb-3">
                            <label for="last-name" class="col-form-label">Last name</label>
                            <input type="text" class="form-control" id="last-name" v-model="lastName">
                        </div>
                        <div class="mb-3">
                            <label for="age" class="col-form-label">Age</label>
                            <input type="number" class="form-control" id="age" v-model="age">
                        </div>
                        <div class="mb-3">
                            <label for="gender" class="col-form-label">Gender</label>
                            <select class="form-control" id="gender" v-model="gender">
                                <option v-for="option in genderOptions" :key="option.text" :value="option.value">{{ option.text }}</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="lifeQuality" class="col-form-label">Life Quality</label>
                            <select class="form-control" id="lifeQuality" v-model="lifeQuality">
                                <option v-for="option in lifeQualityOptions" :key="option.text" :value="option.value">{{ option.text }}</option>
                            </select>
                        </div>
                        <div class="mb-3 form-check">
                            <label class="form-check-label" for="cancerSpread">Cancer spread</label>
                            <input class="form-check-input" type="checkbox" id="cancerSpread" v-model="cancerSpread">
                        </div>
                        <div class="mb-3 form-check">
                            <label class="form-check-label" for="cancerGrown">Cancer grown</label>
                            <input class="form-check-input" type="checkbox" id="cancerGrown" v-model="cancerGrown">
                        </div>
                        <div class="mb-3 form-check">
                            <label class="form-check-label" for="cancerSpreadToOrgans">Cancer spread to organs</label>
                            <input class="form-check-input" type="checkbox" id="cancerSpreadToOrgans" v-model="cancerSpreadToOrgans">
                        </div>
                        <div class="mb-3 form-check">
                            <label class="form-check-label" for="strongPain">Strong pain</label>
                            <input class="form-check-input" type="checkbox" id="strongPain" v-model="strongPain">
                        </div>
                        <div class="mb-3 form-check">
                            <label class="form-check-label" for="cancerReappeared">Cancer reappeared</label>
                            <input class="form-check-input" type="checkbox" id="cancerReappeared" v-model="cancerReappeared">
                        </div>
                        <div class="mb-3 form-check">
                            <label class="form-check-label" for="weightLoss">Weight loss</label>
                            <input class="form-check-input" type="checkbox" id="weightLoss" v-model="weightLoss">
                        </div>
                        <div class="mb-3 form-check">
                            <label class="form-check-label" for="cancerDetectable">Cancer detectable</label>
                            <input class="form-check-input" type="checkbox" id="cancerDetectable" v-model="cancerDetectable">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="onCloseDialog">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="onAddPatientSubmit">Add</button>
                </div>
            </div>
          </div>
       </div>
</template>

<script lang="ts">
import { Gender } from "@/models/Gender";
import { LifeQuality } from "@/models/LifeQuality";
import { Patient } from "@/models/Patient";
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({ 
    name: 'AddPatientDialog',
    props: {
        visible: Boolean
    },
    data() {
        return {
            dialogVisible: this.visible,
            firstName: '',
            lastName: '',
            jmbg: '',
            age: 0,
            gender: Gender.FEMALE,
            genderOptions: [ { text: 'Male', value: Gender.MALE }, 
                              { text: 'Female', value: Gender.FEMALE } ],
            cancerSpread: false,
            cancerGrown: false,
            cancerSpreadToOrgans: false,
            strongPain: false,
            cancerReappeared: false,
            weightLoss: false,
            cancerDetectable: false,
            lifeQuality: LifeQuality.SAME,
            lifeQualityOptions: [ { text: 'Same', value: LifeQuality.SAME },
                                  { text: 'MuchBetter', value: LifeQuality.MUCH_BETTER },
                                  { text: 'Worse', value: LifeQuality.WORSE } ]                  
        }
    },
    methods: {
        onCloseDialog(): void {
            this.dialogVisible = false;
            this.$emit('close-add-patient-dialog');
        },
        async onAddPatientSubmit() {
            const patient: Patient = {
                jmbg: this.jmbg,
                firstName: this.firstName,
                lastName: this.lastName,
                age: this.age,
                gender: this.gender,
                isCancerSpread: this.cancerSpread,
                isCancerGrown: this.cancerGrown,
                isCancerReappear: this.cancerReappeared,
                isCancerSpreadToOrgans: this.cancerSpreadToOrgans,
                isCanecerDetectable: this.cancerDetectable,
                weightLoss: this.weightLoss,
                strongPain: this.strongPain,
                lifeQuality: this.lifeQuality
            }
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            axios.post('persons', patient)
            .then((response) => {
                console.log('Response from POST /persons ', response.data);
                this.$store.dispatch('createPatient', patient);
                this.dialogVisible = false;
            }).catch((error) => {
                console.log('Error has happened ', error.data);
            });

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

<style scoped>
#exampleModal {
  backdrop-filter: blur(2px);
}
</style>