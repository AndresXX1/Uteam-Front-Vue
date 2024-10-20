<template>
  <div class="DetailItem" v-if="hero">
    <router-link to="/home" class="back-button">
      <i class="fa fa-arrow-left"></i> Back
    </router-link>
    <h1>{{ hero.name }}</h1>
    <img
      v-if="hero.thumbnail"
      :src="hero.thumbnail.path + '.jpg'"
      :alt="hero.name"
      class="hero-image"
    />
    <p>{{ hero.description || 'No description available.' }}</p>
    
    <button @click.stop="toggleFavorite" class="favorite-button">
      <span class="heart" :class="isFavorite ? 'red' : 'white'">
        {{ isFavorite ? '❤️' : '🤍' }}
      </span>
      {{ isFavorite ? 'Eliminar de mis Supers' : 'Agregar a mis Supers' }}
    </button>
    
    <PiePagina />
  </div>
  <div v-else>
    <p>Cargando detalles del héroe...</p>
  </div>
</template>

<script>
import axios from 'axios';
import md5 from 'md5';
import PiePagina from './pie-pagina.vue';
import { useFavoritesStore } from '@/stores/favorites';

export default {
  name: 'DetailItem',
  components: {
    PiePagina,
  },
  data() {
    return {
      hero: null,
    };
  },
  computed: {
    favoritesStore() {
      return useFavoritesStore();
    },
    isFavorite() {
      return this.favoritesStore.favorites.some(f => f.id === this.hero.id);
    },
  },
  created() {
    this.fetchHeroDetails();
  },
  methods: {
    async fetchHeroDetails() {
      const id = this.$route.params.id;
      const timestamp = new Date().getTime();
      const publicKey = '4a235a79b53ce485320e7f3e22d7887d';
      const privateKey = '9ce72cfdef977a6b40d50a555878ab56da4343ee';
      const hash = md5(timestamp + privateKey + publicKey);

      const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

      try {
        const response = await axios.get(url);
        this.hero = response.data.data.results[0];
      } catch (error) {
        console.error('Error fetching hero details:', error);
      }
    },
    toggleFavorite() {
      if (this.isFavorite) {
        this.favoritesStore.removeFavorite(this.hero);
      } else {
        this.favoritesStore.addFavorite(this.hero);
      }
    },
  },
};
</script>

<style scoped>
.DetailItem {
  text-align: center;
  font-family: 'Arial', sans-serif;
  position: relative;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
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

.hero-image {
  max-width: 400px;
  height: auto;
  border-radius: 10px;
  margin: 20px auto;
  display: block;
}

.favorite-button {
  border: 2px solid red; 
  color: black;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 20px; 
  font-size: 16px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center; 
  align-items: center;
  transition: all 0.3s;
  background: transparent; 
  margin-bottom: 30px;
  margin-left: 280px;
}

.favorite-button:hover {
  background-color: rgba(255, 77, 77, 0.2); 
}

.heart {
  margin-right: 8px;
  font-size: 24px;
}

.red {
  color: red;
}

.white {
  color: white;
}

.DetailItem p {
  margin-top: 20px;
}

/* responsividad */
@media (max-width: 768px) {
  .hero-image {
    max-width: 100%;
  }
  .favorite-button {
    font-size: 14px;
  }
}
</style>
