<template>
  <div class="container login-container">
    <div class="d-flex flex-column bd-highlight align-items-center holder-login-div">
        <div><img class="login-icon" src="../assets/hospital_icon.png"></div>
        <h4 class="sign-in-font-style">Hello, please sign in</h4>
        <form @submit.prevent="handleSignIn">
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
            <div class="d-grid col-12 mx-auto text-center">
                <button class="btn btn-md btn-primary sign-in-button" type="submit" id="signInBtn">Sign in</button>
            </div>
        </form>
    </div>
</div>
    
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { JwtResponse } from '../models/JwtResponse';
import { UserLoginData } from '../models/UserLoginData';

export default defineComponent({
    name: 'Login',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        async handleSignIn() {
            const loginData: UserLoginData = {
                username: this.username,
                password: this.password
            }
            const response = await axios.post('login', loginData);

            const jwtResponse: JwtResponse = { jwt: response.data.jwt }; 
            localStorage.setItem('token', jwtResponse.jwt);

            this.$router.push('/profile');
        }
    }
});
</script>

<style scoped>
.login-container {
  margin-top: 100px;
  width: fit-content;
  background-color: white;
}

.holder-login-div {
  padding: 50px;
}

.sign-in-font-style {
  padding: 10px;
}

.login-icon {
  width: 100px;
  height: 100px;
}

.sign-in-button {
  margin-top: 20px;
}

</style>