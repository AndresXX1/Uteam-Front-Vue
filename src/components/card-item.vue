<!-- card-item.vue -->

<template>
  <div class="CardItem">
    <img :src="hero.thumbnail.path + '.jpg'" :alt="hero.name" />
    <h3>{{ hero.name }}</h3>
    <button @click="addHero">Agregar a Mis Supers</button>
  </div>
</template>

<script>
export default {
  name: 'CardItem',
  props: {
    hero: Object,
    cardClass: String
  },
  methods: {
    addHero() {
      this.$emit('add-hero', this.hero);
    }
  }
};
</script>


<style scoped>
.CardItem {
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  width: calc(33% - 20px);
  box-sizing: border-box;
  text-align: center;
}

.CardItem img {
  max-width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .CardItem {
    width: calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .CardItem {
    width: 100%;
  }
}
</style>