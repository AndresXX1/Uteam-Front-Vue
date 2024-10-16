<template>
    <div class="cards">
      <Card v-for="hero in heroes" :key="hero.id" :hero="hero" />
    </div>
  </template>
  
  <script>
  import Card from './card.vue';
  import axios from 'axios';
  
  export default {
    components: { Card },
    data() {
      return {
        heroes: []
      };
    },
    created() {
      this.fetchHeroes();
    },
    methods: {
      async fetchHeroes() {
        try {
          const response = await axios.get('https://gateway.marvel.com/v1/public/characters?apikey=YOUR_API_KEY');
          this.heroes = response.data.data.results;
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .cards {
    display: flex;
    flex-wrap: wrap;
  }
  </style>
  