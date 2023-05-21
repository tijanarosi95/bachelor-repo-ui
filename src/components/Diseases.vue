<template>
    <div class="container diseases-container">

        <div class="d-flex flex-column bd-highlight holder-diseases-div">
            <div style="padding-bottom: 20px"><span><i class="fa-solid fa-arrow-left-long" @click="onBackClick"/></span></div>

            <div class="d-flex flex-row">
                <img class="disease-icon" src="../assets/disease.png">
                <div class="d-flex flex-row diseases-view-summary">
                    <div class="overview-text">Here you can see and manage diseases</div>
                    <button class="btn btn-primary add-disease-btn" 
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleAddDiseaseModal"
                            @click="onAddDiseaseDialogOpen"
                            v-if="isLoggedUserDoctor">Add disease</button>
                </div>
            </div>
        </div>

        <div class="diseases-table">
            <div class="search-by-disease-name">
                <input type="text" class="form-control" id="diseaseName" v-model="diseaseName" @input="onDiseaseNameEntered" placeholder="Type to search by disease name...">
            </div>
            <table class="table">
                <thead>
                    <tr class="row-alignment">
                        <th scope="col">#</th>
                        <th scope="col">Disease name</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in diseases" :key="item.id" class="row-alignment">
                        <th scope="row">{{ setColCounter(index) }}</th>
                            <td>{{ item.name }}</td>
                            <td><button class="btn btn-secondary disease-info-btn" 
                                        type="button"
                                        @click="onShowDiseaseInfo(item.id)">See more info</button></td>
                            <td><button class="btn btn-danger disease-delete-btn"
                                        type="button"
                                        data-bs-toggle="modal"
                                        v-if="isLoggedUserDoctor">Delete</button></td>            
                    </tr>
                </tbody>
            </table>
        </div>

        <add-disease-dialog :visible="addDiseaseDialogVisible"
                            @close-add-disease-dialog="onAddDiseaseDialogClose">
                            </add-disease-dialog>

    </div>
</template>
<script lang="ts">
import axios from "axios";
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
import AddDiseaseDialog from "./dialogs/AddDiseaseDialog.vue";
import { UserRole } from "@/models/UserRole";

export default defineComponent({
  components: { AddDiseaseDialog },
    name: 'Diseases',
    data() {
        return {
            addDiseaseDialogVisible: false,
        }
    },
    async created() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        const response = await axios.get('/diseases');
        console.log('Response from GET /diseases ', response);
        this.$store.dispatch('diseases', response.data);
    },
    methods: {
        setColCounter(index: number): number {
            return index+=1;
        },
        onBackClick(): void {
            this.$router.go(-1);
        },
        onShowDiseaseInfo(id: number): void {
            this.$router.push('/diseases/' + id);
        },
        onAddDiseaseDialogClose(): void {
            this.addDiseaseDialogVisible = false;
        },
        onAddDiseaseDialogOpen(): void {
            this.addDiseaseDialogVisible = true;
        },
        isLoggedUserDoctor(): boolean {
            return !!UserRole.DOCTOR.includes(localStorage.getItem('role') || '');
        }

    },
    computed: {
        ...mapGetters(['diseases'])
    }

})
</script>
<style scoped>
.diseases-container {
  margin-top: 50px;
  width: fit-content;
  background-color: white;
}

.holder-diseases-div {
    padding: 30px;
}

.disease-icon {
  width: 150px;
  height: 150px;
}

.diseases-view-summary {
  padding: 10px;
  font-size: 20px;
}

.overview-text {
  padding-top: 10px;
  padding-right: 30px;
  font-weight: 500;
}


.diseases-table {
  padding: 20px;
}

.add-disease-btn {
  height: fit-content;
}

.row-alignment {
  vertical-align: middle;
  text-align: center;
}

.search-by-disease-name {
    width: 40%;
    padding-bottom: 20px;
}
</style>