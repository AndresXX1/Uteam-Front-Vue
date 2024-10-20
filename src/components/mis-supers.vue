<template>
  <div>
    <div class="header">
      <router-link to="/home" class="back-button">
        <i class="fa fa-arrow-left"></i> Back
      </router-link>
      <h1 class="title">Mis Superhéroes Favoritos</h1>
    </div>
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
    <PiePagina class="footer" />
  </div>
</template>

<script setup>
import { useFavoritesStore } from '../stores/favorites';
import CardItem from './card-item.vue';
import Pagination from './pagination-item.vue';
import PiePagina from './pie-pagina.vue';
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
  if (paginatedFavorites.value.length === 0 && currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center; 
  justify-content: space-between; 
  margin-bottom: 20px; 
}

.back-button {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  background-color: #ff4d4d;
  padding: 6px 10px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

.back-button i {
  margin-right: 5px;
}

.back-button:hover {
  background-color: #e63939;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}

.title {
  font-family: 'Comic Sans MS', cursive, sans-serif;
  text-align: center;
  flex-grow: 1; 
}

.cards {
  display: flex;
  flex-wrap: wrap;
}

.footer {
  margin-top: 30px; 
}
</style>
