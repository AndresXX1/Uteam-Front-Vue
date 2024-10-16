import { createRouter, createWebHistory } from 'vue-router';
import home from '../components/home-page.vue';
import dashboard from '../components/dashboard-component.vue';

const routes = [
  { path: '/', component: home },
  { path: '/dashboard', component: dashboard },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
