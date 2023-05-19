<template>
    <div class="container drugs-container">

        <div class="d-flex flex-column bd-highlight holder-drugs-div">
            <div style="padding-bottom: 20px"><span><i class="fa-solid fa-arrow-left-long" @click="onBackClick"/></span></div>

            <div class="d-flex flex-row">
                <img class="drugs-icon" src="../assets/drug-icon.png">
                <div class="d-flex flex-row drugs-view-summary">
                    <div class="overview-text">Here you can see and search for drugs</div>
                </div>
            </div>
      </div>

        <div class="drugs-table">
            <div class="search-by-drug-name">
                <input type="text" class="form-control" id="drugName" v-model="drugName" @input="onDrugNameEntered" placeholder="Type to search by drug name...">
            </div>
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
                    <tr v-for="(item, index) in filteredInferredDrugs" :key="item.drugId" class="row-alignment">
                        <th scope="row">{{ setColCounter(index) }}</th>
                            <td>{{ item.drugName }}</td>
                            <td>{{ item.activeIngredient }}</td>
                            <td>{{ isPreclinicalTested(item) }}</td>
                            <td>{{ isClinicalPhase1Tested(item) }}</td>
                            <td>{{ isClinicalPhase2Tested(item) }}</td>
                            <td>{{ isClinicalPhase3Tested(item) }}</td>
                            <td>{{ isApproved(item) }}</td>
                            <td><button class="btn btn-secondary drug-info-btn" 
                                        type="button"
                                        @click="onShowDrugInfo(item.drugId)">See more info</button></td>
                            <!-- <td><button class="btn btn-secondary select-drug" 
                                        type="button" @click="onRowSelected(item)">Select</button>
                            </td> -->
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { mapGetters } from "vuex";
import { DrugInferredData } from "@/models/DrugInferredData";

export default defineComponent({ 
    name: 'DrugsViewDoctor',
    data() {
        return {
            drugName: ''
        }
    },
    methods: {
        setColCounter(index: number): number {
            return index+=1;
        },
        onDrugNameEntered(): void {
            console.log('Entered value');
            this.$store.dispatch('filterInferredDrugs', this.drugName);
        },
        onShowDrugInfo(drugId?: number): void {
            this.$router.push('/drugs/' + drugId);
        },
        onBackClick(): void {
            this.$router.go(-1);
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
    },
    async created() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        const response = await axios.get('/drugs/infer-facts-test');
        console.log('Response from GET /drugs/infer-facts-test: ', response);
        this.$store.dispatch('inferredDrugs', response.data);
    },
    computed: {
      ...mapGetters(['filteredInferredDrugs'])
    }
});
</script>

<style scoped>
.drugs-container {
  margin-top: 50px;
  width: fit-content;
  background-color: white;
  padding: 40px;
}

.drugs-table {
    padding-top: 30px;
}

.search-by-drug-name {
    width: 40%;
    padding-bottom: 20px;
}

.drugs-icon {
  width: 150px;
  height: 150px;
}

.drugs-view-summary {
  padding: 10px;
  font-size: 20px;
}

.overview-text {
  padding-top: 10px;
  padding-right: 30px;
  font-weight: 500;
  font-size: large;
}

.row-alignment {
  vertical-align: middle;
  text-align: center;
}

</style>