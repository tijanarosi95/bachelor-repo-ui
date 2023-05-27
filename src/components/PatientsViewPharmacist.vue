<template>
  <div class="container patients-container">

      <div class="d-flex flex-column bd-highlight holder-patients-div">
            <span><i class="fa-solid fa-arrow-left-long" @click="onBackClick"/></span>

            <div class="d-flex flex-row">
                <img class="patients-icon" src="../assets/patient.png">
                <div class="d-flex flex-row patients-view-summary">
                    <div class="overview-text">Here you can see the patients and filter them by treated drug</div>
                </div>
            </div>
      </div>
      <div class="patients-table">
          <div class="search-by-drug-name">
                <input type="text" class="form-control" id="drugName" v-model="drugName" @input="onDrugNameEntered" placeholder="Type to search by treated drug name...">
            </div>
          <table class="table">
            <thead>
              <tr class="row-alignment">
               <th scope="col">#</th>
               <th scope="col">First name</th>
               <th scope="col">Last name</th>
               <th scope="col">JMBG</th>
               <th scope="col">Age</th>
               <th scope="col">Has disease</th>
               <th scope="col"></th>
               <th scope="col"></th>
             </tr>
           </thead>
           <tbody>
            <tr v-for="(item, index) in filteredPatients" :key="item.jmbg" class="row-alignment">
              <th scope="row">{{ setColCounter(index) }}</th>
              <td>{{ item.firstName }}</td>
              <td>{{ item.lastName }}</td>
              <td>{{ item.jmbg }}</td>
              <td>{{ item.age }}</td>
              <td>{{ item.hasDisease.name }}</td>
              <td></td>
              <td><button class="btn btn-secondary patient-info-btn" 
                          type="button"
                          @click="onShowPatientInfo(item.jmbg)">See more info</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
    name:'PatientsViewPharmacist',
    data() {
        return {
            drugName: ''
        }
    },
    async created() {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
      const response = await axios.get('persons/drug');
      console.log('Response from GET /persons/drug : ', response);
      this.$store.dispatch('patients', response.data);
    },
    methods: {
      setColCounter(index: number): number {
        return index+=1;
      },
      onBackClick(): void {
        this.$router.go(-1);
      },
      onDrugNameEntered(): void {
        this.$store.dispatch('filterPatients', this.drugName);
      },
      onShowPatientInfo(jmbg: string): void {
        this.$router.push('/patients/' + jmbg);
      }
    },
    computed: {
      ...mapGetters(['filteredPatients'])
    }
});

</script>

<style scoped>
.patients-container {
  margin-top: 50px;
  width: fit-content;
  background-color: white;
}

.holder-patients-div {
    padding: 30px;
}

.patients-icon {
  width: 150px;
  height: 150px;
}

.patients-table {
    padding-top: 30px;
}

.search-by-drug-name {
    width: 40%;
    padding-bottom: 20px;
}

.patients-view-summary {
  padding: 10px;
  font-size: 20px;
}

.overview-text {
  padding-top: 10px;
  padding-right: 30px;
  font-weight: 500;
}

.patients-table {
  padding: 20px;
}

.row-alignment {
  vertical-align: middle;
  text-align: center;
}

</style>