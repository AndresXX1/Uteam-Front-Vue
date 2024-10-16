<template>
  <div id="app">
    <DashboardComponent />
  </div>
</template>

<script>
import DashboardComponent from './components/dashboard-component.vue'

export default {
  components: {
    DashboardComponent
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Avenir:wght@400;700&display=swap');

body {
  font-family: 'Avenir', sans-serif;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>