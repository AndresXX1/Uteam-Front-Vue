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
    </div>
    <div v-else>
      <p>Cargando detalles del héroe...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import md5 from 'md5';
  
  export default {
    name: 'DetailItem',
    data() {
      return {
        hero: null,
      };
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
      }
    }
  };
  </script>
  
  <style scoped>
  .DetailItem {
    text-align: center;
    font-family: 'Arial', sans-serif; 
  }
  
  .back-button {
    position: absolute;
    top: 100px; 
    left: 300px; 
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
  
  .DetailItem p {
    margin-top: 20px; 
  }
  </style>
  