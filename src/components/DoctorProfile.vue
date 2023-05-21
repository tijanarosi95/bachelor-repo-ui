<template>
    <div class="container profile-container">
        <div class="d-flex flex-column bd-highlight holder-profile-div">
            <div class="d-flex flex-row">
                <img class="profile-icon" src="../assets/doctor-icon-1.png">
                <div class="d-flex flex-column">
                    <div class="profile-name-font-style">{{ firstName }}  {{ lastName }}</div>
                    <div class="profile-role-font-style">{{ role }}</div>
                </div>
            </div>
        </div>

        <div class="row card-container">
            <div class="col-4 mb-4">
                <div class="card">
                   <img class="card-img-top" src="../assets/patient.png" alt="Patient cap">
                   <div class="card-body">
                      <h5 class="card-title">Patients</h5>
                      <p class="card-text">View and manage patients treated by specific drugs registered in this system.</p>
                      <button class="btn btn-primary manage-btn" @click="onPatientsClick">Manage</button>
                   </div>
                </div>
            </div>
            
            <div class="col-4 mb-4">
                <div class="card">
                   <img class="card-img-top" src="../assets/drug1.png" alt="Drug cap">
                   <div class="card-body">
                      <h5 class="card-title">Drugs</h5>
                      <p class="card-text">View and manage different drug's types which are registered in this system.</p>
                      <button class="btn btn-primary manage-btn" @click="onDrugsClick">Manage</button>
                   </div>
                </div>
            </div>

            <div class="col-4 mb-4">
                <div class="card">
                   <img class="card-img-top" src="../assets/disease.png" alt="Disease cap">
                   <div class="card-body">
                      <h5 class="card-title">Diseases</h5>
                      <p class="card-text">View and manage different diseases types which are registered in this system.</p>
                      <button class="btn btn-primary manage-btn" @click="onDiseasesClick">Manage</button>
                   </div>
                </div>
            </div>

           <div>
        </div>
    </div>
</div>      
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
    name: 'DoctorProfile',
    data() {
        return {
            firstName: '',
            lastName: '',
            role: ''
        }
    },
    async created() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        const response = await axios.get('profile');
        console.log('Response: ', response);
        this.firstName = response.data.firstName;
        this.lastName = response.data.lastName;
        this.role = response.data.userRole;
    },
    methods: {
        onPatientsClick(): void {
            this.$router.push('/patients');
        },
        onDrugsClick(): void {
            this.$router.push('/doctor-view-drugs');
        },
        onDiseasesClick(): void {
            this.$router.push('/diseases');
        }
    }
});

</script>

<style>
.profile-container {
  margin-top: 50px;
  width: fit-content;
  background-color: white;
}

.card-container {
  padding: 30px;
}

.holder-profile-div {
  padding: 50px;
}

.profile-name-font-style {
  padding: 10px;
  font-size: 30px;
}

.profile-role-font-style {
  padding-left: 10px;
  font-size: 20px;
}

.profile-icon {
  width: 100px;
  height: 100px;
}

.card-img-top {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.card-body, .card-img-top {
    padding: 15px;
}

.card {
    width: 20rem;
}

.manage-btn {
    width: 100%;
}

</style>