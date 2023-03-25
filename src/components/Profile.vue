<template>
    <div class="container profile-container">
        <div class="d-flex flex-column bd-highlight align-items-center holder-profile-div">
            <div class="d-flex flex-row">
                <img class="profile-icon" src="../assets/user.png">
                <div>{{ firstName }}  {{ lastName }}</div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
    name: 'Profile',
    data() {
        return {
            firstName: '',
            lastName: ''
        }
    },
    async created() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        const response = await axios.get('profile');
        console.log('Response: ', response);
        this.firstName = response.data.firstName;
        this.lastName = response.data.lastName;
    },
    get userLoaded() {
        return this.firstName !== '' && this.lastName !== '';
    }
});

</script>

<style>
.profile-container {
  margin-top: 100px;
  width: fit-content;
  background-color: white;
}

.holder-profile-div {
  padding: 50px;
}

.profile-font-style {
  padding: 10px;
}

.profile-icon {
  width: 100px;
  height: 100px;
}

</style>