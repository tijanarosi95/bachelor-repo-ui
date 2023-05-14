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
                            <input type="text" class="form-control" id="drugName" v-model="drugName" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="activeIngredient" class="col-form-label">Active ingredient</label>
                            <input type="text" class="form-control" id="activeIngredient" v-model="activeIngredient" disabled>
                        </div>
                         <div class="mb-3">
                            <label class="form-check-label" for="isDoseRanged">Dose ranged</label>
                            <input class="form-check-input" type="checkbox" id="isDoseRanged" v-model="isDoseRanged">
                        </div>
                         <div class="mb-3">
                            <label class="form-check-label" for="hasEfficacy">Has efficacy</label>
                            <input class="form-check-input" type="checkbox" id="hasEfficacy" v-model="hasEfficacy">
                        </div>
                         <div class="mb-3">
                            <label class="form-check-label" for="hasSideEffects">Has side effects</label>
                            <input class="form-check-input" type="checkbox" id="hasSideEffects" v-model="hasSideEffects">
                        </div>
                         <div class="mb-3">
                            <label class="form-check-label" for="hasTherapeuticEffect">Has therapeutic effect</label>
                            <input class="form-check-input" type="checkbox" id="hasTherapeuticEffect" v-model="hasTherapeuticEffect">
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


</script>