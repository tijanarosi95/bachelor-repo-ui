<template>
    <div class="container disease-container">
        <div class="d-flex flex-column bd-highlight holder-disease-div">
            <div style="padding-bottom: 20px"><span><i class="fa-solid fa-arrow-left-long" @click="onBackClick"/></span></div>

            <div class="d-flex flex-row">
                <img class="disease-icon" src="../assets/disease.png">
                <div class="d-flex flex-column">
                    <div class="row disease-name-font-style">{{ diseaseName }}</div>
                </div>
            </div>
        </div>

        <div class="d-flex flex-row disease-info-main-card">
            <div class="col section-card">
                <div class="row custom-style-row">
                    <div class="row section-title title-font-style">
                        <div class="col-10">
                            <div>Disease can be treated by those drugs</div>
                        </div>
                        <!-- <div class="col-2 manage-disease-info" v-if="isLoggedUserDoctor">
                            <button class="btn btn-primary btn-sm manage-disease">Manage</button>
                        </div> -->
                    </div>
                    <div class="row section-row">
                        <div class="disease-drugs-table">
                            <table class="table">
                                <thead>
                                    <tr class="row-alignment">
                                        <th scope="col">#</th>
                                        <th scope="col">Drug name</th>
                                        <th scope="col">Active ingredient</th>
                                        <th scope="col">Approved</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in this.drugs" :key="item.drugId" class="row-alignment">
                                        <th scope="row">{{ setColCounter(index) }}</th>
                                            <td>{{ item.name }}</td>
                                            <td>{{ item.activeIngredient }}</td>
                                            <td>{{ isApproved(item.approved) }}</td>
                                            <td><button class="btn btn-secondary drug-info-btn" 
                                                type="button"
                                                @click="onShowDrugInfo(item.drugId)">See more info</button></td>
            
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { UserRole } from "@/models/UserRole";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({ 
    name: 'Disease',
    data() {
        return {
            diseaseName: '',
            drugs: []
        }
    },
    async created() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        const diseaseId = this.$route.params.diseaseId;
        await axios.get('/diseases/' + diseaseId)
        .then((response) => {
            console.log('Disease response ', response);
            this.diseaseName = response.data.name;

            const params = new URLSearchParams();
            params.append('diseaseType', this.diseaseName);

            //get drugs by whom is treated this disease
            axios.get('/drugs/diseases/', { params: params })
            .then((response) => {
                console.log('Response from /drugs/diseases/', response);
                this.drugs = response.data;
            })
            .catch((error) => {});
        })
        .catch((error) => {

        });        
    },
    methods: {
        setColCounter(index: number): number {
            return index+=1;
        },
        onBackClick(): void {
            this.$router.go(-1);
        },
        isLoggedUserDoctor(): boolean {
            return !!UserRole.DOCTOR.includes(localStorage.getItem('role') || '');
        },
        isApproved(approved: boolean): string {
            return approved ? 'Yes' : 'No'; 
        },
        onShowDrugInfo(drugId: number): void {
            this.$router.push('/drugs/' + drugId);
        }
    },
    
});

</script>
<style scoped>

.disease-container {
  margin-top: 50px;
  width: max-content;
  background-color: white;
}

.holder-disease-div {
  padding: 20px;
}

.disease-icon {
  width: 100px;
  height: 100px;
}

.disease-name-font-style {
  padding-left: 30px;
  padding-top: 10px;
  font-size: 30px;
}

.custom-style-row {
    padding-left: 10px;
    padding-bottom: 10px;
}

.section-title {
    padding: 20px;
}

.title-font-style {
    font-weight: 800;
}

.row-alignment {
  vertical-align: middle;
  text-align: center;
}

.disease-info-main-card {
  padding: 20px;
  gap: 20px;
}

.section-card {
  border: solid thin #D3D3D3;
}
</style>