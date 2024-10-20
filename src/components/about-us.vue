<template>
  <v-container class="pa-8" style="background-color: transparent;">
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
      <v-row justify="center" class="mt-4">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="openLink('https://github.com/AndresXX1')" class="mx-2">
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </template>
          <span>GitHub - Tu repositorio de proyectos</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="openLink('https://www.linkedin.com/in/andres-vera-676414281/')" class="mx-2">
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </template>
          <span>LinkedIn - Conéctate conmigo</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="openLink('https://portafolios-topaz.vercel.app/')" class="mx-2">
              <v-icon>mdi-web</v-icon>
            </v-btn>
          </template>
          <span>Portafolio - Mira mis trabajos</span>
        </v-tooltip>
      </v-row>
    </v-card>
    <PiePagina class="mt-5" />
  </v-container>
</template>

<script>
import PiePagina from './pie-pagina.vue';

export default {
  name: 'AboutMe',
  components: {
    PiePagina,
  },
  methods: {
    openLink(url) {
      window.open(url, '_blank');
    },
  },
};
</script>

<style scoped>
.about-card {
  background: rgba(227, 96, 96, 0.253);
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.name-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 16px 0;
}
</style>
