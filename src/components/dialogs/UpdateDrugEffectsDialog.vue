<template>
<div v-if="dialogVisible" class="modal fade show" 
        id="exampleUpdateDrugEffectsModal"
        role="dialog"
        tabindex="-1" 
        aria-labelledby="exampleUpdateDrugEffectsModalLabel" 
        aria-hidden="true" 
        style="display:block">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleUpdateDrugEffectsModalLabel">Add drug effects</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="onCloseDialog"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="drugName" class="col-form-label">Drug name</label>
                            <input type="text" class="form-control" id="drugName" v-model="drugName" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="activeIngredient" class="col-form-label">Active ingredient</label>
                            <input type="text" class="form-control" id="activeIngredient" v-model="activeIngredient" disabled>
                        </div>
                         <div class="mb-3 form-check">
                            <label class="form-check-label" for="isDoseRanged">Dose ranged</label>
                            <input class="form-check-input" type="checkbox" id="isDoseRanged" v-model="isDoseRanged">
                        </div>
                         <div class="mb-3 form-check">
                            <label class="form-check-label" for="hasEfficacy">Has efficacy</label>
                            <input class="form-check-input" type="checkbox" id="hasEfficacy" v-model="hasEfficacy">
                        </div>
                         <div class="mb-3 form-check">
                            <label class="form-check-label" for="hasSideEffects">Has side effects</label>
                            <input class="form-check-input" type="checkbox" id="hasSideEffects" v-model="hasSideEffects">
                        </div>
                         <div class="mb-3 form-check">
                            <label class="form-check-label" for="hasToxicity">Has toxicity</label>
                            <input class="form-check-input" type="checkbox" id="hasToxicity" v-model="hasToxicity">
                        </div>
                         <div class="mb-3 form-check">
                            <label class="form-check-label" for="hasTherapeuticEffect">Has therapeutic effect</label>
                            <input class="form-check-input" type="checkbox" id="hasTherapeuticEffect" v-model="hasTherapeuticEffect">
                        </div>
                        <div class="mb-3 form-check">
                            <label class="form-check-label" for="isApproved">Approved</label>
                            <input class="form-check-input" type="checkbox" id="isApproved" v-model="isApproved">
                        </div>
                        
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="onCloseDialog">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="onAddDrugEffectsSubmit">Add</button>
                </div>
            </div>
          </div>
       </div>


</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
    name: 'UpdateDrugEffectsDialog',
    data() {
        return {
            dialogVisible: this.visible,
            drugName: this.name,
            activeIngredient: this.ingredient,
            isDoseRanged: this.doseRanged,
            hasEfficacy: this.efficacy,
            hasSideEffects: this.sideEffects,
            hasTherapeuticEffect: this.therapeuticEffect,
            hasToxicity: this.toixicity,
            isApproved: this.approved
        }
    },
    props: {
        visible: Boolean,
        id: String,
        name: String,
        ingredient: String,
        doseRanged: Boolean,
        efficacy: Boolean,
        sideEffects: Boolean,
        therapeuticEffect: Boolean,
        toxicity: Boolean,
        approved: Boolean
    },
    created() {
        console.log("ID ", this.id);
        console.log("name ", this.name);
    },
    methods: {
        onCloseDialog(): void {
            this.dialogVisible = false;
            this.$emit('close-update-drug-effects-dialog');
        },
        async onAddDrugEffectsSubmit() {
            const existingDrugData = {
                drugId: this.id,
                activeIngredient: this.ingredient,
                drugName: this.name,
                isDoseRanged: this.doseRanged,
                hasEfficacy: this.efficacy,
                hasSideEffects: this.sideEffects,
                hasTherapeuticEffect: this.therapeuticEffect,
                hasToxicity: this.toxicity,
                isApproved: this.approved
            };
            const newDrugData = {
                drugId: this.id,
                activeIngredient: this.ingredient,
                drugName: this.drugName,
                isDoseRanged: this.isDoseRanged,
                hasEfficacy: this.hasEfficacy,
                hasSideEffects: this.hasSideEffects,
                hasToxicity: this.hasToxicity,
                hasTherapeuticEffect: this.hasTherapeuticEffect,
                isApproved: this.isApproved
            }
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            await axios.put('/drugs', { existingData: existingDrugData, newData: newDrugData})
            .then((response) => {
                if(response.data) {
                    console.log('Response from PUT /drugs ', response.data);
                    this.$emit('update-drug-effects', newDrugData);
                    this.dialogVisible = false;
                }
            })
            .catch((error) => {})
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
#exampleUpdateDrugEffectsModal {
    backdrop-filter: blur(2px);
}
</style>