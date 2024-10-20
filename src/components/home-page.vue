<template>
  <div class="home-page">
    <ImageCarousel />
    <h2 class="superhero-title">Bienvenido a la página de Superhéroes</h2>
    <Cards />
    <PiePagina />
  </div>
</template>

<script>
import Cards from './cards-list.vue';
import ImageCarousel from './image-carrucel.vue'; 
import PiePagina from './pie-pagina.vue'; 

export default {
  components: { Cards, ImageCarousel, PiePagina },
};
</script>

<style>
.home-page {
  padding: 20px;
}
/* esto era por que queria ponerle un titulo con mas efectos */
.superhero-title {
  text-align: center; 
  font-family: 'Comic Sans MS', cursive, sans-serif; 
  font-size: 2.5em; 
  color: rgb(229, 84, 84); 
  padding: 20px; 
  border-radius: 8px; 
  margin-bottom: 20px; 
}
</style>