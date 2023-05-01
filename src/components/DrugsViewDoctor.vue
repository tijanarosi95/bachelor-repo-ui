<template>
    <div class="container add-treated-drug-container">
        <div class="drugs-table">
            <div class="search-by-drug-name">
                <input type="text" class="form-control" id="drugName" v-model="drugName" @keyup="onDrugNameEntered" placeholder="Type to search by drug name...">
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

export default defineComponent({ 
    name: 'DrugsViewDoctor',
    data() {
        return {
            drugName: ''
        }
    },
    methods: {
        onDrugNameEntered(): void {
            this.$store.dispatch('filterInferredDrugs', this.drugName);
        }
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

<style>

</style>