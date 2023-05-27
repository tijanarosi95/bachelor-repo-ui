import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import DoctorProfile from '@/components/DoctorProfile.vue';
import PharmacistProfile from '@/components/PharmacistProfile.vue';
import DrugsViewDoctor from '@/components/DrugsViewDoctor.vue';
import DrugsViewPharmacist from '@/components/DrugsViewPharmacist.vue';
import Patients from '@/components/Patients.vue';
import PatientsViewPharmacist from '@/components/PatientsViewPharmacist.vue';
import Patient from '@/components/Patient.vue';
import Drug from '@/components/Drug.vue';
import Diseases from '@/components/Diseases.vue';
import Disease from '@/components/Disease.vue';

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
      path: '/doctor-profile',
      component: DoctorProfile
    },
    {
      path: '/pharmacist-profile',
      component: PharmacistProfile
    },
    {
      path: '/patients',
      component: Patients
    },
    {
      path: '/patients/:jmbg',
      component: Patient
    },
    {
      path: '/doctor-view-drugs',
      component: DrugsViewDoctor
    },
    {
      path: '/pharmacist-view-drugs',
      component: DrugsViewPharmacist
    },
    {
      path: '/drugs/:drugId',
      component: Drug
    },
    {
      path: '/diseases',
      component: Diseases
    },
    {
      path: '/diseases/:diseaseId',
      component: Disease
    },
    {
      path: '/patients-view',
      component: PatientsViewPharmacist
    }
  ],
})