<template>
    <div class="container register-container">
      <div class="d-flex flex-column bd-highlight align-items-center holder-register-div">
        <div><img class="register-icon" src="../assets/hospital_icon.png"></div>
        <h4 class="register-font-style">Hello, please register</h4>
        <form @submit.prevent="handleRegister">
            <div class="mb-3 form-group row">
                <label for="inputFirstName" class="col-sm-6 col-form-label">First name</label>
                <div>
                    <input type="text" class="form-control" id="inputFirstName" v-model="firstName">
                </div>
            </div>
            <div class="mb-3 form-group row">
                <label for="inputLastName" class="col-sm-6 col-form-label">Last name</label>
                <div>
                    <input type="text" class="form-control" id="inputLastName" v-model="lastName">
                </div>
            </div>
            <div class="mb-3 form-group row">
                <label for="inputUsername" class="col-sm-2 col-form-label">Username</label>
                <div>
                    <input type="text" class="form-control" id="inputUsername" v-model="username">
                </div>
            </div>
            <div class="mb-3 form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div>
                    <input type="password" class="form-control" id="inputPassword" v-model="password">
                </div>
            </div>
            <div class="mb-3 form-group row select-role">
                <label for="selectRole" class="col-sm-2 col-form-label">Role</label>
                <select class="form-control" id="selectRole" v-model="role">
                    <option v-for="option in roleOptions" :key="option.text" :value="option.value">{{ option.text }}</option>
                </select>
            </div>
            <div class="d-grid col-18 mx-auto text-center">
                <button class="btn btn-md btn-primary register-button" type="submit" id="registerBtn">Register</button>
            </div>
        </form>
      </div>
    </div>
    
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UserRole } from '../models/UserRole';
import { UserRegisterData } from '../models/UserRegisterData';
import axios from "axios";

export default defineComponent({
  name: 'Register',
  data() {
      return {
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          role: UserRole.DOCTOR,
          roleOptions: [ { text: 'Doctor', value: UserRole.DOCTOR },
                         { text: 'Pharmacist', value: UserRole.PHARMACIST } ]
      }
  },
  methods: {
      async handleRegister() {
          const registerData: UserRegisterData = {
              username: this.username,
              password: this.password,
              firstName: this.firstName,
              lastName: this.lastName,
              role: this.role
          };

          const response = await axios.post('register', registerData);
          alert('Success register. Please login.'); 
          this.$router.push('/login');
      }
  }


});
</script>

<style>
.register-container {
  margin-top: 100px;
  width: fit-content;
  background-color: white;
}

.holder-register-div {
  padding: 50px;
}

.register-font-style {
  padding: 10px;
}

.register-icon {
  width: 100px;
  height: 100px;
}

.register-button {
  margin-top: 20px;
  margin-left: -5px;
  width: 102%;
}

.select-role {
    padding-left: 10px;
    width: 104%;
}
</style>