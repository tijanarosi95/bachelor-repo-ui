<template>
    <div v-if="dialogVisible" class="modal fade show" 
        id="exampleModal"
        role="dialog"
        tabindex="-1" 
        aria-labelledby="exampleModalLabel" 
        aria-hidden="true" 
        style="display:block">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add patient</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="onCloseDialog"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="jmbg" class="col-form-label">JMBG</label>
                            <input type="text" class="form-control" id="jmbg">
                        </div>
                        <div class="mb-3">
                            <label for="first-name" class="col-form-label">First name</label>
                            <input type="text" class="form-control" id="first-name">
                        </div>
                        <div class="mb-3">
                            <label for="last-name" class="col-form-label">Last name</label>
                            <input type="text" class="form-control" id="last-name">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="onCloseDialog">Close</button>
                    <button type="button" class="btn btn-primary">Send message</button>
                </div>
            </div>
          </div>
       </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({ 
    name: 'AddPatientDialog',
    props: {
        visible: Boolean
    },
    data() {
        return {
            dialogVisible: this.visible
        }
    },
    methods: {
        onCloseDialog(): void {
            this.dialogVisible = false;
            this.$emit('close-add-patient-dialog');
        }
    },
    watch: { 
      visible: function(newVal, oldVal) { // watch it
        this.dialogVisible = newVal;
        console.log('new' + newVal + '==' + oldVal);
      }
    }
});

</script>

<style scoped>
#exampleModal {
  backdrop-filter: blur(2px);
}
</style>