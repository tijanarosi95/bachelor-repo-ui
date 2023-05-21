<template>
<div v-if="dialogVisible" class="modal fade show" 
        id="exampleAddDiseaseModal"
        role="dialog"
        tabindex="-1" 
        aria-labelledby="exampleAddDiseaseModalLabel" 
        aria-hidden="true" 
        style="display:block">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleAddDiseaseModalLabel">Add disease</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="onCloseDialog"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="diseaseName" class="col-form-label">Disease name</label>
                            <input type="text" class="form-control" id="diseaseName" v-model="diseaseName">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="onCloseDialog">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="onAddDiseaseSubmit">Add</button>
                </div>
            </div>
          </div>
       </div>


</template>

<script lang="ts">
import { Disease } from "@/models/Disease";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({ 
    name: 'AddDiseaseDialog',
    props: {
        visible: Boolean
    },
    data() {
        return {
            dialogVisible: this.visible,
            diseaseName: ''
        }
    },
    methods: {
        onCloseDialog(): void {
            this.dialogVisible = false;
            this.$emit('close-add-disease-dialog');
        },
        async onAddDiseaseSubmit() {
            const disease: Disease = {
                id: this.randomInt(1, 100000),
                name: this.diseaseName,
            };
            console.log("Create disease method call: ");
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            axios.post('/diseases', disease)
            .then((response) => {
                console.log('Response from POST /diseases ', response.data);
                this.$store.dispatch('createDisease', disease);
                this.dialogVisible = false;
            }).catch((error) => {
                console.log('Error has happened ', error.data);
            });
        },
        randomInt(min: number, max: number): number {
            return (Math.floor(Math.random() * (max - min + 1)) + min);
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


</style>