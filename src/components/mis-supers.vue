<template>
    <div>
      <h1 class="title">Mis Superhéroes Favoritos</h1>
      <div v-if="!paginatedFavorites.length">
        <p>No tienes superhéroes favoritos...</p>
      </div>
      <div v-else>
        <Pagination
          :totalPages="totalPages"
          :currentPage="currentPage"
          @page-changed="changePage"
        />
        <div class="cards">
          <CardItem
            v-for="hero in paginatedFavorites"
            :key="hero.id"
            :hero="hero"
            :isFavorite="true"
            @toggle-favorite="removeFavorite"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useFavoritesStore } from '../stores/favorites';
  import CardItem from './card-item.vue';
  import Pagination from './pagination-item.vue';
  import { computed, ref } from 'vue';
  
  const favoritesStore = useFavoritesStore();
  const favorites = computed(() => favoritesStore.favorites);
  
  const currentPage = ref(1);
  const itemsPerPage = 9;
  
  const totalPages = computed(() => Math.ceil(favorites.value.length / itemsPerPage));
  
  const paginatedFavorites = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return favorites.value.slice(start, start + itemsPerPage);
  });
  
  const changePage = (page) => {
    currentPage.value = page;
  };
  
  const removeFavorite = (hero) => {
    favoritesStore.removeFavorite(hero);
    // Si el super eliminado estaba en la pag actual, actualiza la lista
    if (paginatedFavorites.value.length === 0 && currentPage.value > 1) {
      currentPage.value--; // Volver a la página anterior si es necesario
    }
  };
  </script>
  
  <style scoped>
  .title {
    font-family: 'Comic Sans MS', cursive, sans-serif; 
    text-align: center; 
    margin-bottom: 20px; 
  }
  
  .cards {
    display: flex;
    flex-wrap: wrap;
  }
  </style>
  