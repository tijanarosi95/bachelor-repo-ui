<template>
    <div class="container drug-container">
        <div class="d-flex flex-column bd-highlight holder-drug-div">
            <div style="padding-bottom: 20px"><span><i class="fa-solid fa-arrow-left-long" @click="onBackClick"/></span></div>

            <div class="d-flex flex-row">
                <img class="drug-icon" src="../assets/drug-icon.png">
                <div class="d-flex flex-column">
                    <div class="row drug-name-font-style">{{ drugName }}</div>
                    <div class="row active-ingredient-font-style">{{ activeIngredient }}</div>
                </div>
            </div>
        </div>


        <div class="d-flex flex-row drug-info-main-card">
          <div class="col section-card">
            <div class="row custom-style-row">
                <div class="row section-title title-font-style">
                    <div class="col-8">
                      <div>Drug information <i class="fa-solid fa-info info-tooltip" data-bs-toggle="tooltip" data-bs-placement="right" title="Click manage to update drug data"/></div>
                      
                    </div>
                    <div class="col-4 manage-drug-info" v-if="isLoggedUserPharmacist">
                        <button class="btn btn-primary btn-sm manage-drug" @click="openUpdateDrugEffectsDialog">Manage</button>
                    </div>
                </div>

                <div class="row section-row">
                    <div class="col-1">
                        <span v-if="isApproved">
                            <i class="fa-solid fa-check"></i>
                        </span>
                        <span v-else>
                            <i class="fa-regular fa-x"></i>
                        </span>
                    </div>
                    <div v-if="isApproved" class="col-11">Drug is approved</div>
                    <div v-else class="col-11">Drug is not approved.</div>
                </div>

                <div class="row section-row">
                    <div class="col-1">
                        <span v-if="isDoseRanged">
                            <i class="fa-solid fa-check"></i>
                        </span>
                        <span v-else>
                            <i class="fa-regular fa-x"></i>
                        </span>
                    </div>
                    <div v-if="isDoseRanged" class="col-11">It's dose ranged</div>
                    <div v-else class="col-11">Drug is not dose ranged</div>
                </div>

                <div class="row section-row">
                    <div class="col-1">
                        <span v-if="hasEfficacy">
                            <i class="fa-solid fa-check"></i>
                        </span>
                        <span v-else>
                            <i class="fa-regular fa-x"></i>
                        </span>
                    </div>
                    <div v-if="hasEfficacy" class="col-11">Drug has efficacy</div>
                    <div v-else class="col-11">Drug doesn't have efficacy</div>
                </div>

                <div class="row section-row">
                    <div class="col-1">
                        <span v-if="hasSideEffects">
                            <i class="fa-solid fa-check"></i>
                        </span>
                        <span v-else>
                            <i class="fa-regular fa-x"></i>
                        </span>
                    </div>
                    <div v-if="hasSideEffects" class="col-11">Drug has side effects</div>
                    <div v-else class="col-11">Drug doesn't have side effects</div>
                </div>

                <div class="row section-row">
                    <div class="col-1">
                        <span v-if="hasTherapeuticEffect">
                            <i class="fa-solid fa-check"></i>
                        </span>
                        <span v-else>
                            <i class="fa-regular fa-x"></i>
                        </span>
                    </div>
                    <div v-if="hasTherapeuticEffect" class="col-11">Drug has therapeutic effect</div>
                    <div v-else class="col-11">Drug doesn't have therapeutic effect</div>
                </div>

                <div class="row section-row">
                    <div class="col-1">
                        <span v-if="hasToxicity">
                            <i class="fa-solid fa-check"></i>
                        </span>
                        <span v-else>
                            <i class="fa-regular fa-x"></i>
                        </span>
                    </div>
                    <div v-if="hasToxicity" class="col-11">Drug has toxicity</div>
                    <div v-else class="col-11">Drug doesn't have toxicity</div>
                </div>
            </div>
        </div>



        <div class="col section-card">
            <div class="row custom-style-row">
                <div class="row section-title title-font-style">
                    <div class="col-12">
                      <div>Drug approval process <i class="fa-solid fa-info info-tooltip" 
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="right" 
                                                    title="This tile provides info about drug approval process"/></div>
                      </div>
                    <!-- <div class="col-4 manage-drug-info">
                        <button class="btn btn-primary btn-sm manage-drug">Manage</button>
                    </div> -->
                </div>

                <div class="row section-row" style="padding-top: 25px;">
                    <div class="col-1">
                        <span v-if="preclinicalTestedDrug">
                            <i class="fa-solid fa-check"></i>
                        </span>
                        <span v-else>
                            <i class="fa-regular fa-x"></i>
                        </span>
                    </div>
                    <div v-if="preclinicalTestedDrug" class="col-11">Drug passed PRECLINICAL PHASE</div>
                    <div v-else class="col-11">Drug didn't pass PRECLINICAL PHASE</div>
                </div>

                <div class="row section-row" style="padding-top: 25px;">
                    <div class="col-1">
                        <span v-if="clinicalTestedDrugPhase1">
                            <i class="fa-solid fa-check"></i>
                        </span>
                        <span v-else>
                            <i class="fa-regular fa-x"></i>
                        </span>
                    </div>
                    <div v-if="clinicalTestedDrugPhase1" class="col-11">Drug passed CLINICAL PHASE 1</div>
                    <div v-else class="col-11">Drug didn't pass CLINICAL PHASE 1</div>
                </div>

                <div class="row section-row" style="padding-top: 25px;">
                    <div class="col-1">
                        <span v-if="clinicalTestedDrugPhase2">
                            <i class="fa-solid fa-check"></i>
                        </span>
                        <span v-else>
                            <i class="fa-regular fa-x"></i>
                        </span>
                    </div>
                    <div v-if="clinicalTestedDrugPhase2" class="col-11">Drug passed CLINICAL PHASE 2</div>
                    <div v-else class="col-11">Drug didn't pass CLINICAL PHASE 2</div>
                </div>

                <div class="row section-row" style="padding-top: 25px;">
                    <div class="col-1">
                        <span v-if="clinicalTestedDrugPhase3">
                            <i class="fa-solid fa-check"></i>
                        </span>
                        <span v-else>
                            <i class="fa-regular fa-x"></i>
                        </span>
                    </div>
                    <div v-if="clinicalTestedDrugPhase3" class="col-11">Drug passed CLINICAL PHASE 3</div>
                    <div v-else class="col-11">Drug didn't pass CLINICAL PHASE 3</div>
                </div>

                <div class="row section-row" style="padding-top: 25px;">
                    <div class="col-1">
                        <span v-if="approvedDrug">
                            <i class="fa-solid fa-check"></i>
                        </span>
                        <span v-else>
                            <i class="fa-regular fa-x"></i>
                        </span>
                    </div>
                    <div v-if="approvedDrug" class="col-11">Drug is APPROVED</div>
                    <div v-else class="col-11">Drug is not APPROVED</div>
                </div>


            </div>
        </div>

        <div class="col section-card">
            <div class="row custom-style-row">
                <div class="row section-title title-font-style">
                    <div class="col-12">
                      <div>Drug statistics<i class="fa-solid fa-info info-tooltip" 
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="right" 
                                                    title="This tile provides info about drug approval process"/></div>
                      </div>
                </div>

                <div class="row section-row">
                    <canvas id="myChart" width="300" height="300"></canvas>
                </div>
            </div>
        </div>


      </div>

        <div class="patients-table">
          <div class="title-font-style">Treated patients</div>  
          <table class="table">
            <thead>
              <tr class="row-alignment">
               <th scope="col">#</th>
               <th scope="col">First name</th>
               <th scope="col">Last name</th>
               <th scope="col">JMBG</th>
               <th scope="col">Gender</th>
               <th scope="col">Age</th>
               <th scope="col"></th>
             </tr>
           </thead>
           <tbody>
            <tr v-for="(item, index) in patients" :key="item.jmbg" class="row-alignment">
              <th scope="row">{{ setColCounter(index) }}</th>
              <td>{{ item.firstName }}</td>
              <td>{{ item.lastName }}</td>
              <td>{{ item.jmbg }}</td>
              <td>{{ item.gender }}</td>
              <td>{{ item.age }}</td>
              <td><button class="btn btn-secondary patient-info-btn" 
                            type="button"
                            @click="onShowPatientInfo(item.jmbg)">See more info</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    <update-drug-effects-dialog :key="keyValue"
                                :visible="updateDrugEffectsDialogVisible"
                                :id="drugId"
                                :name="drugName"
                                :ingredient="activeIngredient"
                                :approved="isApproved"
                                :sideEffects="hasSideEffects"
                                :efficacy="hasEfficacy"
                                :therapeuticEffect="hasTherapeuticEffect"
                                :doseRanged="isDoseRanged"
                                @close-update-drug-effects-dialog="closeUpdateDrugEffectsDialog"
                                @update-drug-effects="updateDrugEffectsState"/>
    </div>
</template>
<script lang="ts">
import { Drug } from "@/models/Drug";
import axios from "axios";
import { defineComponent } from "vue";
import Chart, { ChartItem } from "chart.js/auto";
import { UserRole } from "@/models/UserRole";
import UpdateDrugEffectsDialog from "./dialogs/UpdateDrugEffectsDialog.vue";

export default defineComponent({
  components: { UpdateDrugEffectsDialog }, 
    name: 'Drug',
    data() {
      return {
          keyValue: 1,
          drugName: '',
          drugId: '',
          activeIngredient: '',
          isApproved: false,
          hasSideEffects: false,
          hasTherapeuticEffect: false,
          hasToxicity: false,
          hasEfficacy: false,
          isDoseRanged: false,
          mayTreat: [],
          drugEffects: {},
          patients: [],
          preclinicalTestedDrug: {},
          clinicalTestedDrugPhase1: {},
          clinicalTestedDrugPhase2: {},
          clinicalTestedDrugPhase3: {},
          approvedDrug: {},
          updateDrugEffectsDialogVisible: false
      }
    },
    async mounted() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        const drugId = this.$route.params.drugId;
        let statisticData: any = [];

        await axios.get('/drugs/statistics/' + drugId)
        .then((response) => {
            console.log('Mounted statistics: ', response.data);
            statisticData = response.data;
        })

        const context = document.getElementById('myChart') as ChartItem;
        const data = {
            labels: [
            'Has efficacy',
            'Has side effects',
            'Has therapeutic effect',
            'Is dose ranged',
            'Has toxicity'
            ],
        datasets: [{
            label: 'My First Dataset',
            data: statisticData,
            backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            ],
            hoverOffset: 4
            }]
        };
        
        const myChart = new Chart(context, {
            type: 'doughnut',
            data: data
        });
        
        myChart;

        
    },
    async created() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        this.drugId = this.$route.params.drugId as string;
        await axios.get('/drugs/' + this.drugId)
        .then((response) => {
            console.log('Response from /drugs/' + this.drugId, response);
            this.drugEffects = { name: response.data.name,
                                drugId: response.data.drugId,
                                isApproved: response.data.approved, 
                                isDoseRanged: response.data.doseRanged,
                                activeIngredient: response.data.activeIngredient,
                                hasEfficacy: response.data.hasEfficacy,
                                hasSideEffects: response.data.hasSideEffects,
                                hasTherapeuticEffect: response.data.hasTherapeuticEffect,
                                hasToxicity: response.data.hasToxicity } as Drug;
            this.drugName = response.data.name;
            this.activeIngredient = response.data.activeIngredient;
            this.isApproved = response.data.approved;
            this.hasEfficacy = response.data.hasEfficacy;
            this.hasSideEffects = response.data.hasSideEffects;
            this.hasTherapeuticEffect = response.data.hasTherapeuticEffect;
            this.hasToxicity = response.data.hasToxicity;
            this.isDoseRanged = response.data.doseRanged;
            this.keyValue += 1;
        })
        .catch((error) => {
            console.log('Error occurred!');
        })

        this.inferDrugFacts();

        await axios.get('/persons/drug/' + this.drugName)
        .then((response) => {
            console.log("Get persons/drug/" + this.drugName, response);
            this.patients = response.data;
        })
        .catch((error) => {
            console.log("error happened")
        })
    },
    methods: {
        onBackClick(): void {
            this.$router.go(-1);
        },
        setColCounter(index: number): number {
            return index+=1;
        },
        onShowPatientInfo(jmbg: string): void {
            this.$router.push('/patients/' + jmbg);
        },
        isLoggedUserPharmacist(): boolean {
            return !!UserRole.PHARMACIST.includes(localStorage.getItem('role') || '');
        },
        openUpdateDrugEffectsDialog(): void {
            this.keyValue += 1;
            this.updateDrugEffectsDialogVisible = true;
        },
        closeUpdateDrugEffectsDialog(): void {
            this.updateDrugEffectsDialogVisible = false;
        },
        updateDrugEffectsState(updatedDrugEffects: Drug): void {
            this.isApproved = updatedDrugEffects.isApproved || false;
            this.hasEfficacy = updatedDrugEffects.hasEfficacy || true;
            this.hasSideEffects = updatedDrugEffects.hasSideEffects || true;
            this.hasTherapeuticEffect = updatedDrugEffects.hasTherapeuticEffect || false;
            this.hasToxicity = updatedDrugEffects.hasToxicity || false;
            this.isDoseRanged = updatedDrugEffects.isDoseRanged || false;
            this.inferDrugFacts();
        },
        async inferDrugFacts() {
            await axios.post('/drugs/infer-facts', this.drugEffects)
            .then((response) => {
                console.log('Drug facts: ', response);
                this.preclinicalTestedDrug = response.data.preclinicalTestedDrug;
                this.clinicalTestedDrugPhase1 = response.data.clinicalTestedDrugPhase1;
                this.clinicalTestedDrugPhase2 = response.data.clinicalTestedDrugPhase2;
                this.clinicalTestedDrugPhase3 = response.data.clinicalTestedDrugPhase3;
                this.approvedDrug = response.data.approvedDrug;
            })
            .catch((error) => {
            })
        }
    }
});

</script>
<style scoped>
.drug-container {
  margin-top: 50px;
  width: max-content;
  background-color: white;
}

.holder-drug-div {
  padding: 20px;
}

.drug-icon {
  width: 100px;
  height: 100px;
}

.drug-name-font-style {
  padding-left: 30px;
  padding-top: 10px;
  font-size: 30px;
}

.active-ingredient-font-style {
  padding-left: 30px;
}

.section-card {
  border: solid thin #D3D3D3;
}

.section-row {
    padding-left: 25px;
}

.title-font-style {
    font-weight: 800;
}

.custom-style-row {
    padding-left: 10px;
    padding-bottom: 10px;
}

.drug-info-main-card {
  padding: 20px;
  gap: 20px;
}

.section-title {
    padding: 20px;
}

.manage-drug-info {
    text-align: end;
}

.info-tooltip {
  padding: 5px;
  background: #D3D3D3;
  border-radius: 10px;
  width: min-content;
}

.patients-table {
    padding: 30px;
}

.row-alignment {
  vertical-align: middle;
  text-align: center;
}

#myChart {
    width: 300px !important;
    height: 300px !important;
}
</style>
