// stores/heroes.js
import { defineStore } from 'pinia';
import axios from 'axios';
import md5 from 'md5';

export const useHeroesStore = defineStore('heroes', {
  state: () => ({
    heroes: [],
    totalPages: 0,
  }),
  actions: {
    async fetchAllHeroes() {
      const allHeroes = [];
      const totalPages = 261; 
      const publicKey = '4a235a79b53ce485320e7f3e22d7887d';
      const privateKey = '9ce72cfdef977a6b40d50a555878ab56da4343ee';

      for (let page = 1; page <= totalPages; page++) {
        const timestamp = new Date().getTime();
        const hash = md5(timestamp + privateKey + publicKey);
        const offset = (page - 1) * 6;

        const url = `https://gateway.marvel.com/v1/public/characters?limit=6&offset=${offset}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

        const response = await axios.get(url);
        allHeroes.push(...response.data.data.results);
      }

      this.heroes = allHeroes;
      this.totalPages = totalPages;
    },
  },
});
