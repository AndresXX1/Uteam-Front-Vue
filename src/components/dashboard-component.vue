<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      :clipped="$vuetify.breakpoint.smAndUp"
    >
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.text" :to="item.to" router>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-toolbar-title>Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      menuItems: [
        { text: 'Inicio', to: '/' },
        { text: 'Bot', to: '/bot' },
        { text: 'Calculadora', to: '/calculator' },
        { text: 'Contáctame', to: '/contact' },
        { text: 'Sobre Nosotros', to: '/about' },
      ],
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<style scoped>
/* Aquí puedes agregar estilos específicos para tu componente si lo deseas */
</style>
