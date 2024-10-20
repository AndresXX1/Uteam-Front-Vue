<template>
  <div class="landing-page">
    <img 
      class="background-image"
      src="https://i.makeagif.com/media/7-01-2022/_Gp3YB.gif" 
      alt="Background"
    />
    <button class="enter-button" @click="goToHome">Ingresa</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const goToHome = () => {
      router.push('/home');
    };

    return {
      goToHome,
    };
  },
};
</script>

<style scoped>
.landing-page {
  position: relative;
  height: 100vh; 
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background-image {
  position: absolute;
  top: 0; 
  left: 0;
  width: 100%; 
  height: 100%; 
  z-index: 1; 
  object-fit: cover; 
}

.enter-button {
  position: relative;
  z-index: 2; 
  padding: 20px 40px; 
  font-size: 24px; 
  color: white; 
  background-color: red;
  border: none; 
  border-radius: 25px; 
  cursor: pointer; 
  transition: background-color 0.3s; 
}

.enter-button:hover {
  background-color: darkred; 
}
</style>
