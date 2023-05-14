<template>
    <nav class="navbar navbar-expand navbar-light fixed top">
        <div class="container">
            <a href="#" class="navbar-brand">Medical info system</a>
            <div class="d-flex justify-content-around">
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" @click="goToProfile">Profile</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" @click="handleLogOut">Log out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>      
    </nav>
</template>

<script lang="ts">
import { UserRole } from "@/models/UserRole";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent ({
    name: 'Navigation',
    methods: {
        handleLogOut(): void {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common["Authorization"];
            this.$router.push('/login');
        },
        goToProfile(): void {
            const loggedUserRole = localStorage.getItem('role');
            if (loggedUserRole === UserRole.DOCTOR) {
                this.$router.push('/doctor-profile');
            } else if (loggedUserRole === UserRole.PHARMACIST) {
                this.$router.push('/pharmacist-profile');
            }
        }
    }
});
</script>

<style>
.navbar-light {
    background-color: #fff;
}

</style>