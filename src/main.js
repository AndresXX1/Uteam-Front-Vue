// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'
import vuetify from '../plugins/vuetify' // Importa la configuración de Vuetify
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/style.css'; // Asegúrate de importar tu archivo de estilos

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(createPinia());
app.mount('#app')
