<template>
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        @input="updateSearch"
        placeholder="Buscar superhéroe por nombre..."
        class="search-input"
      />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'SearchBar',
    setup(props, { emit }) {
      const searchQuery = ref('');
  
      const updateSearch = () => {
        emit('search', searchQuery.value);
      };
  
      return {
        searchQuery,
        updateSearch,
      };
    },
  };
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    position: relative;
    z-index: 1; 
  }
  
  .search-input {
    padding: 12px 15px;
    font-size: 18px;
    border-radius: 30px;
    border: 2px solid red;
    width: 100%;
    max-width: 400px;
    background-color: white;
    color: black;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  
  .search-input::placeholder {
    color: #999;
  }
  
  .search-input:focus {
    outline: none;
    border-color: darkred;
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
  }
  
  .search-input:hover {
    border-color: #ff6666;
  }
  
  /* Responsividad */
  @media (max-width: 600px) {
    .search-input {
      font-size: 16px;
      padding: 10px 12px;
    }
  }
  </style>
  