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
    font-family: 'Arial', sans-serif; /* Cambia a la fuente deseada */
  }
  
  .back-button {
    position: absolute;
    top: 100px; /* Ajusta la posición más cerca de la imagen */
    left: 300px; /* Ajusta según sea necesario */
    display: flex;
    align-items: center;
    text-decoration: none; /* Quita el subrayado */
    color: #fff; /* Color del texto */
    font-size: 18px; /* Tamaño de la fuente */
    font-weight: bold; /* Estilo de fuente en negrita */
    background-color: #ff4d4d; /* Color de fondo rojo */
    padding: 6px 10px; /* Espaciado interno */
    border-radius: 20px; /* Bordes redondeados */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Sombra */
    transition: all 0.3s; /* Transición suave para efectos */
  }
  
  .back-button i {
    margin-right: 5px; /* Espacio entre el icono y el texto */
  }
  
  .back-button:hover {
    background-color: #e63939; /* Color de fondo al pasar el mouse */
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3); /* Sombra más intensa al pasar el mouse */
  }
  
  .hero-image {
    max-width: 400px; /* Ajusta el tamaño de la imagen según lo necesites */
    height: auto; /* Mantiene la relación de aspecto */
    border-radius: 10px; /* Agrega bordes redondeados si lo deseas */
    margin: 20px auto; /* Centra la imagen y añade margen superior */
    display: block; /* Asegúrate de que se comporte como bloque */
  }
  
  .DetailItem p {
    margin-top: 20px; /* Espaciado entre la imagen y la descripción */
  }
  </style>
  