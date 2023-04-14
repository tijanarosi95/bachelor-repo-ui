<template>
  <div class="container patients-container">
      <div class="d-flex flex-column bd-highlight holder-patients-div">
            <div class="d-flex flex-row">
                <img class="patients-icon" src="../assets/patient.png">
                <div class="d-flex flex-row patients-view-summary">
                    <div class="overview-text">Here you can see and manage patients</div>
                    <button class="btn btn-primary add-patient-btn" 
                            type="button"
                            @click="onAddPatientClick"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal">Add patient</button>
                </div>
            </div>
      </div>
      <div class="patients-table">
          <table class="table">
            <thead>
              <tr class="row-alignment">
               <th scope="col">#</th>
               <th scope="col">First name</th>
               <th scope="col">Last name</th>
               <th scope="col">JMBG</th>
               <th scope="col">Gender</th>
               <th scope="col">Age</th>
               <th scope="col"></th>
               <th scope="col"></th>
             </tr>
           </thead>
           <tbody>
            <tr v-for="(item, index) in patients" :key="item.jmbg" class="row-alignment">
              <th scope="row">{{ setColCounter(index) }}</th>
              <td>{{ item.firstName }}</td>
              <td>{{ item.lastName }}</td>
              <td>{{ item.jmbg }}</td>
              <td>{{ item.gender }}</td>
              <td>{{ item.age }}</td>
              <td><button class="btn btn-secondary patient-info-btn" 
                            type="button"
                            @click="onShowPatientInfo" 
                            data-bs-toggle="modal"
                            data-bs-target="#patientInfo">See more info</button>
              </td>
              <td><button class="btn btn-danger patient-delete-btn" 
                            type="button"
                            @click="onDeletePatientClick(item.firstName, item.lastName, item.jmbg)" 
                            data-bs-toggle="modal"
                            data-bs-target="#patientDeleteModal">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <add-patient-dialog :visible="addPatientDialogVisible" 
                          @close-add-patient-dialog="onAddPatientDialogClose">
      </add-patient-dialog>

      <confirm-patient-delete-dialog :visible="deletePatientDialogVisible"
                                     :firstName="patientFirstNameToDelete"
                                     :lastName="patientLastNameToDelete"
                                     :jmbg="patientJmbgToDelete"
                                     @close-delete-patient-dialog="onDeletePatientDialogClose">
      </confirm-patient-delete-dialog>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AddPatientDialog from "./dialogs/AddPatientDialog.vue";
import axios from "axios";
import { mapGetters } from "vuex";
import ConfirmPatientDeleteDialog from "./dialogs/ConfirmPatientDeleteDialog.vue";

export default defineComponent ({ 
    name: 'Patients',
    components: {
      AddPatientDialog,
      ConfirmPatientDeleteDialog
    },
    data() {
      return {
        addPatientDialogVisible: false,
        deletePatientDialogVisible: false,
        patientJmbgToDelete: '',
        patientFirstNameToDelete: '',
        patientLastNameToDelete: ''
      }
    },
    async created() {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
      const response = await axios.get('persons');
      console.log('Response from GET /persons all: ', response);
      this.$store.dispatch('patients', response.data);
    },
    methods: {
      setColCounter(index: number): number {
        return index+=1;
      },
      onAddPatientClick(): void {
        this.addPatientDialogVisible = true;
      },
      onDeletePatientClick(firstName?: string, lastName?: string, jmbg?: string): void {
        this.patientFirstNameToDelete = firstName || '';
        this.patientLastNameToDelete = lastName || '';
        this.patientJmbgToDelete = jmbg || '';
        this.deletePatientDialogVisible = true;
      },
      onAddPatientDialogClose(): void {
        this.addPatientDialogVisible = false;
      },
      onDeletePatientDialogClose(): void {
        this.deletePatientDialogVisible = false;
      },
      onShowPatientInfo(): void {

      }
    },
    computed: {
      ...mapGetters(['patients'])
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

.add-patient-btn {
  height: fit-content;
}

.row-alignment {
  vertical-align: middle;
  text-align: center;
}

</style>