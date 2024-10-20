// stores/heroesStore.js
import { defineStore } from 'pinia';

export const useHeroesStore = defineStore('heroes', {
  state: () => ({
    heroes: [],
    loadedHeroes: 0,
    totalHeroes: 1560,
    isLoading: false,
  }),
  actions: {
    setHeroes(heroes) {
      this.heroes = heroes;
      this.loadedHeroes = heroes.length;
    },
    incrementLoadedHeroes(count) {
      this.loadedHeroes += count;
    },
    setLoading(loading) {
      this.isLoading = loading;
    },
    reset() {
      this.heroes = [];
      this.loadedHeroes = 0;
      this.isLoading = false;
    },
  },
});
