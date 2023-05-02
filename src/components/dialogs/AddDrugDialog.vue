<template>
<div v-if="dialogVisible" class="modal fade show" 
        id="exampleAddDrugModal"
        role="dialog"
        tabindex="-1" 
        aria-labelledby="exampleAddDrugModalLabel" 
        aria-hidden="true" 
        style="display:block">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleAddDrugModalLabel">Add drug</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="onCloseDialog"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="drugName" class="col-form-label">Drug name</label>
                            <input type="text" class="form-control" id="drugName" v-model="drugName">
                        </div>
                        <div class="mb-3">
                            <label for="activeIngredient" class="col-form-label">Active ingredient</label>
                            <input type="text" class="form-control" id="activeIngredient" v-model="activeIngredient">
                        </div>
                         <div class="mb-3">
                            <label for="diseses" multiple class="col-form-label">May treat</label>
                            <select class="form-control" id="diseses" v-model="selectedDiseases">
                                <option v-for="disease in diseases" :key="disease.id" :value="disease.name">{{ disease.name }}</option>
                            </select>
                            <span class="may-treat-custom-info">*It is possible to slect more than one option</span>
                        </div>
                        
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="onCloseDialog">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="onAddDrugSubmit">Add</button>
                </div>
            </div>
          </div>
       </div>


</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { Drug } from "@/models/Drug";

export default defineComponent({ 
    name: 'AddDrugDialog',
    props: {
        visible: Boolean
    },
    data() {
        return {
            dialogVisible: this.visible,
            drugName: '',
            activeIngredient: '',
            selectedDiseases: [],
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
            this.$emit('close-add-drug-dialog');
        },
        async onAddDrugSubmit() {
            const drug: Drug = {
                name: this.drugName,
                activeIngredient: this.activeIngredient,
                isDoseRanged: false,
                hasEfficacy: false,
                hasToxicity: false,
                hasSideEffects: false,
                hasTherapeuticEffect: false,
                isApproved: false,
                mayTreat: this.selectedDiseases
            };
            console.log("Create drug method call: ", this.selectedDiseases);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            // axios.post('drugs', drug)
            // .then((response) => {
            //     console.log('Response from POST /drugs ', response.data);
            //     this.$store.dispatch('createDrug', drug);
            //     this.dialogVisible = false;
            // }).catch((error) => {
            //     console.log('Error has happened ', error.data);
            // });
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
.may-treat-custom-info {
    font-size: small;
}


</style>