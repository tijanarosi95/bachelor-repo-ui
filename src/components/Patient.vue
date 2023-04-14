<template>
    <div class="container patient-container">
        <div class="d-flex flex-column bd-highlight holder-patient-div">
            <div class="d-flex flex-row">
                <img class="patient-icon" src="../assets/patient.png">
                <div class="d-flex flex-column">
                    <div class="patient-name-font-style">{{ firstName }}  {{ lastName }}</div>
                    <div class="row patient-info">
                         <div class="patient-role-font-style col-6">{{ jmbg }}</div>
                        <div class="patient-role-font-style col-4">{{ age }} year(s)</div>
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
           <div>
    </div>


    <div class="col section-card">
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
</template>
<script lang="ts">
import { Gender } from "@/models/Gender";
import { LifeQuality } from "@/models/LifeQuality";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({ 
    name: 'Patient',
    data() {
        return {
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
        }
    },
    async created() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        const jmbg = this.$route.params.jmbg;
        await axios.get('persons/' + jmbg)
        .then((response) => {
            console.log('Response: ', response);
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
        
    },
    methods: {
        getLifeQualityDescription(): string | undefined {
            if (this.lifeQuality === LifeQuality.SAME) return 'the same';
            if (this.lifeQuality === LifeQuality.WORSE) return 'the worse';
            if (this.lifeQuality === LifeQuality.MUCH_BETTER) return 'much better';
        }
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

</style>