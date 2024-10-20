<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2024 Andres Sebastian Vera. Todos los izquierdos y derechos reservados.</p>
      <div class="social-icons">
        <a href="https://github.com/AndresXX1" target="_blank">
          <v-icon>mdi-github</v-icon>
        </a>
        <a href="https://www.linkedin.com/in/andres-vera-676414281/" target="_blank">
          <v-icon>mdi-linkedin</v-icon>
        </a>
        <a href="https://portafolios-topaz.vercel.app/" target="_blank">
          <v-icon>mdi-web</v-icon>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'PiePagina',
};
</script>

<style scoped>
.footer {
  background-color: rgba(227, 96, 96, 0.7);
  color: white;
  text-align: center;
  padding: 20px;
  position: relative;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.social-icons {
  margin-top: 10px;
}

.social-icons a {
  margin: 0 10px;
  color: white;
}

/* responsividad */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }

  .social-icons {
    flex-direction: row;
    justify-content: center;
  }
}
</style>
