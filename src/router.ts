import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Profile from '@/components/Profile.vue';
import Patients from '@/components/Patients.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Login,
      meta: { requiresAuth: false,
              forVisitors: true,
              hideNavbar: true }
    },
    {
      path: '/login',
      component: Login,
      meta: { requiresAuth: false,
              forVisitors: true,
              hideNavbar: true },
    },
    {
      path: '/register',
      component: Register,
      meta: { requiresAuth: false,
              forVisitors: true,
              hideNavbar: true },
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/patients',
      component: Patients
    }
  ],
})