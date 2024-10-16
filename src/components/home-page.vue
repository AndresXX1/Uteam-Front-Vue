<template>
    <div class="home-page">
      <h2>Bienvenido a la página de Superhéroes</h2>
      <Cards />
    </div>
  </template>
  
  <script>
  import Cards from './cards-list.vue';
  
  export default {
    components: { Cards }
  };
  </script>
  
  <style>
  .home {
    padding: 20px;
  }
  </style>
  