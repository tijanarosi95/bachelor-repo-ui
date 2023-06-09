<template>
  <div v-if="dialogVisible" class="modal fade show" 
        id="patientTreatedDrugModal"
        role="dialog"
        tabindex="-1" 
        aria-labelledby="examplePatientDrugModal" 
        aria-hidden="true" 
        style="display:block">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="examplePatientDrugModal">Add treated drug</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="onCloseDialog"></button>
                </div>
                <div class="modal-body">
                  <form>
                    <div v-if="selectedDrug.drugName !== ''" class="selected-row-info">You selected {{ selectedDrug.drugName }}</div>
                  <div class="container add-treated-drug-container">
                    <div class="drugs-table">
                      <table class="table">
                        <thead>
                          <tr class="row-alignment">
                            <th scope="col">#</th>
                            <th scope="col">Drug name</th>
                            <th scope="col">Active ingredient</th>
                            <th scope="col">Preclinically tested</th>
                            <th scope="col">Phase 1 clinical tested</th>
                            <th scope="col">Phase 2 clinical tested</th>
                            <th scope="col">Phase 3 clinical tested</th>
                            <th scope="col">Approved</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                      <tbody>
                        <tr v-for="(item, index) in inferredDrugs" :key="item.drugId" class="row-alignment">
                          <th scope="row">{{ setColCounter(index) }}</th>
                            <td>{{ item.drugName }}</td>
                            <td>{{ item.activeIngredient }}</td>
                            <td>{{ isPreclinicalTested(item) }}</td>
                            <td>{{ isClinicalPhase1Tested(item) }}</td>
                            <td>{{ isClinicalPhase2Tested(item) }}</td>
                            <td>{{ isClinicalPhase3Tested(item) }}</td>
                            <td>{{ isApproved(item) }}</td>
                            <td><button class="btn btn-secondary select-drug" 
                                        type="button" @click="onRowSelected(item)">Select</button>
                            </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                </form>
              </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="onCloseDialog">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="onAddTreatedDrugClick">Add</button>
                </div>
            </div>
        </div>
  </div>
    
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { mapGetters } from "vuex";
import { DrugInferredData } from "@/models/DrugInferredData";
import { PatientDrugData } from "@/models/PatientDrugData";

export default defineComponent({
    name: 'AddPatientTreatedDrug',
    props: {
        visible: Boolean,
        jmbg: String,
        firstName: String,
        lastName: String
    },
    data() {
        return {
            dialogVisible: this.visible,
            selectedDrug: { drugName: '', drugId: ''},
        }
    },
    async created() {
      if (this.dialogVisible) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
          const response = await axios.get('/drugs/infer-facts-test');
          console.log('Response from GET /drugs/infer-facts-test: ', response);
          this.$store.dispatch('inferredDrugs', response.data);
      }
    },
    methods: {
        onCloseDialog(): void {
            this.dialogVisible = false;
            this.$emit('close-add-patient-drug-dialog');
        },
        setColCounter(index: number): number {
            return index+=1;
        },
        isPreclinicalTested(inferredData?: DrugInferredData): string {
            const preclinicalTestedFacts = inferredData ? inferredData.preclinicalTestedDrug : null;
            return preclinicalTestedFacts !== null ? 'Yes' : 'No';
        },
        isClinicalPhase1Tested(inferredData?: DrugInferredData): string {
            const clinicalTestedFacts = inferredData ? inferredData.clinicalTestedDrugPhase1 : null;
            return clinicalTestedFacts !== null ? 'Yes' : 'No';
        },
        isClinicalPhase2Tested(inferredData?: DrugInferredData): string {
            const clinicalTestedFacts = inferredData ? inferredData.clinicalTestedDrugPhase2 : null;
            return clinicalTestedFacts !== null ? 'Yes' : 'No';
        },
        isClinicalPhase3Tested(inferredData?: DrugInferredData): string {
            const clinicalTestedFacts = inferredData ? inferredData.clinicalTestedDrugPhase3 : null;
            return clinicalTestedFacts !== null ? 'Yes' : 'No';
        },
        isApproved(inferredData?: DrugInferredData): string {
            const approvedFacts = inferredData ? inferredData.approvedDrug : null;
            return approvedFacts !== null ? 'Yes' : 'No';
        },
        onRowSelected(inferredData?: DrugInferredData): void {
          this.selectedDrug.drugName = (inferredData !== undefined && inferredData.drugName !== undefined) ? inferredData.drugName : '';
          this.selectedDrug.drugId = (inferredData !== undefined && inferredData.drugId !== undefined) ? inferredData.drugId : '';
        },
        onAddTreatedDrugClick(): void {
          const selectedDrug: PatientDrugData = {
            drugId: this.selectedDrug.drugId,
            drugName: this.selectedDrug.drugName,
            firstName: this.firstName || '',
            lastName: this.lastName || '',
            patientId: this.jmbg
          }
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
          axios.post('/drugs/person-drug', selectedDrug)
          .then((response) => {
            console.log('Person drug: ', response.data);
            this.$emit('add-patient-treated-drug', this.selectedDrug.drugId, this.selectedDrug.drugName);
            this.dialogVisible = false;
          })
          .catch((error) => {
            console.log('Error caught: ', error);
          })
        }
    },
    computed: {
      ...mapGetters(['inferredDrugs'])
    },
    watch: { 
      visible: function visible (newVal, oldVal) { // watch it
        this.dialogVisible = newVal;
        console.log('new' + newVal + '==' + oldVal);
      }
    }

})

</script>

<style scoped>
#patientTreatedDrugModal {
  backdrop-filter: blur(2px);
}

.add-treated-drug-container {
  background-color: white;
}

.drugs-table {
  padding: 20px;
}

.row-alignment {
  vertical-align: middle;
  text-align: center;
}

</style>