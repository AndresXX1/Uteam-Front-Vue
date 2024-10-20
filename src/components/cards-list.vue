<template>
  <div>
    <SearchBar @search="filterHeroes" />
    <div v-if="isLoading">
      <p>Cargando héroes: {{ loadedHeroes }}/{{ totalHeroes }}</p>
      <div class="progress-bar">
        <div
          class="progress"
          :style="{ width: (loadedHeroes / totalHeroes) * 100 + '%' }"
        ></div>
      </div>
    </div>
    <div class="cards">
      <CardItem
        v-for="hero in paginatedHeroes"
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
      @page-changed="changePage"
      @next-page="nextPage"
      @previous-page="previousPage"
      v-if="filteredHeroes.length > 0"
    />
  </div>
</template>

<script>
import CardItem from './card-item.vue';
import Pagination from './pagination-item.vue';
import SearchBar from './searchbar.vue';
import axios from 'axios';
import md5 from 'md5';
import { useFavoritesStore } from '../stores/favorites';

export default {
  components: { CardItem, Pagination, SearchBar },
  data() {
    return {
      heroes: [],
      filteredHeroes: [],
      currentPage: 1,
      limit: 6,
      totalHeroes: 1560,
      loadedHeroes: 0,
      maxFetchLimit: 100,
      initialFetchLimit: 30,
      searchQuery: '',
      isLoading: true,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredHeroes.length / this.limit);
    },
    paginatedHeroes() {
      const start = (this.currentPage - 1) * this.limit;
      return this.filteredHeroes.slice(start, start + this.limit);
    },
  },
  created() {
    this.fetchHeroes();
  },
  methods: {
    async fetchHeroes() {
      const timestamp = new Date().getTime();
      const publicKey = '4a235a79b53ce485320e7f3e22d7887d';
      const privateKey = '9ce72cfdef977a6b40d50a555878ab56da4343ee';
      const hash = md5(timestamp + privateKey + publicKey);

      // Primera llamada para obtener 30 héroes
      const initialUrl = `https://gateway.marvel.com/v1/public/characters?limit=${this.initialFetchLimit}&offset=0&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
      
      try {
        const initialResponse = await axios.get(initialUrl);
        const initialHeroes = initialResponse.data.data.results;

        this.heroes.push(...initialHeroes);
        this.loadedHeroes += initialHeroes.length;
        this.filteredHeroes = this.heroes;
        console.log(`Cargados héroes: ${initialHeroes.length}, Total: ${this.loadedHeroes}`);
      } catch (error) {
        console.error('Error fetching initial heroes:', error);
      }

      // Llamadas subsecuentes para obtener el resto de los héroes
      for (let i = 1; this.loadedHeroes < this.totalHeroes; i++) {
        const offset = i * this.maxFetchLimit;
        const url = `https://gateway.marvel.com/v1/public/characters?limit=${this.maxFetchLimit}&offset=${offset}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

        try {
          const response = await axios.get(url);
          const newHeroes = response.data.data.results;

          this.heroes.push(...newHeroes);
          this.loadedHeroes += newHeroes.length;
          this.filteredHeroes = this.heroes;
          console.log(`Cargados héroes: ${newHeroes.length}, Total: ${this.loadedHeroes}`);
          
          // Esperar un poco antes de cargar el siguiente grupo
          await new Promise(resolve => setTimeout(resolve, 500)); // espera de 0.5 segundos
        } catch (error) {
          console.error('Error fetching subsequent heroes:', error);
        }
      }
      this.isLoading = false; // cambia el estado de carga una vez completado
    },
    filterHeroes(query) {
      this.searchQuery = query.toLowerCase();
      this.filteredHeroes = this.heroes.filter(hero => hero.name.toLowerCase().includes(this.searchQuery));
      this.currentPage = 1; // reinicia la página al buscar
    },
    changePage(page) {
      this.currentPage = page;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
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
  margin-top: 40px; 
  border-top: 2px solid black;
  padding-top: 20px; 
}

.progress-bar {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 10px;
}

.progress {
  height: 10px;
  background-color: #c77676;
  transition: width 0.5s;
}
</style>
