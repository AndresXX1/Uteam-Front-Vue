<template>
    <v-container class="pa-8" style="background-color: transparent;"> <!-- Fondo transparente -->
      <v-card elevation="2" class="pa-6 about-card">
        <v-row align="center" justify="center">
          <v-avatar size="200" class="mb-5">
            <img src="/yo.png" alt="Your Image" />
          </v-avatar>
        </v-row>
        <v-card-title class="justify-center text-h5">Sobre Mi</v-card-title>
        <v-card-subtitle class="text-center">
          <h1 class="name-title">Andres Sebastian Vera</h1>
          Me apasiona crear soluciones digitales innovadoras que transformen el mundo.
        </v-card-subtitle>
        <v-card-text>
          <p>
            Mi misión es crear valor y hacer la diferencia ofreciendo servicios y productos excepcionales. Estoy comprometido con la excelencia y la innovación en todo lo que hago. Únete a mí en este viaje para hacer del mundo un lugar mejor a través de la tecnología y la creatividad.
          </p>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'AboutMe',
  };
  </script>
  
  <style scoped>
  .about-card {
    background: rgba(227, 96, 96, 0.253); /* Fondo blanco con 80% de opacidad */
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .name-title {
    font-size: 2.5rem; /* Tamaño grande para el nombre */
    font-weight: bold; /* Negrita para resaltar el nombre */
    margin: 16px 0; /* Espaciado arriba y abajo */
  }
  </style>
  