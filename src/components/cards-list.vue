<template>
    <div class="cards">
      <Card
        v-for="hero in heroes"
        :key="hero.id"
        :hero="hero"
        @add-hero="addHeroToDashboard"
      />
    </div>
  </template>
  
  <script>
  import Card from './card-item.vue';
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
      },
      addHeroToDashboard(hero) {
        this.$emit('add-hero', hero);
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
  