<template>
    <div class="landing-page">
      <img 
        class="background-image"
        src="https://j.gifs.com/08Bm3y@facebook.gif" 
        alt="Background"
      />
      <button class="enter-button" @click="goToHome">Ingresa</button>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
  
      const goToHome = () => {
        router.push('/home');
      };
  
      return {
        goToHome,
      };
    },
  };
  </script>
  
  <style scoped>
  .landing-page {
    position: relative;
    height: 100vh; /* Altura completa de la ventana */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .background-image {
    position: absolute;
    top: 50%; /* Centra verticalmente */
    left: 50%; /* Centra horizontalmente */
    width: 100%; /* Reduce el ancho */
    height: auto; /* Mantiene la proporción de aspecto */
    transform: translate(-50%, -50%); /* Ajusta la posición */
    z-index: 1; /* Envía la imagen al fondo */
  }
  
  .enter-button {
    position: relative;
    z-index: 2; /* Asegura que el botón esté por encima */
    padding: 20px 40px; /* Tamaño del botón */
    font-size: 24px; /* Tamaño de la fuente */
    color: white; /* Color del texto */
    background-color: red; /* Fondo rojo */
    border: none; /* Sin borde */
    border-radius: 25px; /* Bordes redondeados */
    cursor: pointer; /* Cambia el cursor al pasar */
    transition: background-color 0.3s; /* Transición para el fondo */
  }
  
  .enter-button:hover {
    background-color: darkred; /* Cambia a un rojo más oscuro al pasar */
  }
  </style>
  