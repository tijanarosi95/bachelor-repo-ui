<template>
  <div class="container patients-container">
      <div class="d-flex flex-column bd-highlight holder-patients-div">
            <div class="d-flex flex-row">
                <img class="patients-icon" src="../assets/patient.png">
                <div class="d-flex flex-row patients-view-summary">
                    <div class="overview-text">Here you can see and manage patients</div>
                    <button class="btn btn-primary add-patient-btn">Add patient</button>
                </div>
            </div>
      </div>
      <div class="patients-table">
          <table class="table">
            <thead>
              <tr>
               <th scope="col">#</th>
               <th scope="col">First</th>
               <th scope="col">Last</th>
               <th scope="col">JMBG</th>
               <th scope="col">Gender</th>
               <th scope="col"></th>
             </tr>
           </thead>
           <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent ({ 
    name: 'Patients',

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

</style>