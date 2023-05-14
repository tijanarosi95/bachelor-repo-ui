<template>
<div class="container drugs-container">

      <div class="d-flex flex-column bd-highlight holder-drugs-div">
            <div style="padding-bottom: 20px"><span><i class="fa-solid fa-arrow-left-long" @click="onBackClick"/></span></div>

            <div class="d-flex flex-row">
                <img class="pharmacist-icon" src="../assets/female-user.png">
                <div class="d-flex flex-row drugs-view-summary">
                    <div class="overview-text">Here you can see and manage drugs</div>
                    <button class="btn btn-primary add-drug-btn" 
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleAddDrugModal"
                            @click="onAddDrugDialogOpen">Add drug</button>
                </div>
            </div>
      </div>
      <div class="drugs-table">
          <table class="table">
            <thead>
              <tr class="row-alignment">
               <th scope="col">#</th>
               <th scope="col">Drug name</th>
               <th scope="col">Active ingredient</th>
               <th scope="col">Dose ranged</th>
               <th scope="col">Has efficacy</th>
               <th scope="col">Has toxicity</th>
               <th scope="col">Has side effects</th>
               <th scope="col">Has therapeutic effect</th>
               <th scope="col"></th>
               <th scope="col"></th>
             </tr>
           </thead>
           <tbody>
            <tr v-for="(item, index) in drugs" :key="item.drugId" class="row-alignment">
              <th scope="row">{{ setColCounter(index) }}</th>
              <td>{{ item.name }}</td>
              <td>{{ item.activeIngredient }}</td>
              <td>{{ transformDrugProp(item.isDoseRanged) }}</td>
              <td>{{ transformDrugProp(item.hasEfficacy) }}</td>
              <td>{{ transformDrugProp(item.hasToxicity) }}</td>
              <td>{{ transformDrugProp(item.hasSideEffects) }}</td>
              <td>{{ transformDrugProp(item.hasTherapeuticEffect) }}</td>

              <td><button class="btn btn-secondary drug-info-btn" 
                            type="button"
                            @click="onShowDrugInfo(item.drugId)">See more info</button>
              </td>
              <td><button class="btn btn-danger drug-delete-btn" 
                            type="button"
                            @click="onDeleteDrugClick(item.drugId, item.name)" 
                            data-bs-toggle="modal"
                            data-bs-target="#drugDeleteModal">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <add-drug-dialog :visible="addDrugDialogVisible"
                        @close-add-drug-dialog="onAddDrugDialogClose"/>

      <confirm-drug-delete-dialog :visible="deleteDrugDialogVisible"
                                  :drugId="drugIdToDelete"
                                  :drugName="drugNameToDelete"
                                   @close-delete-drug-dialog="onDeleteDrugDialogClose"/>                  
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import axios from "axios";
import AddDrugDialog from "./dialogs/AddDrugDialog.vue";
import ConfirmDrugDeleteDialog from "./dialogs/ConfirmDrugDeleteDialog.vue";

export default defineComponent({  
    name: 'DrugsViewPharmacist',
    components: {
        AddDrugDialog,
        ConfirmDrugDeleteDialog
    },
    data() {
        return {
            addDrugDialogVisible: false,
            deleteDrugDialogVisible: false,
            drugIdToDelete: '',
            drugNameToDelete: ''
        }
    },
    async created() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        const response = await axios.get('drugs');
        console.log('Response from GET /drugs all: ', response);
        this.$store.dispatch('drugs', response.data);
    },
    methods: {
        setColCounter(index: number): number {
            return index+=1;
        },
        transformDrugProp(prop?: boolean): string {
            return prop ? 'Yes' : 'No';
        },
        onAddDrugDialogOpen(): void {
            this.addDrugDialogVisible = true;
        },
        onAddDrugDialogClose(): void {
            this.addDrugDialogVisible = false;
        },
        onDeleteDrugClick(drugId?: string, drugName?: string): void {
            this.drugNameToDelete = drugName || '';
            this.drugIdToDelete = drugId || '';
            this.deleteDrugDialogVisible = true;
        },
        onDeleteDrugDialogClose(): void {
            this.deleteDrugDialogVisible = false;
        },
        onShowDrugInfo(drugId?: number): void {
            this.$router.push('/drugs/' + drugId);
        },
        onBackClick(): void {
            this.$router.go(-1);
        },
    },
    computed: {
      ...mapGetters(['drugs'])
    }
});
</script>
<style scoped>
.drugs-container {
  margin-top: 50px;
  width: fit-content;
  background-color: white;
}

.holder-drugs-div {
    padding: 30px;
}

.pharmacist-icon {
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
  font-size: larger;
}

.add-drug-btn {
  height: fit-content;
}

</style>