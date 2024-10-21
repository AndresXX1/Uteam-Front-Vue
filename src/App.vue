<template>
  <div id="app" :class="{ 'landing-page': isLandingPage }">
    <DashboardComponent 
      v-if="!isLandingPage" 
      :favorites="favorites" 
      @toggle-favorite="toggleFavorite" 
    />
    <router-view v-if="isLandingPage" />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import DashboardComponent from './components/dashboard-component.vue';

export default {
  components: {
    DashboardComponent,
  },
  setup() {
    const favorites = ref([]);
    const route = useRoute();

    //computed property para verificar si estamos en la landing page
    const isLandingPage = computed(() => route.path === '/');

    const toggleFavorite = (hero, remove = false) => {
      if (remove) {
        favorites.value = favorites.value.filter(f => f.id !== hero.id);
        console.log('Héroe eliminado de favoritos:', hero);
      } else {
        if (!favorites.value.some(f => f.id === hero.id)) {
          favorites.value.push(hero);
          console.log('Héroe añadido a favoritos:', hero);
        }
      }
    };

    return {
      favorites,
      isLandingPage,
      toggleFavorite,
    };
  }
}
</script>

<style>
/* Estilos globales */
@import url('https://fonts.googleapis.com/css2?family=Avenir:wght@400;700&display=swap');

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Avenir', sans-serif;
}

#app {
  height: 100%;
  width: 100%;
  overflow: auto; 
}

.landing-page {
  background: none; 
}

#app:not(.landing-page) {
  background-image: url('https://imgs.search.brave.com/lxY1ZEVMHgRp7iZDxhSHqJjlBExpDKJxKFjr6r3YflM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Y2L2Ji/Lzc5L2Y2YmI3OWU0/ZGI0NzlkMzNkNzM3/YzQ1MDM0MjJlNTU4/LmpwZw');
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
  background-attachment: fixed; 
}


@media screen and (max-width: 768px) {
  #app:not(.landing-page) {
    background-attachment: scroll; 
    background-size: cover;
  }
}
</style>
