<template>
    <div class="pagination">
      <button class="nav-button" @click="goToFirstPage" :disabled="currentPage === 1">
        &lt;&lt; <!-- Doble flecha hacia la izquierda -->
      </button>
      <button class="nav-button" @click="previousPage" :disabled="currentPage === 1">
        &lt; <!-- Flecha hacia la izquierda -->
      </button>
      <span v-if="currentPage > 1" class="ellipsis">...</span>
      <button
        v-for="page in displayedPages"
        :key="page"
        :class="{ active: page === currentPage, hover: hoverPage === page }"
        @click="changePage(page)"
        @mouseover="hoverPage = page"
        @mouseleave="hoverPage = null"
      >
        {{ page }}
        <span v-if="hoverPage === page" class="hover-indicator"></span>
      </button>
      <span v-if="currentPage < totalPages" class="ellipsis">...</span>
      <button class="nav-button" @click="nextPage" :disabled="currentPage === totalPages">
        &gt; <!-- Flecha hacia la derecha -->
      </button>
      <button class="nav-button" @click="goToLastPage" :disabled="currentPage === totalPages">
        &gt;&gt; <!-- Doble flecha hacia la derecha -->
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      totalPages: {
        type: Number,
        required: true,
      },
      currentPage: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        hoverPage: null, // Para controlar el número de página en hover
      };
    },
    computed: {
      displayedPages() {
        const pages = [];
        const maxPagesToShow = 10; // Total de páginas visibles
        let startPage = Math.max(1, this.currentPage - 4);
        let endPage = Math.min(this.totalPages, this.currentPage + 5);
  
        // Ajustamos el rango si hay menos de 10 páginas
        if (endPage - startPage < maxPagesToShow - 1) {
          if (startPage === 1) {
            endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);
          } else {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
          }
        }
  
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
  
        return pages;
      },
    },
    methods: {
      changePage(page) {
        this.$emit('page-changed', page);
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.$emit('page-changed', this.currentPage + 1);
        }
      },
      previousPage() {
        if (this.currentPage > 1) {
          this.$emit('page-changed', this.currentPage - 1);
        }
      },
      goToFirstPage() {
        this.$emit('page-changed', 1); // Cambiar a la primer pag....
      },
      goToLastPage() {
        this.$emit('page-changed', this.totalPages); // Cambiar a la ult pag.....
      },
    },
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
  
  button {
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
    border: none;
    border-radius: 20px; 
    position: relative; /* Necesario para el pseudo-elemento */
    transition: transform 0.2s; /* Efecto de transición suave */
  }
  
  .nav-button {
    background-color: #fa0c0cb8; 
    color: white;
    font-weight: bold;
  }
  
  button.active {
    background-color: #fa0c0cb8; 
    color: white;
    font-weight: bold;
    border-radius: 50%; 
    width: 40px; 
    height: 40px; 
  }
  
  .hover-indicator {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(128, 128, 128, 0.5); 
    border-radius: 50%; 
    opacity: 0;
    transition: opacity 0.2s;
  }
  
  button:hover .hover-indicator {
    opacity: 1; /* Muestra el fondo gris al hacer hover */
  }
  
  button:hover {
    transform: scale(1.1); 
  }
  
  .ellipsis {
    font-size: 20px;
    margin: 0 10px;
  }
  
  button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  </style>
  