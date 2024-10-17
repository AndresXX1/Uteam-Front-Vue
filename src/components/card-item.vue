<template>
  <div class="CardItem">
    <router-link 
      :to="{ name: 'DetailItem', params: { id: hero.id } }" 
      class="no-underline"
    >
      <img
        :src="hero.thumbnail ? hero.thumbnail.path + '.jpg' : defaultImage"
        :alt="hero.name"
        @error="onImageError"
      />
      <h3 class="hero-name">{{ hero.name }}</h3>
    </router-link>
    <button @click.stop="toggleFavorite" class="favorite-button">
      <span :class="isFavorite ? 'heart red' : 'heart white'">
        {{ isFavorite ? '❤️' : '🤍' }}
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CardItem',
  props: {
    hero: Object,
    isFavorite: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      defaultImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrJXYf99ni3OQihsWVXlFPReqeUqD24DRGPg&s',
      imageSrc: null
    };
  },
  methods: {
    toggleFavorite() {
      console.log(`Toggling favorite for: ${this.hero.name}`);
      this.$emit('toggle-favorite', this.hero, this.isFavorite);
    },
    onImageError() {
      this.imageSrc = this.defaultImage;
    }
  },
  mounted() {
    this.imageSrc = this.hero.thumbnail ? this.hero.thumbnail.path + '.jpg' : this.defaultImage;
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
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.CardItem:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.CardItem img {
  max-width: 100%;
  max-height: 295px;
  object-fit: cover;
  border-radius: 10px;
}

.favorite-button {
  background: none;
  border: none;
  cursor: pointer;
}

.heart {
  font-size: 24px;
}

.red {
  color: red;
}

.white {
  color: white;
}

.hero-name {
  font-family: 'Comic Sans MS', cursive, sans-serif; /* Fuente Comic Sans */
  color: black; /* Color negro */
}

.no-underline {
  text-decoration: none; /* Sin subrayado */
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
