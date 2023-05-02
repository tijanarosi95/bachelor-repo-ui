<template>
    <div v-if="dialogVisible" class="modal fade show" 
        id="drugDeleteModal"
        role="dialog"
        tabindex="-1" 
        aria-labelledby="exampleConfirmDeleteModal" 
        aria-hidden="true" 
        style="display:block">

        <div class="modal-dialog">
            <div class="modal-content">
                 <div class="modal-header">
                    <h5 class="modal-title" id="exampleConfirmDeleteModal">Delete drug?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="onCloseDialog"></button>
                </div>
                <div class="modal-body">
                    <div>Are you sure you want to delete a drug {{ drugName }} ?</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="onCloseDialog">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="onDeleteDrugSubmit">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
    name: 'DeletePatientDialog',
    props: {
        visible: Boolean,
        drugId: String,
        drugName: String
    },
    data() {
        return {
            dialogVisible: this.visible
        }
    },
    methods: {
        onCloseDialog(): void {
            this.dialogVisible = false;
            this.$emit('close-delete-drug-dialog');
        },
        onDeleteDrugSubmit() {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            axios.delete('/drugs/' + this.drugId)
            .then((response) => {
                console.log('Response from DELETE /drugs/' + this.drugId, response.data);
                this.$store.dispatch('deleteDrug', this.drugId);
                this.dialogVisible = false;
            })
            .catch((error) => {
                console.log('Error ', error.data);
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
#drugDeleteModal {
  backdrop-filter: blur(2px);
}
</style>