import { createRouter, createWebHistory } from 'vue-router';
import landingPage from '../components/landing-page.vue'; 
import home from '../components/home-page.vue';
import contactMe from '../components/contact-me.vue';
import aboutUs from '../components/about-us.vue';
import misSupers from '../components/mis-supers.vue';
import detailItem from '../components/detail-item.vue'; 

const routes = [
 
    { path: '/', component: landingPage }, 
    { path: '/home', component: home }, 
    { path: '/contact', component: contactMe },
    { path: '/misSupers', component: misSupers, props: true },
    { path: '/about', component: aboutUs },
    { path: '/detail-item/:id', name: 'DetailItem', component: detailItem }
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
