import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [],
  }),
  actions: {
    addFavorite(hero) {
      if (!this.favorites.some(f => f.id === hero.id)) {
        this.favorites.push(hero);
        console.log('Héroe añadido a favoritos:', hero);
      }
    },
    removeFavorite(hero) {
      const index = this.favorites.findIndex(f => f.id === hero.id);
      if (index !== -1) {
        this.favorites.splice(index, 1); // Usa splice para asegurar reactividad
        console.log('Héroe eliminado de favoritos:', hero);
      }
    },
  },
});
