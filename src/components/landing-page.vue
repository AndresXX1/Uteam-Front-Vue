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
    top: 50%; 
    left: 50%; 
    width: 100%; 
    height: auto; 
    transform: translate(-50%, -50%); 
    z-index: 1; 
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
  