import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './axios'
import store from './vuex';

const app = createApp(App);

app.config.globalProperties.$store = store;
app.use(router).mount('#app')
