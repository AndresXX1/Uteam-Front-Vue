<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      :temporary="!isSmAndUp"
      :clipped="isSmAndUp"
      :width="280"
      class="menu-drawer"
    >
      <v-list class="menu-list">
        <v-list-item
          v-for="item in menuItems"
          :key="item.text"
          :to="item.to"
          router
          class="menu-item"
        >
          <div class="menu-item-content">
            <v-icon>{{ item.icon }}</v-icon>
            <span>{{ item.text }}</span>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <div class="toolbar-title">
        <a href="https://developer.marvel.com/" target="_blank" rel="noopener noreferrer">
          <img
            src="https://w7.pngwing.com/pngs/704/824/png-transparent-marvel-studios-logo-walt-disney-studios-marvel-studios-marvel-cinematic-universe-logo-film-studio-marvel-miscellaneous-fictional-characters-studio.png"
            alt="Marvel Logo"
            class="marvel-logo"
          />
        </a>
      </div>
    </v-app-bar>

    <v-main class="dashboard-background">
      <v-container fluid class="dashboard-content">
        <router-view :favorites="favorites" @toggle-favorite="toggleFavorite" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import { useFavoritesStore } from '../stores/favorites';

const favoritesStore = useFavoritesStore();
const favorites = favoritesStore.favorites;

const drawer = ref(false);
const display = useDisplay();
const isSmAndUp = display.smAndUp;

const menuItems = [
  { text: 'Inicio', to: '/home', icon: 'mdi-home' },
  { text: 'Mis Supers', to: '/misSupers', icon: 'mdi-star' },
  { text: 'Contáctame', to: '/contact', icon: 'mdi-email' },
  { text: 'Sobre Mi', to: '/about', icon: 'mdi-information' },
];

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const toggleFavorite = (hero, isFavorite) => {
  if (isFavorite) {
    favoritesStore.addFavorite(hero);
  } else {
    favoritesStore.removeFavorite(hero);
  }
};
</script>

<style scoped>
.menu-drawer {
  background-image: url('https://i.etsystatic.com/44733518/r/il/b7486f/5240256194/il_fullxfull.5240256194_cocu.jpg');
  background-position: 10% center;
  background-size: cover;
}

.menu-list {
  padding-top: 0px; /* Ajusta este valor para mover las opciones hacia abajo */
}

.menu-item {
  padding: 10px 30px;
}

.menu-item:hover {
  background-color: rgba(233, 67, 67, 0.481);
}

.menu-item-content {
  display: flex;
  align-items: center;
}

.menu-item-content v-icon {
  margin-right: 10px; /* Espacio entre el ícono y el texto */
}

.toolbar-title {
  flex-grow: 1; /* Permite centrar la imagen en la barra */
  display: flex;
  justify-content: center;
}

.marvel-logo {
  height: 40px; /* Ajusta el tamaño de la imagen según necesites */
}

.dashboard-content {
  padding: 20px; /* Espaciado interno */
}
</style>
