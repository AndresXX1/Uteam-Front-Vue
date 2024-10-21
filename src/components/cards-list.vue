<template>
  <div>
    <SearchBar @search="filterHeroes" />
    <div v-if="isLoading || loadedHeroes < totalHeroes">
      <p>Cargando héroes: {{ loadedHeroes }}/{{ totalHeroes }}</p>
      <div class="progress-bar">
        <div
          class="progress"
          :style="{ width: (loadedHeroes / totalHeroes) * 100 + '%' }"
        ></div>
      </div>
    </div>
    <div v-else>
      <p>
        <span role="img" aria-label="check">✅</span>
        Todos los {{ totalHeroes }} héroes han sido cargados.
      </p>
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
import { useHeroesStore } from '../stores/heroesStore';

export default {
  components: { CardItem, Pagination, SearchBar },
  data() {
    return {
      currentPage: 1,
      limit: 6,
      searchQuery: '',
    };
  },
  computed: {
    heroesStore() {
      return useHeroesStore();
    },
    filteredHeroes() {
      return this.heroesStore.heroes.filter(hero => 
        hero.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    totalPages() {
      return Math.ceil(this.filteredHeroes.length / this.limit);
    },
    paginatedHeroes() {
      const start = (this.currentPage - 1) * this.limit;
      return this.filteredHeroes.slice(start, start + this.limit);
    },
    loadedHeroes() {
      return this.heroesStore.loadedHeroes;
    },
    totalHeroes() {
      return 1524; // Puedes ajustar este número según sea necesario
    },
    isLoading() {
      return this.heroesStore.isLoading;
    },
  },
  created() {
    this.fetchHeroes();
  },
  methods: {
    async fetchHeroes() {
      // Verificar si ya se han cargado héroes
      if (this.heroesStore.heroes.length > 0) {
        return; // No hacer nada si ya se han cargado
      }

      this.heroesStore.setLoading(true);
      const timestamp = new Date().getTime();
      const publicKey = '377787adefb377076347bd2546aebac7';
      const privateKey = '2100d4b9eb64127cb73a54a7638cb0910a93591c';
      const hash = md5(timestamp + privateKey + publicKey);

      // Primera llamada para obtener 30 héroes
      const initialUrl = `https://gateway.marvel.com/v1/public/characters?limit=30&offset=0&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

      try {
        const initialResponse = await axios.get(initialUrl);
        const initialHeroes = initialResponse.data.data.results;
        this.heroesStore.setHeroes(initialHeroes);

        // Incrementar el contador de héroes cargados
        this.heroesStore.incrementLoadedHeroes(initialHeroes.length);

        // Llamadas subsecuentes para obtener el resto de los héroes
        for (let i = 1; this.heroesStore.loadedHeroes < this.totalHeroes; i++) {
          const offset = i * 100;
          const url = `https://gateway.marvel.com/v1/public/characters?limit=100&offset=${offset}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

          const response = await axios.get(url);
          const newHeroes = response.data.data.results;
          this.heroesStore.heroes.push(...newHeroes);
          this.heroesStore.incrementLoadedHeroes(newHeroes.length);

          // Detener si se alcanza 1524 héroes
          if (this.heroesStore.loadedHeroes >= 1524) break;

          await new Promise(resolve => setTimeout(resolve, 500)); // espera de 0.5 segundos
        }
      } catch (error) {
        console.error('Error fetching heroes:', error);
      } finally {
        this.heroesStore.setLoading(false);
      }
    },
    filterHeroes(query) {
      this.searchQuery = query;
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
