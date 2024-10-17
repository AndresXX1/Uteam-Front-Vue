<template>
  <div>
    <div class="cards">
      <CardItem
        v-for="hero in heroes"
        :key="hero.id"
        :hero="hero"
        :isFavorite="isFavorite(hero.id)"
        @toggle-favorite="toggleFavorite"
        @add-hero="addHeroToDashboard"
      />
    </div>
    <Pagination
      :totalPages="totalPages"
      :currentPage="currentPage"
      @page-changed="fetchHeroes"
      @next-page="nextPage"
      @previous-page="previousPage"
    />
  </div>
</template>

<script>
import CardItem from './card-item.vue';
import Pagination from './pagination-item.vue';
import axios from 'axios';
import md5 from 'md5';
import { useFavoritesStore } from '../stores/favorites';

export default {
  components: { CardItem, Pagination },
  data() {
    return {
      heroes: [],
      currentPage: 1,
      limit: 6,
      totalPages: 261,
    };
  },
  created() {
    this.fetchHeroes(this.currentPage);
  },
  methods: {
    async fetchHeroes(page = 1) {
      const timestamp = new Date().getTime();
      const publicKey = '4a235a79b53ce485320e7f3e22d7887d';
      const privateKey = '9ce72cfdef977a6b40d50a555878ab56da4343ee';
      const hash = md5(timestamp + privateKey + publicKey);
      const offset = (page - 1) * this.limit;

      const url = `https://gateway.marvel.com/v1/public/characters?limit=${this.limit}&offset=${offset}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

      try {
        const response = await axios.get(url);
        this.heroes = response.data.data.results;
        this.currentPage = page;
      } catch (error) {
        console.error('Error fetching heroes:', error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.fetchHeroes(this.currentPage + 1);
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.fetchHeroes(this.currentPage - 1);
      }
    },
    addHeroToDashboard(hero) {
      console.log('Héroe guardado en el dashboard:', hero);
      this.$emit('add-hero', hero);
    },
    isFavorite(id) {
      const favoritesStore = useFavoritesStore();
      return favoritesStore.favorites.some(f => f.id === id);
    },
    toggleFavorite(hero, isFavorite) {
      const favoritesStore = useFavoritesStore();
      if (isFavorite) {
        favoritesStore.removeFavorite(hero);
        console.log('Héroe eliminado de favoritos:', hero);
      } else {
        favoritesStore.addFavorite(hero);
        console.log('Héroe añadido a favoritos:', hero);
      }
    },
  },
};
</script>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px; /* Espacio entre la línea y las cards */
  border-top: 2px solid black;
  padding-top: 20px; /* Añade padding si deseas más espacio */
}
</style>
