<template>
    <div class="container patient-container">
        <div class="d-flex flex-column bd-highlight holder-patient-div">
            <div style="padding-bottom: 20px"><span><i class="fa-solid fa-arrow-left-long" @click="onBackClick"/></span></div>

            <div class="d-flex flex-row">
                <img class="patient-icon" src="../assets/patient.png">
                <div class="d-flex flex-column">
                    <div class="patient-name-font-style">{{ firstName }}  {{ lastName }}</div>
                    <div class="row patient-info">
                         <div class="patient-role-font-style col-6">{{ jmbg }}</div>
                        <div class="patient-role-font-style col-4">{{ age }} years</div>
                        <div class="patient-role-font-style col-2">{{ gender }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex flex-row patient-symptoms-main-card">
            <div class="col section-card">
                <div class="row custom-style-row">
                        <div class="section-title title-font-style">Cancer symptoms</div>
                
                        <div class="row section-row">
                            <div class="col-1">
                                <span v-if="cancerDetectable">
                                    <i  class="fa-solid fa-check"></i>
                                </span>
                                <span v-else>
                                    <i class="fa-regular fa-x"></i>
                                </span>
                            </div>
                            <div class="col-11">Cancer is detectable</div>
                        </div>

                        <div class="row section-row">
                            <div class="col-1">
                                <span v-if="cancerGrown">
                                    <i class="fa-solid fa-check"></i>
                                </span>
                                <span v-else>
                                    <i class="fa-regular fa-x"></i>
                                </span>
                            </div>
                            <div class="col-11">Cancer has grown</div>
                        </div>

                        <div class="row section-row">
                            <div class="col-1">
                                <span v-if="cancerSpread">
                                    <i class="fa-solid fa-check"></i>
                                </span>
                                <span v-else>
                                    <i class="fa-regular fa-x"></i>
                                </span>
                            </div>
                            <div class="col-11">Cancer has spread</div>
                        </div>

                        <div class="row section-row">
                            <div class="col-1">
                                <span v-if="cancerSpreadToOrgans">
                                    <i class="fa-solid fa-check"></i>
                                </span>
                                <span v-else>
                                    <i class="fa-regular fa-x"></i>
                                </span>
                            </div>
                            <div class="col-11">Cancer has spread to organs</div>
                        </div>

                        <div class="row section-row">
                            <div class="col-1">
                                <span v-if="cancerReappeared">
                                    <i class="fa-solid fa-check"></i>
                                </span>
                                <span v-else>
                                    <i class="fa-regular fa-x"></i>
                                </span>
                            </div>
                            <div class="col-11">Cancer has reappeared</div>
                        </div>
                </div>
        </div>
           

    <div class="col section-card">
        <div class="row custom-style-row">

            <div class="section-title title-font-style">Life quality</div>

            <div class="row section-row">
                <div class="col-1">
                    <span v-if="strongPain">
                        <i class="fa-solid fa-check"></i>
                    </span>
                    <span v-else>
                        <i class="fa-regular fa-x"></i>
                    </span>
                </div>
                <div class="col-11">Has strong pain</div>
            </div>

            <div class="row section-row">
                <div class="col-1">
                    <span v-if="weightLoss">
                        <i class="fa-solid fa-check"></i>
                    </span>
                    <span v-else>
                        <i class="fa-regular fa-x"></i>
                    </span>
                </div>
                <div class="col-11">Has weight loss</div>
            </div>

            <div class="row section-row">
                <div class="col-1">
                    <span v-if="lifeQuality">
                        <i class="fa-solid fa-check"></i>
                    </span>
                </div>
                <div class="col-11">Has {{ getLifeQualityDescription() }} life quality</div>
            </div>
        </div>
    </div>

</div>

    <div class="d-flex flex-row patient-symptoms-main-card">
        <div class="col section-card">
            <div class="row custom-style-row">
                <div class="row section-title title-font-style">
                    <div class="col-8">Treatment info</div>
                    <div class="col-4 manage-disease">
                        <button class="btn btn-primary btn-sm manage-drug" @click="onPatientTreatedDrugDialogOpen" v-if="hasDisease.name">Manage</button>
                    </div>
                </div>

                <div class="row section-row">
                    <div class="col-1">
                        <span v-if="isTreatedWith.drugId">
                            <i class="fa-solid fa-check"></i>
                        </span>
                        <span v-else>
                            <i class="fa-regular fa-x"></i>
                        </span>
                    </div>
                    <div v-if="isTreatedWith.drugId" class="col-11">Patient is treated with {{ this.isTreatedWith.name }}</div>
                    <div v-else class="col-11">Drug is not added. Click manage to add treated drug.</div>
                </div>
            </div>
        </div>

        <div class="col section-card">
            <div class="row custom-style-row">
                <div class="row disease-section-title title-font-style">
                    <div class="col-8">Disease info</div>
                    <div class="col-4 manage-disease">
                        <button class="btn btn-primary btn-sm manage-disease" @click="onPatientDiseaseDialogOpen">Manage</button>
                    </div>
                </div>
                

                <div class="row section-row">
                    <div class="col-1">
                        <span v-if="hasDisease.name !== ''">
                            <i class="fa-solid fa-check"></i>
                        </span>
                        <span v-else>
                            <i class="fa-regular fa-x"></i>
                        </span>
                    </div>
                    <div v-if="hasDisease.name !== ''" class="col-11">Has disease {{ this.hasDisease.name }}</div>
                    <div v-else class="col-11">Disease is not added. Click Manage to add it.</div>
                </div>

                <div class="row section-row" v-if="hasDisease.name !== ''">
                    <div class="col-1">
                        <span v-if="symptoms.type !== ''">
                            <i class="fa-solid fa-check"></i>
                        </span>
                    </div>
                    <div v-if="symptoms.type !== ''" class="col-11">Has symptoms {{ this.symptoms.type }}</div>
                </div>

                 <div class="row section-row" v-if="hasDisease.name !== ''">
                    <div class="col-1">
                        <span v-if="diseaseCourse.type !== ''">
                            <i class="fa-solid fa-check"></i>
                        </span>
                    </div>
                    <div v-if="diseaseCourse.type !== ''" class="col-11">Has disease course {{ this.diseaseCourse.type }}</div>
                </div>

                 <div class="row section-row" v-if="hasDisease.name !== ''">
                    <div class="col-1">
                        <span v-if="diagnosis.type !== ''">
                            <i class="fa-solid fa-check"></i>
                        </span>
                    </div>
                    <div v-if="diagnosis.type !== ''" class="col-11">Has diagnosis {{ this.diagnosis.type }}</div>
                </div>

            </div>

        </div>
    </div>

    <add-patient-disease-dialog :visible="addPatientDiseaseDialogVisible"
                                :mode="mode"
                                :diseaseName="hasDisease.name"
                                :disesaseId="hasDisease.id"
                                :jmbg="jmbg"
                                :firstName="firstName"
                                :lastName="lastName"
                                @close-add-patient-disease-dialog="onPatientDiseaseDialogClose"
                                @add-patient-disease="onPatientDiseaseAdded">
    </add-patient-disease-dialog>

    <add-patient-treated-drug :visible="addPatientTreatedDrugDialogVisible"
                              :key="keyValue"
                              :jmbg="jmbg"
                              :firstName="firstName"
                              :lastName="lastName"
                              @close-add-patient-drug-dialog="onPatientTreatedDrugDialogClose"
                              @add-patient-treated-drug="onPatientTreatedDrugAdded">
    </add-patient-treated-drug>

</div>
</template>
<script lang="ts">
import { Disease } from "@/models/Disease";
import { DiseaseCourse } from "@/models/DiseaseCourse";
import { DiseaseDiagnosis } from "@/models/DiseaseDiagnosis";
import { DiseaseSymptom } from "@/models/DiseaseSymptom";
import { Drug } from "@/models/Drug";
import { Gender } from "@/models/Gender";
import { LifeQuality } from "@/models/LifeQuality";
import { Patient } from "@/models/Patient";
import { PatientDiagnosis } from "@/models/PatientDiagnosis";
import { PatientDiseaseCourse } from "@/models/PatientDiseaseCourse";
import { PatientSymptom } from "@/models/PatientSymptom";
import axios from "axios";
import { defineComponent } from "vue";
import AddPatientDiseaseDialog from "./dialogs/AddPatientDiseaseDialog.vue";
import AddPatientTreatedDrug from "./dialogs/AddPatientTreatedDrug.vue";

export default defineComponent({ 
    name: 'Patient',
    components: {
        AddPatientDiseaseDialog,
        AddPatientTreatedDrug
    },
    data() {
        return {
            addPatientDiseaseDialogVisible: false,
            mode: 'CREATE',
            keyValue: 1,
            addPatientTreatedDrugDialogVisible: false,
            jmbg: '',
            firstName: '',
            lastName: '',
            age: 0,
            gender: Gender.FEMALE,
            cancerSpread: false,
            cancerGrown: false,
            cancerSpreadToOrgans: false,
            strongPain: false,
            cancerReappeared: false,
            weightLoss: false,
            cancerDetectable: false,
            lifeQuality: LifeQuality.SAME,
            hasDisease: { name: '', id: 0} as Disease,
            isTreatedWith: { drugId: '', name: ''} as Drug,
            person: {} as Patient,
            diseaseCourse: { type: DiseaseCourse.DEFAULT, isCancerDetectable: false, isCancerReappear: false } as PatientDiseaseCourse,
            diagnosis: { type: DiseaseDiagnosis.DEFAULT, isCancerSpread: false, isCancerGrown: false, isCancerSpreadToOrgans: false } as PatientDiagnosis,
            symptoms: { type: DiseaseSymptom.DEFAULT, strongPain: false, weightLoss: false, lifeQuality: LifeQuality.SAME } as PatientSymptom
        }
    },
    async created() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        const jmbg = this.$route.params.jmbg;
        await axios.get('persons/' + jmbg)
        .then((response) => {
            console.log('Response: ', response);
            this.person = response.data;
            this.jmbg = response.data.jmbg;
            this.firstName = response.data.firstName;
            this.lastName = response.data.lastName;
            this.age = response.data.age;
            this.gender = response.data.gender;
            this.cancerSpread = response.data.isCancerSpread;
            this.cancerGrown = response.data.isCancerGrown;
            this.cancerSpreadToOrgans = response.data.isCancerSpreadToOrgans;
            this.strongPain = response.data.strongPain;
            this.cancerReappeared = response.data.isCancerReappear;
            this.weightLoss = response.data.weightLoss;
            this.cancerDetectable = response.data.isCancerDetectable;
            this.lifeQuality = response.data.lifeQuality;
        })
        .catch((error) => {
            console.log("Error happened ", error.data);
        });

        await axios.get('/diseases/person-disease/' + this.jmbg)
        .then((response) => {
            console.log('Response from person-disease ', response);
            if (Object.keys(response.data.disease).length > 0) {
                this.hasDisease = {
                    id: response.data.disease.id,
                    name: response.data.disease.name
                } as Disease;
                this.getPatientInferredFacts();
            }
        })
        .catch((error) => {
            console.log("Error happened ", error.data);
        });

            await axios.get('/drugs/person-treated-drug/' + this.jmbg)
            .then((response) => {
                console.log('Response from person-treated-drug ', response);
                this.isTreatedWith.name = response.data.drugName;
                this.isTreatedWith.drugId = response.data.drugId;
            })
            .catch((error) => {
                console.log("Error happened ", error.data);
            });
        
    },
    methods: {
        getLifeQualityDescription(): string | undefined {
            if (this.lifeQuality === LifeQuality.SAME) return 'the same';
            if (this.lifeQuality === LifeQuality.WORSE) return 'the worse';
            if (this.lifeQuality === LifeQuality.MUCH_BETTER) return 'much better';
        },
        onPatientDiseaseDialogOpen(): void {
            if (this.hasDisease.id !== 0) {
                this.mode = 'UPDATE';
            }
            if (this.hasDisease.id === 0) {
                this.mode = 'CREATE';
            }
            this.addPatientDiseaseDialogVisible = true;
        },
        onPatientDiseaseDialogClose(): void {
            this.addPatientDiseaseDialogVisible = false;
        },
        onPatientTreatedDrugDialogOpen(): void {
            this.keyValue += 1;
            this.addPatientTreatedDrugDialogVisible = true;
        },
        onPatientTreatedDrugDialogClose(): void {
            this.addPatientTreatedDrugDialogVisible = false;
        },
        onPatientDiseaseAdded(id?: number, name?: string): void {
            this.hasDisease.id = id;
            this.hasDisease.name = name;
            this.getPatientInferredFacts();
        },
        onPatientTreatedDrugAdded(id?: string, name?: string): void {
            this.isTreatedWith.drugId = id;
            this.isTreatedWith.name = name;
        },
        async getPatientInferredFacts() {
            await axios.post('/persons/infer-facts', { ...this.person, hasDisease: this.hasDisease})
            .then((response) => {
                console.log('Response from persons/infer-facts ', response);
                this.diseaseCourse = response.data.diseaseCourse || this.diseaseCourse;
                this.symptoms = response.data.symptoms || this.symptoms;
                this.diagnosis = response.data.diagnosis || this.diagnosis;
            })
            .catch((error) => {
                console.log("Error happened ", error.data);
            });
        },
        onBackClick(): void {
            this.$router.go(-1);
        },
    }

});

</script>
<style scoped>
.patient-container {
  margin-top: 50px;
  width: fit-content;
  background-color: white;
}

.holder-patient-div {
  padding: 50px;
}

.patient-icon {
  width: 100px;
  height: 100px;
}

.patient-name-font-style {
  padding: 10px;
  font-size: 30px;
}

.patient-role-font-style {
  padding-left: 10px;
  font-size: 20px;
}

.section-card {
    border: solid thin #D3D3D3;
}

.section-title {
    padding: 20px;
}

.title-font-style {
    font-weight: 800;
}

.section-row {
    padding-left: 25px;
}

.patient-symptoms-main-card {
    padding: 30px;
    gap: 20px;
}

.patient-info {
    padding: 12px;
}

.custom-style-row {
    padding-left: 10px;
    padding-bottom: 10px;
}

.manage-disease {
    text-align: end;
}

.disease-section-title {
    padding-left: 20px;
    padding-right: 10px;
    padding-top: 20px;
}

</style>