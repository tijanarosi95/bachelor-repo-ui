<template>
<div v-if="dialogVisible" class="modal fade show" 
        id="exampleUpdatePatientModal"
        role="dialog"
        tabindex="-1" 
        aria-labelledby="exampleUpdatePatientModalLabel" 
        aria-hidden="true" 
        style="display:block">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleUpdatePatientModalLabel">Update patient info</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="onCloseDialog"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="jmbg" class="col-form-label">JMBG</label>
                            <input type="text" class="form-control" id="jmbg" v-model="jmbg" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="first-name" class="col-form-label">First name</label>
                            <input type="text" class="form-control" id="first-name" v-model="firstName" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="last-name" class="col-form-label">Last name</label>
                            <input type="text" class="form-control" id="last-name" v-model="lastName" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="age" class="col-form-label">Age</label>
                            <input type="number" class="form-control" id="age" v-model="age">
                        </div>
                        <div class="mb-3">
                            <label for="gender" class="col-form-label">Gender</label>
                            <select class="form-control" id="gender" v-model="gender" disabled>
                                <option v-for="option in genderOptions" :key="option.text" :value="option.value">{{ option.text }}</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="lifeQuality" class="col-form-label">Life Quality</label>
                            <select class="form-control" id="lifeQuality" v-model="lifeQuality">
                                <option v-for="option in lifeQualityOptions" :key="option.text" :value="option.value">{{ option.text }}</option>
                            </select>
                        </div>
                        <div class="d-flex flex-row">
                            <div class="col-6 g-2">
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
                            </div>
                        
                            <div class="col-6 g-2">
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
                            </div>
                        </div>   
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="onCloseDialog">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="onUpdatePatientSubmit">Update</button>
                </div>
            </div>
          </div>
       </div>

</template>

<script lang="ts">
import { Gender } from "@/models/Gender";
import { LifeQuality } from "@/models/LifeQuality";
import { Patient } from "@/models/Patient";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({ 
  name: 'UpdatePatientInfoDialog',
  data() {
      return {
          dialogVisible: this.visible,
          firstName: this.name,
          lastName: this.lastname,
          jmbg: this.id,
          age: this.years,
          gender: this.gender,
          genderOptions: [ { text: 'Male', value: Gender.MALE }, 
                           { text: 'Female', value: Gender.FEMALE } ],
          cancerSpread: this.cancerspread,
          cancerGrown: this.cancergrown,
          cancerSpreadToOrgans: this.cancerspreadtoorgans,
          strongPain: this.strongpain,
          cancerReappeared: this.cancerreappeared,
          weightLoss: this.weightloss,
          cancerDetectable: this.cancerdetectable,
          lifeQuality: this.lifequality,
          lifeQualityOptions: [ { text: 'Same', value: LifeQuality.SAME },
                                  { text: 'MuchBetter', value: LifeQuality.MUCH_BETTER },
                                  { text: 'Worse', value: LifeQuality.WORSE } ]        

      }
  },
  props: {
      visible: Boolean,
      id: String,
      name: String,
      lastname: String,
      years: Number,
      gender: String,
      cancerspread: Boolean,
      cancergrown: Boolean,
      cancerspreadtoorgans: Boolean,
      strongpain: Boolean,
      cancerreappeared: Boolean,
      weightloss: Boolean,
      cancerdetectable: Boolean,
      lifequality: String,
  },
  methods: {
        onCloseDialog(): void {
            this.dialogVisible = false;
            this.$emit('close-update-patient-dialog');
        },
        async onUpdatePatientSubmit() {
            const existingPatientData = {
                jmbg: this.jmbg,
                firstName: this.firstName,
                lastName: this.lastName,
                age: this.years,
                gender: this.gender,
                isCancerSpread: this.cancerspread,
                isCancerGrown: this.cancergrown,
                isCancerReappear: this.cancerreappeared,
                isCancerSpreadToOrgans: this.cancerspreadtoorgans,
                isCancerDetectable: this.cancerdetectable,
                weightLoss: this.weightloss,
                strongPain: this.strongpain,
                lifeQuality: this.lifequality
            }

            const updatedPatientData = {
                jmbg: this.jmbg,
                firstName: this.firstName,
                lastName: this.lastName,
                age: this.age,
                gender: this.gender,
                isCancerSpread: this.cancerSpread,
                isCancerGrown: this.cancerGrown,
                isCancerReappear: this.cancerReappeared,
                isCancerSpreadToOrgans: this.cancerSpreadToOrgans,
                isCancerDetectable: this.cancerDetectable,
                weightLoss: this.weightLoss,
                strongPain: this.strongPain,
                lifeQuality: this.lifeQuality
            }

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            axios.put('persons', { existingData: existingPatientData, newData: updatedPatientData })
            .then((response) => {
                console.log('Response from PUT /persons ', response.data);
                this.$emit('update-patient-data', updatedPatientData);
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
#exampleUpdatePatientModal{
    backdrop-filter: blur(2px);
}
</style>