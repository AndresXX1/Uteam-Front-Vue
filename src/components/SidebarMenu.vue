<template>
  <div class="sidebar-menu">
    <button @click="$emit('close')">Cerrar</button>
    <nav>
      <router-link to="/">Inicio</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.sidebar-menu {
  width: 200px;
  background-color: #f4f4f4;
  padding: 10px;
}
.sidebar-menu button {
  margin-bottom: 10px;
}
.sidebar-menu nav a {
  display: block;
  margin: 5px 0;
}
</style>
