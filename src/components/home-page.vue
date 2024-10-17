<template>
  <div class="home-page">
    <ImageCarousel />
    <h2 class="superhero-title">Bienvenido a la página de Superhéroes</h2>
    <Cards />
  </div>
</template>

<script>
import Cards from './cards-list.vue';
import ImageCarousel from './image-carrucel.vue'; // Importa el nuevo componente

export default {
  components: { Cards, ImageCarousel },
};
</script>

<style>
.home-page {
  padding: 20px;
}

.superhero-title {
  text-align: center; /* Centrar el título */
  font-family: 'Comic Sans MS', cursive, sans-serif; /* Fuente estilo cómic */
  font-size: 2.5em; /* Tamaño del texto */
  color: rgb(229, 84, 84); /* Color del texto */
  padding: 20px; /* Espaciado interno */
  border-radius: 8px; /* Esquinas redondeadas */
  margin-bottom: 20px; /* Espaciado inferior */
}
</style>
